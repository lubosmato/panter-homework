/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateTodoItem
// ====================================================

export interface UpdateTodoItem_updateTodoItem {
  __typename: "TodoItem";
  id: string;
  title: string;
  isChecked: boolean;
}

export interface UpdateTodoItem {
  updateTodoItem: UpdateTodoItem_updateTodoItem | null;
}

export interface UpdateTodoItemVariables {
  id: string;
  isChecked: boolean;
  title: string;
}
