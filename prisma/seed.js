import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()

async function main() {
  const data = JSON.parse(fs.readFileSync('./prisma/questions.json', 'utf-8'))

  for (const question of data) {
    await prisma.question.create({
      data: {
        text: question.text,
        type: question.type // should be either 'TRUTH' or 'DARE'
      }
    })
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
