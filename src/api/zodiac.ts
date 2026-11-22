import { ZODIACS_URL } from '../constants/urls'
import type { Zodiac } from '../models/Hero'

export const getZodiacs = async (): Promise<Zodiac[]> => {
  const res = await fetch(ZODIACS_URL)
  if (!res.ok) throw new Error('Failed to fetch get-zodiacs!')
  return res.json()
}
