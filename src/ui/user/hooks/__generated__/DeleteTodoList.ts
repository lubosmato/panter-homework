/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteTodoList
// ====================================================

export interface DeleteTodoList_deleteTodoList {
  __typename: "TodoList";
  id: string;
  title: string;
}

export interface DeleteTodoList {
  deleteTodoList: DeleteTodoList_deleteTodoList | null;
}

export interface DeleteTodoListVariables {
  id: string;
}
