'use client'

import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { CheckCircle, XCircle, Heart } from 'lucide-react'

export default function QuestionCard({ question, questionType, playerName, onAnswer, onSkip }) {
  if (!question) return null

  return (
    <Card className="w-full max-w-2xl mx-auto backdrop-blur-sm bg-white/90 shadow-xl border-romantic-200">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Heart className="w-6 h-6 text-romantic-500 fill-current" />
          <CardTitle className={`text-2xl font-bold ${questionType === 'TRUTH' ? 'text-romantic-600' : 'text-purple-600'}`}>
            {questionType} for {playerName}
          </CardTitle>
          <Heart className="w-6 h-6 text-romantic-500 fill-current" />
        </div>
      </CardHeader>
      
      <CardContent className="text-center space-y-6">
        <div className={`p-6 rounded-lg ${questionType === 'TRUTH' ? 'bg-romantic-50' : 'bg-purple-50'}`}>
          <p className="text-lg text-gray-800 leading-relaxed">
            {question.text}
          </p>
        </div>
        
        <div className="flex justify-center space-x-4">
          <Button
            onClick={onAnswer}
            variant="romantic"
            size="lg"
            className="flex items-center space-x-2"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Answered (+1 Point)</span>
          </Button>
          
          <Button
            onClick={onSkip}
            variant="outline"
            size="lg"
            className="flex items-center space-x-2 border-gray-300 hover:bg-gray-50"
          >
            <XCircle className="w-5 h-5" />
            <span>Skip</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}