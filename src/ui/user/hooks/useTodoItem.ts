import {gql, useMutation} from "@apollo/client"
import {CreateTodoItem} from "./__generated__/CreateTodoItem"
import {UpdateTodoItem} from "./__generated__/UpdateTodoItem"
import {DeleteTodoItem} from "./__generated__/DeleteTodoItem"

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
  const mut = useMutation<CreateTodoItem>(CREATE_TODO_ITEM)
  return [
    (todoItem: {id: string}) => {
      return mut[0]({
        variables: todoItem,
      })
    },
    mut[1],
  ]
}

export const useDeleteTodoItem = () => {
  const mut = useMutation<DeleteTodoItem>(DELETE_TODO_ITEM)
  return [
    (todoItem: {id: string}) => {
      return mut[0]({
        variables: todoItem,
      })
    },
    mut[1],
  ]
}

export const useUpdateTodoItem = () => {
  const mut = useMutation<UpdateTodoItem>(UPDATE_TODO_ITEM)
  // TODO figure out if there is better solution?
  return [
    (todoItem: {id: string, title: string, isChecked: boolean}) => {
      return mut[0]({
        variables: todoItem,
      })
    },
    mut[1],
  ]
}
