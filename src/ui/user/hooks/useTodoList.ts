import {gql, useMutation, useQuery} from "@apollo/client"
import {MyTodoLists, MyTodoLists_myTodoLists} from "./__generated__/MyTodoLists"
import {DeleteTodoList} from "./__generated__/DeleteTodoList"
import {CreateTodoList} from "./__generated__/CreateTodoList"
import {UpdateTodoList} from "./__generated__/UpdateTodoList"
import {useEffect, useRef, useState} from "react"
import debounce from "lodash.debounce"

const DELETE_TODO_LIST = gql`
mutation DeleteTodoList($id: String!) {
  deleteTodoList(id: $id) {
    id
  }
}
`

const CREATE_TODO_LIST = gql`
mutation CreateTodoList($title: String!) {
  createTodoList(title: $title) {
    id
  }
}
`

const UPDATE_TODO_LIST = gql`
mutation UpdateTodoList($id: String!, $title: String!) {
  updateTodoList(id: $id, title: $title) {
    id
    title
  }
}
`

export const MY_TODO_LISTS = gql`
  query MyTodoLists {
    myTodoLists {
      id
      title
      createdAt
      todoItems {
        id
        title
        isChecked
        createdAt
      }
    }
  }
`

export const useMyTodoLists = () => {
  return useQuery<MyTodoLists>(MY_TODO_LISTS)
}

export const useUpdateTodoList = (initialState: MyTodoLists_myTodoLists) => {
  const [updateTodoList] = useMutation<UpdateTodoList, MyTodoLists_myTodoLists>(UPDATE_TODO_LIST)

  const [state, setState] = useState(initialState)

  const debouncedUpdateTodoList = useRef(
    debounce(async (list: MyTodoLists_myTodoLists) => {
      await updateTodoList({variables: list})
    }, 500)
  ).current

  const setStateAndUpdateTodoList = (list: MyTodoLists_myTodoLists) => {
    setState(list)
    debouncedUpdateTodoList(list)
  }

  // cleanup debounce
  useEffect(() => {
    return () => debouncedUpdateTodoList.cancel()
  }, [debouncedUpdateTodoList])

  const wrapped: [
    typeof state,
    typeof setStateAndUpdateTodoList
  ] = [state, setStateAndUpdateTodoList]

  return wrapped
}

export const useTodoList = () => {
  const [createList] = useMutation<CreateTodoList, {title: string}>(CREATE_TODO_LIST)
  const [deleteList] = useMutation<DeleteTodoList, {id: string}>(DELETE_TODO_LIST)

  const newListTitle = "New list"

  return {
    createTodoList: () => createList({
      variables: {title: newListTitle},
      refetchQueries: [MY_TODO_LISTS],
      // optimisticResponse: {
      //   createTodoList: {
      //     id: "random",
      //     __typename: "TodoList",
      //   },
      // },
      update: (cache) => {
        // TODO there is probably no way to do optimistic UI stuff with addition of graphql item
        // const myTodoLists = cache.readQuery<MyTodoLists>({query: MY_TODO_LISTS})
        // if(!myTodoLists?.myTodoLists) return

        // const now = (new Date()).getTime()

        // const newTodoLists: MyTodoLists = {
        //   myTodoLists: [
        //     ...myTodoLists.myTodoLists,
        //     {
        //       __typename: "TodoList",
        //       id: "random",
        //       createdAt: now,
        //       title: newListTitle,
        //       todoItems: [
        //         {id: "whut?", createdAt: now, title: "", isChecked: false, __typename: "TodoItem"},
        //       ],
        //     },
        //   ],
        // }

        // cache.writeQuery<MyTodoLists>({
        //   query: MY_TODO_LISTS,
        //   data: newTodoLists,
        // })
      },
    }),
    deleteTodoList: (list: MyTodoLists_myTodoLists) => deleteList({
      variables: list,
      refetchQueries: [MY_TODO_LISTS],
      optimisticResponse: {
        deleteTodoList: {
          id: list.id,
          __typename: "TodoList",
        },
      },
      update: (cache, {data}) => {
        if (data?.deleteTodoList) {
          const cahceId = cache.identify({...data.deleteTodoList})
          cache.evict({id: cahceId})
          cache.gc()
        }
      },
    }),
  }
}
