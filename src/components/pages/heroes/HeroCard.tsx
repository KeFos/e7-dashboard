import { useNavigate } from 'react-router';
import type { Hero } from '../../../models/Hero';
import type React from 'react';
import BaseGradeIcon from '../../public/BaseGradeIcon';

const assetsUrl = import.meta.env.VITE_ASSETS_URL;

type HeroCardType = React.FC<{ hero: Hero }>

const HeroCard: HeroCardType = ({ hero }) => {
  const navigate = useNavigate();
  const { id, base_grade, element, name, role } = hero;

  return (
    <div
      className="bg-gray-800 hover:bg-blue-900 text-gray-100 hover:animate-slide-out cursor-pointer rounded-md h-20 max-w-1/4 lg:flex-1/5 md:flex-1/3 max-sm:flex-1/2"
      onClick={() => navigate(`/heroes/${id}`)}
    >
      <div
        style={{ backgroundImage: `url(${assetsUrl}/hero-thumbnails/${id}.png)` }}
        className="bg-no-repeat bg-right flex flex-col justify-between h-full p-2"
      >
        <div className="w-fit flex flex-row gap-x-2 items-end">
          <span>
            <img src={`/role-icons/${role?.replace(' ', '_')}.png`} className="w-auto h-6"/>
          </span>
          <span className="pr-1 backdrop-blur-xl font-medium">{name}</span>
        </div>
        <div className="flex flex-row justify-start gap-x-1">
          <span>
            <img src={`/element-icons/${element}.png`} className="w-auto h-6"/>
          </span>
          <BaseGradeIcon heroId={id ?? ''} baseGrade={base_grade ?? 0} />
        </div>
      </div>
    </div>
  )
}

export default HeroCard
