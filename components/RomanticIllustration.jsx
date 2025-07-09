'use client'

import { Card, CardContent } from '../components/ui/card'
import { Heart, Users } from 'lucide-react'

export default function RomanticIllustration() {
  return (
    <Card className="h-full bg-gradient-to-br from-romantic-100 via-romantic-200 to-purple-200 border-romantic-300 shadow-lg overflow-hidden">
      <CardContent className="p-8 h-full flex flex-col justify-center items-center text-center space-y-6">
        {/* Main Illustration */}
        <div className="relative">
          <div className="flex items-center justify-center space-x-8">
            {/* Boy Icon */}
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center shadow-lg">
              <Users className="w-10 h-10 text-blue-600" />
            </div>
            
            {/* Heart in the middle */}
            <div className="relative">
              <Heart className="w-12 h-12 text-romantic-500 fill-current animate-pulse" />
              <div className="absolute -top-1 -right-1">
                <div className="w-4 h-4 bg-romantic-400 rounded-full animate-ping"></div>
              </div>
            </div>
            
            {/* Girl Icon */}
            <div className="w-20 h-20 bg-romantic-100 rounded-full flex items-center justify-center shadow-lg">
              <Users className="w-10 h-10 text-romantic-600" />
            </div>
          </div>
          
          {/* Floating Hearts */}
          <div className="absolute -top-4 left-4">
            <Heart className="w-4 h-4 text-romantic-300 fill-current animate-bounce" style={{ animationDelay: '0.5s' }} />
          </div>
          <div className="absolute -top-2 right-6">
            <Heart className="w-3 h-3 text-purple-300 fill-current animate-bounce" style={{ animationDelay: '1s' }} />
          </div>
          <div className="absolute top-8 -left-2">
            <Heart className="w-3 h-3 text-romantic-400 fill-current animate-bounce" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>
        
        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-romantic-700">
            Spin Your Way to Love
          </h2>
          <p className="text-romantic-600 text-sm leading-relaxed">
            The ultimate romantic truth or dare game for couples. 
            Discover new things about each other and create unforgettable moments together.
          </p>
        </div>
        
        {/* Decorative Elements */}
        <div className="flex space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-romantic-400 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}