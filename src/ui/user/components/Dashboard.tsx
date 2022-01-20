import {FC, KeyboardEvent} from "react"
import styled from "styled-components"
import {useMyTodoLists} from "../hooks/useTodoList"
import {MyTodoLists_myTodoLists, MyTodoLists_myTodoLists_todoItems} from "../hooks/__generated__/MyTodoLists"
import debounce from "lodash.debounce"

const TodoItemInput = styled.div`
  padding: 5px;
`

const TodoItemCheck = styled.input`
  margin-top: 10px;
`

const TodoItem: FC<{item: MyTodoLists_myTodoLists_todoItems}> = ({item}) => {

  const createNewTodoItem = () =>{
    console.warn("TODO")
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      createNewTodoItem()
    }
  }

  return <div>
    <div className="form-check">
      <TodoItemCheck className="form-check-input" type="checkbox" />
      <TodoItemInput onKeyDown={onKeyDown} contentEditable className="form-check-label">{item.title}</TodoItemInput>
    </div>
  </div>
}

const TodoList: FC<{list: MyTodoLists_myTodoLists | null}> = ({list}) => {
  if (!list) return null

  return <div className="col-4">
    <div className="card m-2">
      <div className="card-body">
        <h4 className="card-title">{list.title}</h4>
        {
          list.todoItems.map((item, i) =>
            <TodoItem item={item} key={i}></TodoItem>
          )
        }
      </div>
    </div>
  </div>
}

const Dashboard: FC = () => {
  const {loading, data} = useMyTodoLists()
  const myTodoLists = data?.myTodoLists

  if (loading) return <div>Transfering letters...</div>

  return <div className="d-flex flex-wrap">
    {
      myTodoLists?.map((todoList, i) =>
        <TodoList key={i} list={todoList} />
      )
    }
  </div>
}

export default Dashboard
