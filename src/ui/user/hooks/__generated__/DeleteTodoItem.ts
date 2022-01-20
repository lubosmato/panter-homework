/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteTodoItem
// ====================================================

export interface DeleteTodoItem_deleteTodoItem {
  __typename: "TodoItem";
  id: string;
}

export interface DeleteTodoItem {
  deleteTodoItem: DeleteTodoItem_deleteTodoItem | null;
}

export interface DeleteTodoItemVariables {
  id: string;
}
