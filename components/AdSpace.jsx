'use client'

import { Card, CardContent } from '../components/ui/card'
import { Heart, Sparkles } from 'lucide-react'

export default function AdSpace() {
  return (
    <Card className="h-full bg-gradient-to-br from-romantic-50 to-purple-50 border-romantic-200 shadow-lg">
      <CardContent className="p-6 h-full flex flex-col justify-center items-center text-center space-y-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-6 h-6 text-romantic-500" />
          <h3 className="text-lg font-semibold text-romantic-700">Advertisement Space</h3>
          <Sparkles className="w-6 h-6 text-romantic-500" />
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Perfect spot for romantic date ideas, couple activities, or relationship advice!
          </p>
          <div className="flex justify-center">
            <Heart className="w-8 h-8 text-romantic-400 fill-current" />
          </div>
        </div>
        
        <div className="text-xs text-gray-500 border-t pt-4 w-full">
          <p>Your ad could be here</p>
          <p className="font-medium">Contact us for rates</p>
        </div>
      </CardContent>
    </Card>
  )
}