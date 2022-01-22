import {PrismaClient, Prisma} from "@prisma/client"

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Luboš",
    email: "lubos.matejcik@other.com",
    todoLists: {
      create: [
        {
          title: "Important stuff",
          todoItems: {
            create: [
              {
                isChecked: false,
                title: "Finish panter homework",
              },
              {
                isChecked: false,
                title: "Go for a beer with friends",
              },
              {
                isChecked: false,
                title: "Visit family",
              },
              {
                isChecked: true,
                title: "Make database seeds",
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
              },
              {
                isChecked: false,
                title: "Go shopping",
              },
              {
                isChecked: false,
                title: "Make e-ink display",
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
