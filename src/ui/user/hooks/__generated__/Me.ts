/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Me
// ====================================================

export interface Me_me {
  __typename: "User";
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}

export interface Me {
  me: Me_me | null;
}
