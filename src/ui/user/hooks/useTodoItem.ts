import {gql, useMutation} from "@apollo/client"
import {CreateTodoItem} from "./__generated__/CreateTodoItem"
import {UpdateTodoItem, UpdateTodoItem_updateTodoItem} from "./__generated__/UpdateTodoItem"
import {DeleteTodoItem} from "./__generated__/DeleteTodoItem"
import {MyTodoLists_myTodoLists_todoItems} from "./__generated__/MyTodoLists"
import {useEffect, useRef, useState} from "react"
import debounce from "lodash.debounce"
import {MY_TODO_LISTS} from "./useTodoList"

const DELETE_TODO_ITEM = gql`
mutation DeleteTodoItem($id: String!) {
  deleteTodoItem(id: $id) {
    id
  }
}
`

const CREATE_TODO_ITEM = gql`
mutation CreateTodoItem($todoListId: String!) {
  createTodoItem(todoListId: $todoListId) {
    id
  }
}
`

const UPDATE_TODO_ITEM = gql`
mutation UpdateTodoItem($id: String!, $isChecked: Boolean!, $title: String!) {
  updateTodoItem(id: $id, isChecked: $isChecked, title: $title) {
    id
    title
    isChecked
  }
}
`

export const useCreateTodoItem = () => {
  const [createTodoItem, mutationResult] = useMutation<CreateTodoItem, {todoListId: string}>(CREATE_TODO_ITEM)

  const wrappedMut: [
    (todoListId: string) => ReturnType<typeof createTodoItem>,
    typeof mutationResult
  ] = [
    (todoListId: string) => createTodoItem({
      variables: {todoListId},
      refetchQueries: [
        MY_TODO_LISTS,
      ],
    }),
    mutationResult,
  ]

  return wrappedMut
}

// TODO is this correct use of hooks?
export const useDeleteTodoItem = (item: MyTodoLists_myTodoLists_todoItems) => {
  const [deleteTodoItem, mutationResult] = useMutation<DeleteTodoItem, {id: string}>(DELETE_TODO_ITEM)

  // TODO is there simpler way to work with tuples?
  // TODO or should I just use objects instead?s
  const wrappedMut: [
    () => ReturnType<typeof deleteTodoItem>,
    typeof mutationResult
  ] = [
    () => deleteTodoItem({
      variables: item,
      refetchQueries: [
        MY_TODO_LISTS,
      ],
    }),
    mutationResult,
  ]

  return wrappedMut
}

export const useUpdateTodoItem = (initialState: MyTodoLists_myTodoLists_todoItems) => {
  const [updateTodoItem, mutationResult] = useMutation<UpdateTodoItem, UpdateTodoItem_updateTodoItem>(UPDATE_TODO_ITEM)

  const [state, setState] = useState(initialState)

  const debouncedUpdateTodoItem = useRef(
    debounce(async (item: MyTodoLists_myTodoLists_todoItems) => {
      console.log("updating item", item.title)
      await updateTodoItem({variables: item})
    }, 500)
  ).current

  const setStateAndUpdateTodoItem = (item: MyTodoLists_myTodoLists_todoItems) => {
    setState(item)
    debouncedUpdateTodoItem(item)
  }

  // cleanup debounce
  useEffect(() => {
    return () => debouncedUpdateTodoItem.cancel()
  }, [debouncedUpdateTodoItem])

  const wrapapedMut: [
    typeof state,
    typeof setStateAndUpdateTodoItem,
    typeof mutationResult
  ] = [state, setStateAndUpdateTodoItem, mutationResult]

  return wrapapedMut
}
