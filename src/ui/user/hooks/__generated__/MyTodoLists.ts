/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyTodoLists
// ====================================================

export interface MyTodoLists_myTodoLists_todoItems {
  __typename: "TodoItem";
  id: string;
  title: string;
  isChecked: boolean;
  createdAt: any;
}

export interface MyTodoLists_myTodoLists {
  __typename: "TodoList";
  id: string;
  title: string;
  todoItems: MyTodoLists_myTodoLists_todoItems[];
}

export interface MyTodoLists {
  myTodoLists: (MyTodoLists_myTodoLists | null)[] | null;
}
