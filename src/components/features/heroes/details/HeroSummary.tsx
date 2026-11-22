import type React from 'react'
import type { BaseStat, Hero } from '../../../../models/Hero'
import { ELEMENT_BADGE_COLORS, fallbackColor, ROLE_BADGE_COLORS, ZODIAC_BADGE_COLORS } from '../../../../constants/badgeColors'
import BaseGradeIcon from '../../../ui/BaseGradeIcon'
import Badge, { type BadgeProps } from '../../../ui/Badge'
import { capitalize } from '../../../../utils/string'
import HeroStat from './HeroStat'
import { ASSETS_URL } from '../../../../constants/urls'

type HeroSummaryProps = {
  hero?: Hero,
  baseStats?: BaseStat 
}

const PERCENT_STATS = new Set([
  'critical_chance',
  'critical_damage',
  'effectiveness',
  'effect_resistance',
  'dual_attack',
])

const EXCLUDED_STATS = new Set([
  'id',
  'created_at',
  'updated_at',
])

const HeroSummary: React.FC<HeroSummaryProps> = ({ hero, baseStats }) => {

  const stats = Object.entries(baseStats ?? {}).filter(
    ([key, value]) => !EXCLUDED_STATS.has(key) && value != null
  )
  const { id, name, element, zodiac, role, base_grade } = hero || {}

  const zodiacKey = zodiac as keyof typeof ZODIAC_BADGE_COLORS
  const roleKey = role?.toLowerCase().replaceAll(' ', '_') as keyof typeof ROLE_BADGE_COLORS
  const elementKey = element as keyof typeof ELEMENT_BADGE_COLORS

  const zodiacColor = ZODIAC_BADGE_COLORS[zodiacKey] ?? fallbackColor
  const roleColor = ROLE_BADGE_COLORS[roleKey] ?? fallbackColor
  const elementColor = ELEMENT_BADGE_COLORS[elementKey] ?? fallbackColor

  const heroBadgeProps: BadgeProps[] = [
    {
      bgColor: zodiacColor.bg,
      textColor: zodiacColor.text,
      imageLink: zodiac && zodiacColor !== fallbackColor ? `${ASSETS_URL}/zodiacs/${zodiac}.svg` : undefined,
      text: capitalize(zodiac),
    },
    {
      bgColor: roleColor.bg,
      textColor: roleColor.text,
      imageLink: role && roleColor !== fallbackColor ? `${ASSETS_URL}/roles/${role?.replaceAll(' ', '_')}.png` : undefined,
      text: capitalize(role ?? ''),
    },
    {
      bgColor: elementColor.bg,
      textColor: elementColor.text,
      imageLink: element && elementColor !== fallbackColor ? `${ASSETS_URL}/elements/${element}.png` : undefined,
      text: capitalize(element ?? ''),
    },
  ]

  return (
    <div className="sm:w-full min-w-xs h-auto flex flex-col justify-start gap-y-4">
      <div className="p-4 flex flex-col gap-y-2 bg-gray-800 h-fit">
        <div className="flex flex-row justify-start items-baseline gap-x-2">
          <span className="text-2xl font-semibold">{name}</span>
        </div>
        <div className="pb-2">
          <BaseGradeIcon heroId={id ?? ''} baseGrade={base_grade ?? 0} size="detail"/>
        </div>
        <div className="flex flex-wrap gap-x-2">
          {heroBadgeProps.map((props, key) => <Badge key={key} {...props}/>)}
        </div>
      </div>
      <div className="p-4 grid grid-cols-1 gap-y-4 bg-gray-800">
        <h4 className="text-xl font-bold">Base Stats</h4>
        <div className="h-fit grid sm:grid-cols-1 lg:grid-cols-2 gap-y-2">
          {
            stats.map(([stat, value]) => (
              <HeroStat
                key={stat}
                stat={capitalize(stat.replace('_', ' '), true)}
                value={`${value}${PERCENT_STATS.has(stat) ? ' %' : ''}`}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default HeroSummary
