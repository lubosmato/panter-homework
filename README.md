## starter challenge

This is a [nextjs](https://nextjs.org/) project with

- [next-auth](https://next-auth.js.org/) for autorization (currently uses google login)
- apollo server
- [nexus](https://nexusjs.org/) to define graphql resolvers and schema
- [prisma](https://www.prisma.io/) for database (using progress)
- [nexus-plugin-prisma](https://nexusjs.org/docs/plugins/prisma/overview) to derive graphql types from the prisma schema

## getting started

run `yarn dev` to run it locally on [localhost:3000](http://localhost:3000)

## Env vars

You need to define some env vars, see [.env.template](.env.template).

You additionaly need to create oauth credentials to signin with google (https://console.cloud.google.com/apis/dashboard)
You can also replace

## db schema changes

edit [schema.prisma](prisma/schema.prisma) to adjust the schema.
Make sure to use the Prisma vscode extension for formatting, syntax highlighting
and automatically set references correctly.

Then, run `yarn prisma migrate dev` to create a migration and push your changes to the DB

### Adjust graphql api

Add new types in [src/graphql/types](src/graphql/types) and import them into the [schema](src/graphql/schema.ts).
If the name of a type matches a prisma Model, you can use `t.model.xxx()` to forward the fields. If you just
adjusted the prisma schema, you sometimes have to restart the server
