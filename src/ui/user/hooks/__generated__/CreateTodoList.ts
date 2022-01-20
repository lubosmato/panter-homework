/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateTodoList
// ====================================================

export interface CreateTodoList_createTodoList {
  __typename: "TodoList";
  id: string;
  title: string;
}

export interface CreateTodoList {
  createTodoList: CreateTodoList_createTodoList | null;
}

export interface CreateTodoListVariables {
  title: string;
}
