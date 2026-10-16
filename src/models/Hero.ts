export type Zodiac = {
  id?: number
  name?: string
}

export type HeroClass = {
  id?: number
  name?: string
}

export type BaseStat = {
  id?: number
  health?: number
  attack?: number
  defense?: number
  speed?: number
  critical_chance?: number
  critical_damage?: number
  effectiveness?: number
  effect_resistance?: number
  dual_attack?: number
  updated_at?: Date
  created_at?: Date
}

export type Hero = {
  id?: string
  base_stat_id?: number
  name?: string
  zodiac?: string
  gender?: string
  role?: string
  base_grade?: number
  element?: string
  imprint_release?: string
  area_of_imprint?: boolean[]
  release_value?: number[]
  imprint_concentration?: string
  concentration_value?: number[]
}

export type Skill = {
  id?: number
  hero_id?: string
  name?: string
  multiplier?: string
  increasing_stat?: string[]
  increasing_value?: number[]
  cooldown?: number
  is_active?: boolean
  soul_gain?: number
  description?: string
  can_soulburn?: boolean
  soul_cost?: number
  soul_description?: string
}

export type HeroDetailType = {
  hero: Hero
  skills: Skill[]
  base_stat: BaseStat
}
