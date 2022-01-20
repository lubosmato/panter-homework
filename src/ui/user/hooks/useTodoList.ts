import {gql, useMutation, useQuery} from "@apollo/client"
import {MyTodoLists} from "./__generated__/MyTodoLists"
import {DeleteTodoList} from "./__generated__/DeleteTodoList"
import {CreateTodoList} from "./__generated__/CreateTodoList"

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
const MY_TODO_LISTS = gql`
  query MyTodoLists {
    myTodoLists {
      id
      title
      todoItems {
        id
        title
        isChecked
      }
    }
  }
`

export const useMyTodoLists = () => {
  return useQuery<MyTodoLists>(MY_TODO_LISTS)
}

export const useDeleteTodoList = () => {
  return useMutation<DeleteTodoList>(DELETE_TODO_LIST)
}

export const useCreateTodoList = () => {
  return useMutation<CreateTodoList>(CREATE_TODO_LIST)
}
