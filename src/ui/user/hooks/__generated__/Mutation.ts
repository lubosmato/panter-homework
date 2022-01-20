/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Mutation
// ====================================================

export interface Mutation_deleteTodoList {
  __typename: "TodoList";
  id: string;
  title: string;
}

export interface Mutation {
  deleteTodoList: Mutation_deleteTodoList | null;
}

export interface MutationVariables {
  id: string;
}
