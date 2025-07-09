'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/button'
import { Heart, Triangle } from 'lucide-react'
import { calculateSpinDegrees } from '../lib/utils'

const segments = [
  { type: 'TRUTH', color: 'from-romantic-300 to-romantic-400' },
  { type: 'DARE', color: 'from-purple-300 to-purple-400' },
  { type: 'TRUTH', color: 'from-romantic-400 to-romantic-500' },
  { type: 'DARE', color: 'from-purple-400 to-purple-500' },
  { type: 'TRUTH', color: 'from-romantic-300 to-romantic-400' },
  { type: 'DARE', color: 'from-purple-300 to-purple-400' },
  { type: 'TRUTH', color: 'from-romantic-400 to-romantic-500' },
  { type: 'DARE', color: 'from-purple-400 to-purple-500' },
]

export default function SpinnerWheel({ onSpinComplete, isSpinning, currentPlayer }) {
  const [rotation, setRotation] = useState(0)
  const wheelRef = useRef(null)

  const handleSpin = () => {
    if (isSpinning) return

    const spinDegrees = calculateSpinDegrees()
    const finalRotation = rotation + spinDegrees
    setRotation(finalRotation)

    // Calculate which segment we landed on
    const normalizedRotation = (finalRotation % 360 + 360) % 360
    const segmentAngle = 360 / segments.length
    const segmentIndex = Math.floor((360 - normalizedRotation + segmentAngle / 2) / segmentAngle) % segments.length
    const result = segments[segmentIndex].type

    // Call onSpinComplete after animation
    setTimeout(() => {
      onSpinComplete(result)
    }, 3000)
  }

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Spinner Container */}
      <div className="relative">
        {/* Fixed Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
          <Triangle className="w-6 h-6 text-romantic-600 fill-current rotate-180" />
        </div>

        {/* Spinning Wheel */}
        <motion.div
          ref={wheelRef}
          className="relative w-80 h-80 rounded-full shadow-2xl overflow-hidden border-8 border-white"
          animate={{ rotate: rotation }}
          transition={{
            duration: 3,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          {segments.map((segment, index) => {
            const angle = (360 / segments.length) * index
            return (
              <div
                key={index}
                className={`absolute w-full h-full bg-gradient-to-r ${segment.color}`}
                style={{
                  clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((angle - 22.5) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle - 22.5) * Math.PI / 180)}%, ${50 + 50 * Math.cos((angle + 22.5) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle + 22.5) * Math.PI / 180)}%)`,
                }}
              >
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: '50% 50%',
                  }}
                >
                  <span
                    className="text-white font-bold text-lg"
                    style={{
                      transform: `translateY(-60px) rotate(${-angle}deg)`,
                    }}
                  >
                    {segment.type}
                  </span>
                </div>
              </div>
            )
          })}

          {/* Center Heart */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Heart className="w-8 h-8 text-romantic-500 fill-current" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Spin Button */}
      <Button
        onClick={handleSpin}
        disabled={isSpinning}
        variant="romantic"
        size="lg"
        className="px-12 py-4 text-lg font-semibold"
      >
        {isSpinning ? 'Spinning...' : `${currentPlayer}'s Turn - Spin the Wheel!`}
      </Button>
    </div>
  )
}