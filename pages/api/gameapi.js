import { prisma } from '@/lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { player1, player2 } = req.body

      if (!player1 || !player2) {
        return res.status(400).json({ error: 'Both player names are required' })
      }

      const game = await prisma.game.create({
        data: {
          player1,
          player2,
          score1: 0,
          score2: 0,
        }
      })

      return res.status(200).json(game)
    } catch (error) {
      console.error('Error creating game:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  } else if (req.method === 'PUT') {
    try {
      const { gameId, score1, score2 } = req.body

      if (!gameId) {
        return res.status(400).json({ error: 'Game ID is required' })
      }

      const game = await prisma.game.update({
        where: { id: gameId },
        data: {
          score1: score1 || 0,
          score2: score2 || 0,
        }
      })

      return res.status(200).json(game)
    } catch (error) {
      console.error('Error updating game:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  } else {
    res.setHeader('Allow', ['POST', 'PUT'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 