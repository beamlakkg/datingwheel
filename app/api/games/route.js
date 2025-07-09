import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request) {
  try {
    const { player1, player2 } = await request.json()

    if (!player1 || !player2) {
      return NextResponse.json({ error: 'Both player names are required' }, { status: 400 })
    }

    const game = await prisma.game.create({
      data: {
        player1,
        player2,
        score1: 0,
        score2: 0,
      }
    })

    return NextResponse.json(game)
  } catch (error) {
    console.error('Error creating game:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const { gameId, score1, score2 } = await request.json()

    if (!gameId) {
      return NextResponse.json({ error: 'Game ID is required' }, { status: 400 })
    }

    const game = await prisma.game.update({
      where: { id: gameId },
      data: {
        score1: score1 || 0,
        score2: score2 || 0,
      }
    })

    return NextResponse.json(game)
  } catch (error) {
    console.error('Error updating game:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}