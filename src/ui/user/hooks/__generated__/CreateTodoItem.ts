/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateTodoItem
// ====================================================

export interface CreateTodoItem_createTodoItem {
  __typename: "TodoItem";
  id: string;
}

export interface CreateTodoItem {
  createTodoItem: CreateTodoItem_createTodoItem | null;
}

export interface CreateTodoItemVariables {
  todoListId: string;
}
