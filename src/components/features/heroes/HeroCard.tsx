import { Link } from 'react-router'
import type { Hero } from '../../../models/Hero'
import type React from 'react'
import BaseGradeIcon from '../../ui/BaseGradeIcon'
import { ELEMENT_CARD_CLASSES } from '../../../constants/cardColors'
import { ASSETS_URL } from '../../../constants/urls'

type HeroCardType = React.FC<{ hero: Hero }>

const HeroCard: HeroCardType = ({ hero }) => {
  const { id, base_grade, element, name, role } = hero
  const bgStyles = ELEMENT_CARD_CLASSES[element as keyof typeof ELEMENT_CARD_CLASSES]

  return (
    <Link
      className={`${bgStyles} hover:bg-blue-900 text-gray-100 hover:animate-slide-out cursor-pointer rounded-md h-20`}
      to={`/heroes/${id}`}
    >
      <div
        style={{ backgroundImage: `url(${ASSETS_URL}/hero-thumbnails/${id}.png)` }}
        className="bg-no-repeat bg-right flex flex-col justify-between h-full p-2"
      >
        <div className="w-fit flex flex-row gap-x-2 items-end">
          <span>
            <img src={`${ASSETS_URL}/roles/${role?.replace(' ', '_')}.png`} className="w-auto h-6" alt={role}/>
          </span>
          <span className="pr-1 backdrop-blur-xl font-medium">{name}</span>
        </div>
        <div className="flex flex-row justify-start gap-x-1">
          <span>
            <img src={`${ASSETS_URL}/elements/${element}.png`} className="w-auto h-6" alt={element}/>
          </span>
          <BaseGradeIcon heroId={id ?? ''} baseGrade={base_grade ?? 0} skewed/>
        </div>
      </div>
    </Link>
  )
}

export default HeroCard
