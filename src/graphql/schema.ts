import { makeSchema, queryType } from "nexus";
import { nexusPrisma } from "nexus-plugin-prisma";

import * as userTypes from "./types/User";
import { join } from "path";
export const schema = makeSchema({
  types: [userTypes],
  plugins: [nexusPrisma()],

  contextType: {
    module: join(process.cwd(), "src", "graphql", "context.ts"),
    export: "Context",
  },
  outputs: {
    schema: true, // means schema.graphql in the root
    typegen: join(
      process.cwd(),
      "node_modules/@types/nexus-typegen-custom/index.d.ts"
    ),
  },
});
