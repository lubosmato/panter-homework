import {PrismaClient, Prisma} from "@prisma/client"

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Luboš",
    email: "lubos.matejcik@gmail.com",
    todoLists: {
      create: [
        {
          title: "Important stuff",
          todoItems: {
            create: [
              {
                isChecked: false,
                title: "Finish panter homework",
                createdAt: new Date(2022, 1, 10, 4, 2, 10),
              },
              {
                isChecked: false,
                title: "Go for a beer with friends",
                createdAt: new Date(2022, 1, 10, 4, 2, 15),
              },
              {
                isChecked: false,
                title: "Visit family",
                createdAt: new Date(2022, 1, 10, 4, 2, 20),
              },
              {
                isChecked: true,
                title: "Make database seeds",
                createdAt: new Date(2022, 1, 10, 4, 2, 25),
              },
            ],
          },
        },
        {
          title: "Less important stuff",
          todoItems: {
            create: [
              {
                isChecked: false,
                title: "Go hiking",
                createdAt: new Date(2022, 1, 10, 4, 2, 30),
              },
              {
                isChecked: false,
                title: "Go shopping",
                createdAt: new Date(2022, 1, 10, 4, 2, 10),
              },
              {
                isChecked: false,
                title: "Make e-ink display",
                createdAt: new Date(2022, 1, 10, 4, 2, 20),
              },
            ],
          },
        },
      ],
    },
  },
]

async function main() {
  console.log("Start seeding ...")
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log("Seeding finished.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
