import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Smartphone, ArrowRight, Loader2 } from 'lucide-react'
import { Country } from '../../lib/countries'
import { CountrySelect } from './CountrySelect'
import { OTPInput } from './OTPInput'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { useAuthStore } from '../../store/auth'
import { generateId, sleep } from '../../lib/utils'
import { toast } from 'sonner'

const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be at most 15 digits')
    .regex(/^\d+$/, 'Phone number must contain only digits'),
})

type PhoneFormData = z.infer<typeof phoneSchema>

export function LoginForm() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(''))
  const [isLoading, setIsLoading] = useState(false)
  const [sentOTP, setSentOTP] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  
  const { login } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
  })

  const handlePhoneSubmit = async (data: PhoneFormData) => {
    if (!selectedCountry) {
      toast.error('Please select a country')
      return
    }

    setIsLoading(true)
    try {
      await sleep(1500)
      
      const mockOTP = Math.random().toString().slice(2, 8)
      setSentOTP(mockOTP)
      setPhoneNumber(data.phoneNumber)
      
      toast.success(`OTP sent to ${selectedCountry.dialCode} ${data.phoneNumber}`)
      toast.info(`Demo OTP: ${mockOTP}`, { duration: 10000 })
      setStep('otp')
    } catch {
      toast.error('Failed to send OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOTPSubmit = async () => {
    const otpCode = otpValues.join('')
    
    if (otpCode.length !== 6) {
      toast.error('Please enter the complete OTP')
      return
    }

    setIsLoading(true)
    try {
      await sleep(1000)
      
      if (otpCode === sentOTP) {
        const user = {
          id: generateId(),
          phoneNumber: phoneNumber,
          countryCode: selectedCountry!.dialCode,
          createdAt: new Date(),
        }
        
        login(user)
        toast.success('Successfully logged in!')
        
        reset()
      } else {
        toast.error('Invalid OTP. Please try again.')
        setOtpValues(Array(6).fill(''))
      }
    } catch {
      toast.error('Verification failed. Please try again.')
      setOtpValues(Array(6).fill(''))
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setIsLoading(true)
    try {
      await sleep(1000)
      const mockOTP = Math.random().toString().slice(2, 8)
      setSentOTP(mockOTP)
      toast.success('OTP resent successfully')
      toast.info(`Demo OTP: ${mockOTP}`, { duration: 10000 })
      setOtpValues(Array(6).fill(''))
    } catch {
      toast.error('Failed to resend OTP')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToPhone = () => {
    setStep('phone')
    setOtpValues(Array(6).fill(''))
    setSentOTP('')
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Smartphone className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {step === 'phone' ? 'Welcome to Gemini Chat' : 'Verify your number'}
        </h1>
        <p className="text-sm text-muted-foreground">
          {step === 'phone'
            ? 'Enter your phone number to get started'
            : `We sent a 6-digit code to ${selectedCountry?.dialCode} ${phoneNumber}`}
        </p>
      </div>

      {step === 'phone' ? (
        <form onSubmit={handleSubmit(handlePhoneSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Country</label>
            <CountrySelect
              value={selectedCountry}
              onChange={setSelectedCountry}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <Input
              {...register('phoneNumber')}
              type="tel"
              placeholder="Enter your phone number"
              className={errors.phoneNumber ? 'border-destructive' : ''}
            />
            {errors.phoneNumber && (
              <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !selectedCountry}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="space-y-4">
            <label className="text-sm font-medium">Enter verification code</label>
            <OTPInput
              value={otpValues}
              onChange={setOtpValues}
              className="justify-center"
            />
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleOTPSubmit}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Verify & Continue'
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={isLoading}
                className="text-sm text-primary hover:underline disabled:opacity-50"
              >
                Didn't receive the code? Resend
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleBackToPhone}
                className="text-sm text-muted-foreground hover:underline"
              >
                Change phone number
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}