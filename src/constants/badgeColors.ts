type BadgeColor = {
  bg: string;
  text: string;
}

export type BASE_GRADE = 3 | 4 | 5

export const fallbackColor = { bg: 'bg-gray-700', text: 'text-white' }

export const ZODIAC_BADGE_COLORS = {
  aries: { bg: 'bg-[#7F1D1D]', text: 'text-[#FECACA]' },
  taurus: { bg: 'bg-[#365314]', text: 'text-[#D9F99D]' },
  gemini: { bg: 'bg-[#854D0E]', text: 'text-[#FEF08A]' },
  cancer: { bg: 'bg-[#164E63]', text: 'text-[#CFFAFE]' },
  leo: { bg: 'bg-[#A16207]', text: 'text-[#FEF3C7]' },
  virgo: { bg: 'bg-[#3F6212]', text: 'text-[#ECFCCB]' },
  libra: { bg: 'bg-[#831843]', text: 'text-[#FBCFE8]' },
  scorpio: { bg: 'bg-[#701A75]', text: 'text-[#F5D0FE]' },
  sagittarius: { bg: 'bg-[#7C2D12]', text: 'text-[#FFEDD5]' },
  capricorn: { bg: 'bg-[#334155]', text: 'text-[#E2E8F0]' },
  aquarius: { bg: 'bg-[#1E40AF]', text: 'text-[#DBEAFE]' },
  pisces: { bg: 'bg-[#115E59]', text: 'text-[#CCFBF1]' },
} as const satisfies Record<string, BadgeColor>

export const ROLE_BADGE_COLORS = {
  mage: { bg: 'bg-[#4C1D95]', text: 'text-[#E9D5FF]' },
  knight: { bg: 'bg-[#1E3A8A]', text: 'text-[#DBEAFE]' },
  ranger: { bg: 'bg-[#14532D]', text: 'text-[#DCFCE7]' },
  thief: { bg: 'bg-[#881337]', text: 'text-[#FFE4E6]' },
  soul_weaver: { bg: 'bg-[#155E75]', text: 'text-[#CFFAFE]' },
  warrior: { bg: 'bg-[#7C2D12]', text: 'text-[#FFEDD5]' },
} as const satisfies Record<string, BadgeColor>

export const ELEMENT_BADGE_COLORS = {
  fire: { bg: 'bg-red-800', text: 'text-red-100' },
  ice: { bg: 'bg-sky-800', text: 'text-sky-100' },
  earth: { bg: 'bg-green-800', text: 'text-green-100' },
  light: { bg: 'bg-amber-300', text: 'text-gray-950' },
  dark: { bg: 'bg-fuchsia-800', text: 'text-fuchsia-100' },
} as const satisfies Record<string, BadgeColor>
