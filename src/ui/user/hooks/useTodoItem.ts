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

export const useUpdateTodoItem = (initialState: MyTodoLists_myTodoLists_todoItems) => {
  const [updateTodoItem] = useMutation<UpdateTodoItem, UpdateTodoItem_updateTodoItem>(UPDATE_TODO_ITEM)

  const [state, setState] = useState(initialState)

  const debouncedUpdateTodoItem = useRef(
    debounce(async (item: MyTodoLists_myTodoLists_todoItems) => {
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

  const wrapped: [
    typeof state,
    typeof setStateAndUpdateTodoItem
  ] = [state, setStateAndUpdateTodoItem]

  return wrapped
}

export const useTodoItem = () => {
  const [createItem] = useMutation<CreateTodoItem, {todoListId: string}>(CREATE_TODO_ITEM)
  const [deleteItem] = useMutation<DeleteTodoItem, {id: string}>(DELETE_TODO_ITEM)

  return {
    createTodoItem: (todoListId: string) => createItem({
      variables: {todoListId},
      refetchQueries: [MY_TODO_LISTS],
    }),
    deleteTodoItem: (item: MyTodoLists_myTodoLists_todoItems) => deleteItem({
      variables: item,
      refetchQueries: [MY_TODO_LISTS],
    }),
  }
}
