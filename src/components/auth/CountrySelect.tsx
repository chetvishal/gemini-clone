import React, { useState, useEffect } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { Country, fetchCountries } from '../../lib/countries'
import { Input } from '../ui/Input'
import { LoadingSkeleton } from '../ui/LoadingSkeleton'

interface CountrySelectProps {
  value: Country | null
  onChange: (country: Country) => void
}

export function CountrySelect({ value, onChange }: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchCountries().then((data) => {
      setCountries(data)
      setLoading(false)
      if (!value && data.length > 0) {
        onChange(data[0]) // Default to first country (US)
      }
    })
  }, [value, onChange])

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.dialCode.includes(searchQuery)
  )

  if (loading) {
    return <LoadingSkeleton className="h-9 w-full" />
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors hover:bg-accent focus:outline-none focus:ring-1 focus:ring-ring"
      >
        <div className="flex items-center gap-2">
          {value && (
            <>
              <span className="text-lg">{value.flag}</span>
              <span>{value.dialCode}</span>
              <span className="hidden sm:inline">{value.name}</span>
            </>
          )}
        </div>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>

      {isOpen && (
        <div className="absolute top-full z-50 mt-1 max-h-60 w-full overflow-hidden rounded-md border bg-popover shadow-md">
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <div className="max-h-40 overflow-y-auto">
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  onChange(country)
                  setIsOpen(false)
                  setSearchQuery('')
                }}
                className="flex w-full items-center gap-3 px-3 py-2 text-sm hover:bg-accent focus:bg-accent focus:outline-none"
              >
                <span className="text-lg">{country.flag}</span>
                <span className="font-medium">{country.dialCode}</span>
                <span className="flex-1 text-left">{country.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}