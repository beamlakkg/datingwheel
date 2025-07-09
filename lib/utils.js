import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function calculateSpinDegrees() {
  const minRotations = 3
  const maxRotations = 6
  const baseRotation = (minRotations + Math.random() * (maxRotations - minRotations)) * 360
  const finalOffset = Math.random() * 360
  return baseRotation + finalOffset
}
