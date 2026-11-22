import type React from 'react'

type HeroStatProps = {
  stat: string,
  value: string
}

const HeroStat: React.FC<HeroStatProps> = ({ stat, value }) => (
  <div className="grid grid-cols-2 justify-between">
    <div className="font-semibold">{stat}</div>
    <div className="text-yellow-500 text-start font-medium">
      {value}
    </div>
  </div>
)

export default HeroStat
