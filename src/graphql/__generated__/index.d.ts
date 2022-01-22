/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../context"


declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    model: NexusPrisma<TypeName, 'model'>
    crud: any
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  TodoItemWhereUniqueInput: { // input type
    id?: string | null; // String
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  Mutation: {};
  Query: {};
  TodoItem: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // String!
    isChecked: boolean; // Boolean!
    title: string; // String!
  }
  TodoList: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // String!
    title: string; // String!
  }
  User: { // root type
    email?: string | null; // String
    id: string; // String!
    image?: string | null; // String
    name?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    createTodoItem: NexusGenRootTypes['TodoItem'] | null; // TodoItem
    createTodoList: NexusGenRootTypes['TodoList'] | null; // TodoList
    deleteTodoItem: NexusGenRootTypes['TodoItem'] | null; // TodoItem
    deleteTodoList: NexusGenRootTypes['TodoList'] | null; // TodoList
    updateTodoItem: NexusGenRootTypes['TodoItem'] | null; // TodoItem
    updateTodoList: NexusGenRootTypes['TodoList'] | null; // TodoList
  }
  Query: { // field return type
    me: NexusGenRootTypes['User'] | null; // User
    myTodoLists: Array<NexusGenRootTypes['TodoList'] | null> | null; // [TodoList]
  }
  TodoItem: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // String!
    isChecked: boolean; // Boolean!
    title: string; // String!
  }
  TodoList: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // String!
    title: string; // String!
    todoItems: NexusGenRootTypes['TodoItem'][]; // [TodoItem!]!
  }
  User: { // field return type
    email: string | null; // String
    id: string; // String!
    image: string | null; // String
    name: string | null; // String
  }
}

export interface NexusGenFieldTypeNames {
  Mutation: { // field return type name
    createTodoItem: 'TodoItem'
    createTodoList: 'TodoList'
    deleteTodoItem: 'TodoItem'
    deleteTodoList: 'TodoList'
    updateTodoItem: 'TodoItem'
    updateTodoList: 'TodoList'
  }
  Query: { // field return type name
    me: 'User'
    myTodoLists: 'TodoList'
  }
  TodoItem: { // field return type name
    createdAt: 'DateTime'
    id: 'String'
    isChecked: 'Boolean'
    title: 'String'
  }
  TodoList: { // field return type name
    createdAt: 'DateTime'
    id: 'String'
    title: 'String'
    todoItems: 'TodoItem'
  }
  User: { // field return type name
    email: 'String'
    id: 'String'
    image: 'String'
    name: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createTodoItem: { // args
      todoListId: string; // String!
    }
    createTodoList: { // args
      title: string; // String!
    }
    deleteTodoItem: { // args
      id: string; // String!
    }
    deleteTodoList: { // args
      id: string; // String!
    }
    updateTodoItem: { // args
      id: string; // String!
      isChecked: boolean; // Boolean!
      title: string; // String!
    }
    updateTodoList: { // args
      id: string; // String!
      title: string; // String!
    }
  }
  TodoList: {
    todoItems: { // args
      after?: NexusGenInputs['TodoItemWhereUniqueInput'] | null; // TodoItemWhereUniqueInput
      before?: NexusGenInputs['TodoItemWhereUniqueInput'] | null; // TodoItemWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}