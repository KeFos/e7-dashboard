import { ROLES_URL } from '../constants/urls'
import type { HeroClass } from '../models/Hero'

export const getRoles = async (): Promise<HeroClass[]> => {
  const res = await fetch(ROLES_URL)
  if (!res.ok) throw new Error('Failed to fetch get-roles!')
  return res.json()
}
