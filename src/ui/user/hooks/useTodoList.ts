import {gql, useMutation, useQuery} from "@apollo/client"
import {MyTodoLists, MyTodoLists_myTodoLists} from "./__generated__/MyTodoLists"
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
export const MY_TODO_LISTS = gql`
  query MyTodoLists {
    myTodoLists {
      id
      title
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

export const useDeleteTodoList = (list: MyTodoLists_myTodoLists) => {
  const [deleteTodoList, mutationResult] = useMutation<DeleteTodoList, {id: string}>(DELETE_TODO_LIST)

  const wrappedMut: [
    () => ReturnType<typeof deleteTodoList>,
    typeof mutationResult
  ] = [
    () => deleteTodoList({
      variables: list,
      refetchQueries: [
        MY_TODO_LISTS,
      ],
    }),
    mutationResult,
  ]

  return wrappedMut
}

export const useCreateTodoList = () => {
  return useMutation<CreateTodoList>(CREATE_TODO_LIST)
}
