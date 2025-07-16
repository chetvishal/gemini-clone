import React, { useRef, useEffect } from 'react'
import { cn } from '../../lib/utils'

interface OTPInputProps {
  value: string[]
  onChange: (value: string[]) => void
  length?: number
  className?: string
}

export function OTPInput({ value, onChange, length = 6, className }: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length)
  }, [length])

  const handleChange = (index: number, newValue: string) => {
    if (newValue.length > 1) {
      const pastedValues = newValue.slice(0, length).split('')
      const newOtp = [...value]
      pastedValues.forEach((val, i) => {
        if (index + i < length && /^\d$/.test(val)) {
          newOtp[index + i] = val
        }
      })
      onChange(newOtp)
      
      const lastIndex = Math.min(index + pastedValues.length - 1, length - 1)
      inputRefs.current[lastIndex]?.focus()
    } else if (/^\d$/.test(newValue) || newValue === '') {
      const newOtp = [...value]
      newOtp[index] = newValue
      onChange(newOtp)

      if (newValue && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  return (
    <div className={cn("flex gap-2", className)}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={length}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="h-12 w-12 rounded-md border border-input bg-transparent text-center text-lg font-medium shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        />
      ))}
    </div>
  )
}