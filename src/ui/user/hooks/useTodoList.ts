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

  return {
    createTodoList: () => createList({
      variables: {title: "New list"},
      refetchQueries: [MY_TODO_LISTS],
    }),
    deleteTodoList: (list: MyTodoLists_myTodoLists) => deleteList({
      variables: list,
      refetchQueries: [MY_TODO_LISTS],
    }),
  }
}
