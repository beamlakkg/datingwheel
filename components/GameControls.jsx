'use client'

import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { RotateCcw, Trophy, Heart } from 'lucide-react'

export default function GameControls({ onRestart, player1Score, player2Score, player1Name, player2Name }) {
  const totalQuestions = player1Score + player2Score
  const winner = player1Score > player2Score ? player1Name : player2Score > player1Score ? player2Name : null

  return (
    <Card className="glass-card border-romantic-200 shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Game Stats */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <Heart className="w-5 h-5 text-romantic-500 fill-current" />
              <p className="text-lg font-semibold text-romantic-700">
                Questions Answered: {totalQuestions}
              </p>
              <Heart className="w-5 h-5 text-romantic-500 fill-current" />
            </div>
            
            {winner && totalQuestions > 0 && (
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-3 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  <p className="text-lg font-bold text-yellow-700">
                    {winner} is leading!
                  </p>
                  <Trophy className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
            )}

            {totalQuestions > 0 && player1Score === player2Score && (
              <div className="bg-gradient-to-r from-romantic-50 to-purple-50 p-3 rounded-lg border border-romantic-200">
                <p className="text-lg font-semibold text-romantic-700">
                  It's a tie! 💕
                </p>
              </div>
            )}
          </div>
          
          {/* Score Breakdown */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
            <div className="text-center p-3 bg-romantic-50 rounded-lg border border-romantic-200">
              <p className="text-sm text-romantic-600">{player1Name}</p>
              <p className="text-2xl font-bold text-romantic-700">{player1Score}</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm text-purple-600">{player2Name}</p>
              <p className="text-2xl font-bold text-purple-700">{player2Score}</p>
            </div>
          </div>

          {/* Restart Button */}
          <Button
            onClick={onRestart}
            variant="outline"
            size="lg"
            className="flex items-center space-x-2 border-romantic-300 hover:bg-romantic-50 hover:border-romantic-400 transition-all duration-300"
          >
            <RotateCcw className="w-5 h-5" />
            <span>New Game</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}