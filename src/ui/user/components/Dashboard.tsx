import styled from "styled-components"
import {FC, KeyboardEvent, useEffect, useRef, useState} from "react"

import {MyTodoLists_myTodoLists, MyTodoLists_myTodoLists_todoItems} from "../hooks/__generated__/MyTodoLists"

import {useMyTodoLists, useTodoList, useUpdateTodoList} from "../hooks/useTodoList"
import {useTodoItem, useUpdateTodoItem} from "../hooks/useTodoItem"

const Dashboard: FC = () => {
  const {loading, data} = useMyTodoLists()
  const myTodoLists = data?.myTodoLists

  const {createTodoList} = useTodoList()

  if (loading) return <div>Transfering letters...</div>

  return <div>
    <button className="btn btn-primary mb-3" onClick={createTodoList}>Add a new list</button>
    <div className="row">
      {
        myTodoLists?.map((todoList) => {
          return todoList && <TodoListCard key={`list-${todoList.id}`} todoList={todoList} />
        })
      }
    </div>
  </div>
}

const TodoListCard: FC<{
  todoList: MyTodoLists_myTodoLists
}> = ({todoList}) => {

  const {createTodoItem} = useTodoItem()

  // TODO apollo magic (maybe cache?) probably fucks up ordering of relations (how to deal with this?)
  // TODO apollo's codegen does not have binding for datetime ¯\_(ツ)_/¯
  const sortedTodoItems = [...todoList.todoItems]
    .sort(
      (a, b) => (new Date(a.createdAt as string)).getTime() - (new Date(b.createdAt as string)).getTime()
    )

  const [selectedItemIndex, setSelectedItemIndex] = useState(-1)

  const selectTodoItemOrCreateNew = (indexToSelect: number) => {
    setSelectedItemIndex(indexToSelect)

    if (indexToSelect >= sortedTodoItems.length) {
      createTodoItem(todoList.id)
    }
  }

  const disableDelete = sortedTodoItems.length === 1

  return <div key={`list-${todoList.id}`} className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
    <div className="card mb-3">
      <div className="card-body">
        <TodoListTitle todoList={todoList} />
        {
          sortedTodoItems.map((item, index) =>
            <TodoItem
              disableDelete={disableDelete}
              item={item}
              key={`item-${item.id}`}
              isSelected={index === selectedItemIndex}
              requestSelectedChange={(indexOffset) => selectTodoItemOrCreateNew(index + indexOffset)}
            />
          )
        }
      </div>
    </div>
  </div>
}

const TodoListTitle: FC<{
  todoList: MyTodoLists_myTodoLists
}> = ({todoList}) => {

  const {deleteTodoList} = useTodoList()
  const [state, updateTodoList] = useUpdateTodoList(todoList)

  return <TodoListTitleH4 className="card-title">
    <TodoListTitleInput value={state.title} onChange={(e) => updateTodoList({...todoList, title: e.target.value})} />
    <CloseButton
      tabIndex={-1}
      onClick={() => deleteTodoList(todoList)}
      className="btn btn-sm">X</CloseButton>
  </TodoListTitleH4>
}

const TodoItem: FC<{
  item: MyTodoLists_myTodoLists_todoItems
  isSelected: boolean
  disableDelete: boolean
  requestSelectedChange: (indexOffset: number) => void
}> = (({item, isSelected, disableDelete, requestSelectedChange}) => {

  const [state, updateTodoItem] = useUpdateTodoItem(item)
  const {deleteTodoItem} = useTodoItem()

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isSelected) inputRef.current?.focus()
  }, [isSelected])

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === "ArrowDown") {
      requestSelectedChange(1)
      e.preventDefault()
    }
    else if (e.key === "ArrowUp") {
      requestSelectedChange(-1)
      e.preventDefault()
    }
  }

  return <TodoItemRow className="d-flex">
    <TodoItemCheck
      tabIndex={-1}
      type="checkbox"
      onChange={(e) => updateTodoItem({...state, isChecked: e.target.checked})}
      checked={state.isChecked}
    />
    <TodoItemInput
      ref={inputRef}
      onKeyDown={onKeyDown}
      onChange={(e) => updateTodoItem({...state, title: e.target.value})}
      value={state.title}
    />
    <CloseButton
      disabled={disableDelete}
      tabIndex={-1}
      onClick={() => !disableDelete && deleteTodoItem(item)}
      className="btn btn-sm">X</CloseButton>
  </TodoItemRow>
})

const CloseButton = styled.button`
  opacity: 0;
  transition: opacity 0.5s;
  color: #ffa6a6;
  font-weight: 600;
  &:disabled {
    opacity: 0;
  }
`

const TodoItemRow = styled.div`
  &:hover ${CloseButton}:not([disabled]) {
    opacity: 1;
  }
  margin: 5px 0;
`

const TodoListTitleH4 = styled.h4`
  &:hover ${CloseButton} {
    opacity: 1;
  }
  display: flex;
  justify-content: space-between;
`

const TodoItemInput = styled.input`
  padding: 5px;
  width: 100%;
  border: 0;
`

const TodoListTitleInput = styled(TodoItemInput)`
  font-family: "Cabin Sketch", cursive;
  font-weight: 400;
`

const TodoItemCheck = styled.input`
  margin-top: 10px;
  width: 25px;
`

export default Dashboard
