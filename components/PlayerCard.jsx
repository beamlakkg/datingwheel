'use client'

import { useState } from 'react'
import { Card, CardContent } from '../components/ui/card'
import { User, UserCheck, Edit3, Check } from 'lucide-react'
import { Button } from '../components/ui/button'

export default function PlayerCard({ player, score, isActive, avatar, onNameChange, canEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempName, setTempName] = useState(player)

  const handleSave = () => {
    onNameChange(tempName)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempName(player)
    setIsEditing(false)
  }

  return (
    <Card className={`transition-all duration-300 smooth-transition ${
      isActive 
        ? 'ring-2 ring-romantic-400 shadow-xl scale-105 bg-gradient-to-br from-romantic-50 to-purple-50' 
        : 'opacity-75 hover:opacity-90 bg-white/80 backdrop-blur-sm'
    }`}>
      <CardContent className="p-6 text-center">
        <div className="flex flex-col items-center space-y-4">
          {/* Avatar */}
          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
            isActive 
              ? 'bg-gradient-to-br from-romantic-200 to-romantic-300 shadow-lg' 
              : 'bg-gray-100'
          }`}>
            {avatar === 'boy' ? (
              <User className={`w-8 h-8 ${isActive ? 'text-romantic-600' : 'text-gray-500'}`} />
            ) : (
              <UserCheck className={`w-8 h-8 ${isActive ? 'text-romantic-600' : 'text-gray-500'}`} />
            )}
          </div>
          
          {/* Player Name */}
          <div className="w-full">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full text-center font-semibold text-lg bg-white/80 border border-romantic-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-romantic-400"
                  maxLength={15}
                />
                <div className="flex space-x-2 justify-center">
                  <Button size="sm" onClick={handleSave} variant="romantic">
                    <Check className="w-3 h-3" />
                  </Button>
                  <Button size="sm" onClick={handleCancel} variant="outline">
                    ✕
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <h3 className={`font-semibold text-lg ${
                  isActive ? 'text-romantic-700' : 'text-gray-600'
                }`}>
                  {player}
                </h3>
                {canEdit && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditing(true)}
                    className="p-1 h-auto"
                  >
                    <Edit3 className="w-3 h-3" />
                  </Button>
                )}
              </div>
            )}
          </div>
          
          {/* Score */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Score</p>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isActive 
                ? 'bg-gradient-to-br from-romantic-400 to-romantic-600 text-white shadow-lg' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              <span className="text-xl font-bold">{score}</span>
            </div>
          </div>

          {/* Active Indicator */}
          {isActive && (
            <div className="flex items-center space-x-1 text-romantic-600">
              <div className="w-2 h-2 bg-romantic-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium">Your Turn</span>
              <div className="w-2 h-2 bg-romantic-500 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}