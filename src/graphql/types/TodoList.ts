import {extendType, mutationField, nonNull, objectType, stringArg} from "nexus"

export const TodoList = objectType({
  name: "TodoList",
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.createdAt()
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
            todoItems: {
              // TODO it works on prisma layer but when it is returned from resolver, it fucks up ordering
              orderBy: {
                createdAt: "asc",
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        })
      },
    })
  },
})

export const UpdateTodoList = mutationField("updateTodoList", {
  type: TodoList,
  args: {
    id: nonNull(stringArg()),
    title: nonNull(stringArg()),
  },
  async resolve(root, args, {prisma, session}) {
    const userId = session?.user.id
    if (!userId) return null

    const todoList = await prisma.todoList.findUnique({where: {id: args.id}})
    if (!todoList) return null

    const updatedTodoList = {...todoList, ...args}

    return prisma.todoList.update({
      where: {
        id: args.id,
      },
      data: updatedTodoList,
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
        todoItems: {
          create: {
            isChecked: false,
            title: "",
          },
        },
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
