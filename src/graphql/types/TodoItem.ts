import { nonNull, objectType, mutationField, stringArg, nullable, booleanArg } from "nexus";

export const TodoItem = objectType({
  name: "TodoItem",
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.isChecked()
  },
});

export const ChangeTodoItem = mutationField("changeTodoItem", {
  type: TodoItem,
  args: {
    id: nonNull(stringArg()),
    isChecked: nonNull(booleanArg()),
    title: nonNull(stringArg()),
  },
  async resolve(root, args, { prisma, session }) {
    const userId = session?.user.id
    if (!userId) return null

    const todoItem = await prisma.todoItem.findUnique({ where: { id: args.id } })
    if (!todoItem) return null

    const updatedTodoItem = {...todoItem, ...args}

    return prisma.todoItem.update({
      where: {
        id: args.id,
      },
      data: updatedTodoItem,
    })
  }
});

export const CreateTodoItem = mutationField("createTodoItem", {
  type: TodoItem,
  args: {
    todoListId: nonNull(stringArg()),
  },
  resolve(root, args, { prisma, session }) {
    const userId = session?.user.id
    if (!userId) return null

    return prisma.todoItem.create({ 
      data: {
        todoListId: args.todoListId,
        title: "",
        isChecked: false,
      }
    })
  }
});

export const DeleteTodoItem = mutationField("deleteTodoItem", {
  type: TodoItem,
  args: {
    id: nonNull(stringArg()),
  },
  resolve(root, args, { prisma, session }) {
    const userId = session?.user.id
    if (!userId) return null

    return prisma.todoItem.delete({ where: { id: args.id } })
  }
});
