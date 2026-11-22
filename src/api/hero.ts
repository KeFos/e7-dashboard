import { HEROES_URL } from '../constants/urls'
import type { Hero, HeroDetailType } from '../models/Hero'

export const getHeroes = async (): Promise<Hero[]> => {
  const res = await fetch(HEROES_URL)
  if (!res.ok) throw new Error('Failed to fetch!')
  return res.json()
}

export const getHeroDetail = async (id?: string): Promise<HeroDetailType> => {
  const res = await fetch(`${HEROES_URL}/${id}`)
  if (!res.ok) throw new Error('Failed to fetch!')
  return res.json()
}
