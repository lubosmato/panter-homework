/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateTodoList
// ====================================================

export interface UpdateTodoList_updateTodoList {
  __typename: "TodoList";
  id: string;
  title: string;
}

export interface UpdateTodoList {
  updateTodoList: UpdateTodoList_updateTodoList | null;
}

export interface UpdateTodoListVariables {
  id: string;
  title: string;
}
