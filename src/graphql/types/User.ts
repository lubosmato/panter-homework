import {objectType, queryType} from "nexus"

export const User = objectType({
  name: "User",
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.image()
  },
})

export const GetMe = queryType({
  definition(t) {
    t.field("me", {
      type: User,
      resolve(root, args, context) {
        if (!context.session?.user.id) {
          return null
        }
        return context.prisma.user.findFirst({
          where: {id: context.session.user.id},
          include: {
            todoLists: false,
          },
        })
      },
    })
  },
})
