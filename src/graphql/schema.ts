import {makeSchema, queryType} from "nexus"
import {nexusPrisma} from "nexus-plugin-prisma"

import * as userTypes from "./types/User"
import * as todoListTypes from "./types/TodoList"
import * as todoItemTypes from "./types/TodoItem"
import {join} from "path"
export const schema = makeSchema({
  types: [userTypes, todoItemTypes, todoListTypes],
  plugins: [nexusPrisma()],

  contextType: {
    module: join(process.cwd(), "src", "graphql", "context.ts"),
    export: "Context",
  },
  outputs: {
    schema: true, // means schema.graphql in the root
    typegen: join(
      process.cwd(), "src", "graphql", "__generated__", "index.d.ts"
    ),
  },
})
