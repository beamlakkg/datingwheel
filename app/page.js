'use client'

import { useState } from 'react'
import SpinnerWheel from '../components/SpinnerWheel'
import PlayerCard from '../components/PlayerCard'
import QuestionCard from '../components/QuestionCard'
import GameControls from '../components/GameControls'
import AdSpace from '../components/AdSpace'
import RomanticIllustration from '../components/RomanticIllustration'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog'
import { Heart, Play } from 'lucide-react'
import { calculateSpinDegrees } from '../lib/utils' // Adjust path if needed

export default function Home() {
  const [gameState, setGameState] = useState('setup') // 'setup', 'playing', 'question'
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [players, setPlayers] = useState({ player1: 'Alex', player2: 'Jordan' })
  const [scores, setScores] = useState({ player1: 0, player2: 0 })
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [questionType, setQuestionType] = useState(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)

  const startGame = () => {
    setGameState('playing')
    setShowWelcome(false)
  }

const handleSpinComplete = async (result) => {
  setIsSpinning(false)
  setQuestionType(result)

  try {
    const res = await fetch(`/api/questions?type=${result}&mode=random`)
    const data = await res.json()

    if (!res.ok) {
      console.error('Error fetching question:', data.error)
      return
    }

    setCurrentQuestion(data)
    setGameState('question')
  } catch (err) {
    console.error('Network error:', err)
  }
}


  const handleAnswer = () => {
    // Update score
    const newScores = { ...scores }
    if (currentPlayer === 1) {
      newScores.player1 += 1
    } else {
      newScores.player2 += 1
    }
    setScores(newScores)
    
    // Switch to next player
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
    setGameState('playing')
    setCurrentQuestion(null)
    setQuestionType(null)
  }

  const handleSkip = () => {
    // Switch to next player without scoring
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
    setGameState('playing')
    setCurrentQuestion(null)
    setQuestionType(null)
  }

  const handleRestart = () => {
    setGameState('setup')
    setCurrentPlayer(1)
    setScores({ player1: 0, player2: 0 })
    setCurrentQuestion(null)
    setQuestionType(null)
    setIsSpinning(false)
    setShowWelcome(true)
  }

  const handlePlayerNameChange = (playerKey, newName) => {
    setPlayers(prev => ({
      ...prev,
      [playerKey]: newName || (playerKey === 'player1' ? 'Alex' : 'Jordan')
    }))
  }

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Heart className="w-8 h-8 text-romantic-500 fill-current animate-pulse" />
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-romantic-600 to-purple-600 bg-clip-text text-transparent">
              Dating Spinner Game
            </h1>
            <Heart className="w-8 h-8 text-romantic-500 fill-current animate-pulse" />
          </div>
          <p className="text-lg text-romantic-600 max-w-2xl mx-auto">
            Spin your way to deeper connections with fun truth or dare questions designed for couples
          </p>
        </div>

        {/* Main Game Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Section - Romantic Illustration */}
          <div className="lg:col-span-3">
            <RomanticIllustration />
          </div>

          {/* Center Section - Main Game */}
          <div className="lg:col-span-6">
            <div className="space-y-6">
              {/* Player Cards */}
              <div className="grid grid-cols-2 gap-4">
                <PlayerCard
                  player={players.player1}
                  score={scores.player1}
                  isActive={currentPlayer === 1 && gameState === 'playing'}
                  avatar="boy"
                  onNameChange={(name) => handlePlayerNameChange('player1', name)}
                  canEdit={gameState === 'setup'}
                />
                <PlayerCard
                  player={players.player2}
                  score={scores.player2}
                  isActive={currentPlayer === 2 && gameState === 'playing'}
                  avatar="girl"
                  onNameChange={(name) => handlePlayerNameChange('player2', name)}
                  canEdit={gameState === 'setup'}
                />
              </div>

              {/* Game Content */}
              {gameState === 'setup' && (
                <Card className="glass-card border-romantic-200 shadow-xl">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-romantic-700 flex items-center justify-center space-x-2">
                      <Heart className="w-6 h-6 fill-current" />
                      <span>Ready to Play?</span>
                      <Heart className="w-6 h-6 fill-current" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-6">
                    <p className="text-romantic-600">
                      Get ready for an exciting game of truth or dare that will bring you closer together!
                    </p>
                    <div className="bg-romantic-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-romantic-700 mb-2">How to Play:</h4>
                      <ul className="text-sm text-romantic-600 space-y-1">
                        <li>• Take turns spinning the wheel</li>
                        <li>• Answer truth questions or complete dares</li>
                        <li>• Earn points for participating</li>
                        <li>• Have fun and connect!</li>
                      </ul>
                    </div>
                    <Button onClick={startGame} variant="romantic" size="lg" className="px-8">
                      <Play className="w-5 h-5 mr-2" />
                      Start Game
                    </Button>
                  </CardContent>
                </Card>
              )}

              {gameState === 'playing' && (
                <SpinnerWheel
                  onSpinComplete={handleSpinComplete}
                  isSpinning={isSpinning}
                  currentPlayer={players[`player${currentPlayer}`]}
                  onSpin={() => setIsSpinning(true)}
                />
              )}

              {gameState === 'question' && (
                <QuestionCard
                  question={currentQuestion}
                  questionType={questionType}
                  playerName={players[`player${currentPlayer}`]}
                  onAnswer={handleAnswer}
                  onSkip={handleSkip}
                />
              )}

              {/* Game Controls */}
              {gameState !== 'setup' && (
                <GameControls
                  onRestart={handleRestart}
                  player1Score={scores.player1}
                  player2Score={scores.player2}
                  player1Name={players.player1}
                  player2Name={players.player2}
                />
              )}
            </div>
          </div>

          {/* Right Section - Ad Space */}
          <div className="lg:col-span-3">
            <AdSpace />
          </div>
        </div>

        {/* Welcome Dialog */}
        <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
          <DialogContent className="max-w-md glass-card">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl text-romantic-700 flex items-center justify-center space-x-2">
                <Heart className="w-6 h-6 fill-current animate-pulse" />
                <span>Welcome to Love Spinner!</span>
                <Heart className="w-6 h-6 fill-current animate-pulse" />
              </DialogTitle>
              <DialogDescription className="text-center space-y-4 pt-4">
                <p className="text-gray-700">
                  Ready to discover new things about each other? This romantic truth or dare game 
                  is designed to bring couples closer together through fun questions and playful dares.
                </p>
                <div className="bg-gradient-to-r from-romantic-50 to-purple-50 p-4 rounded-lg border border-romantic-200">
                  <h4 className="font-semibold text-romantic-700 mb-3 flex items-center justify-center space-x-2">
                    <Heart className="w-4 h-4 fill-current" />
                    <span>Game Rules</span>
                    <Heart className="w-4 h-4 fill-current" />
                  </h4>
                  <ul className="text-sm text-romantic-600 space-y-2 text-left">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-romantic-400 rounded-full"></div>
                      <span>Take turns spinning the wheel</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-romantic-400 rounded-full"></div>
                      <span>Answer truth questions or complete dares</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-romantic-400 rounded-full"></div>
                      <span>Earn points for participating</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-romantic-400 rounded-full"></div>
                      <span>Have fun and connect!</span>
                    </li>
                  </ul>
                </div>
                <Button 
                  onClick={() => setShowWelcome(false)} 
                  variant="romantic" 
                  className="w-full"
                >
                  Let's Play! 💕
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}