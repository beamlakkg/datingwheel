import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')      // "TRUTH" or "DARE"
  const mode = searchParams.get('mode')      // "random" or null

  if (!type || (type !== 'TRUTH' && type !== 'DARE')) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  }

  const questions = await prisma.question.findMany({ where: { type } })

  if (questions.length === 0) {
    return NextResponse.json({ error: 'No questions found' }, { status: 404 })
  }

  if (mode === 'random') {
    const random = questions[Math.floor(Math.random() * questions.length)]
    return NextResponse.json(random)
  }

  return NextResponse.json(questions) // return all if no mode
}
