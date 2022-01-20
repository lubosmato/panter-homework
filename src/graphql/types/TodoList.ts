import {extendType, mutationField, nonNull, objectType, stringArg} from "nexus"

export const TodoList = objectType({
  name: "TodoList",
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.todoItems()
  },
})

export const GetMyTodoLists = extendType({
  type: "Query",
  definition(t) {
    t.list.field("myTodoLists", {
      type: TodoList,
      async resolve(root, args, context) {
        if (!context.session?.user.id) {
          return null
        }
        return context.prisma.todoList.findMany({
          where: {userId: context.session.user.id},
          include: {
            todoItems: true,
          },
        })
      },
    })
  },
})

export const CreateTodoList = mutationField("createTodoList", {
  type: TodoList,
  args: {
    title: nonNull(stringArg()),
  },
  resolve(root, args, {prisma, session}) {
    const userId = session?.user.id
    if (!userId) return null

    return prisma.todoList.create({
      data: {
        title: args.title,
        userId,
      },
    })
  },
})

export const DeleteTodoList = mutationField("deleteTodoList", {
  type: TodoList,
  args: {
    id: nonNull(stringArg()),
  },
  resolve(root, args, {prisma, session}) {
    const userId = session?.user.id
    if (!userId) return null

    return prisma.todoList.delete({where: {id: args.id}})
  },
})
