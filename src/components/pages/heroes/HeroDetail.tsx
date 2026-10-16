import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { getHeroDetail } from '../../../api/get-hero-detail';
import { capitalize } from '../../../utils/string';
import BaseGradeIcon from '../../public/BaseGradeIcon';

const assetsUrl = import.meta.env.VITE_ASSETS_URL;

const HeroDetail = () => {
  const { id } = useParams();

  const { data, isLoading: isGetHeroDetailLoading } = useQuery({
    queryKey: ['getHeroDetail'],
    queryFn: () => getHeroDetail(id)
  });

  const { hero, skills, base_stat } = data || {}
  const { id: _, created_at: __, updated_at: ___, ...baseStats } = base_stat || {};
  const { name, element, zodiac, role, base_grade } = hero || {}

  return isGetHeroDetailLoading ? (<span>Loading ...</span>) : (
    <>
      <div className="h-[90vh] animate-slide-up p-4 flex flex-row justify-center gap-12">
        <div className="w-1/3 h-11/12 px-4 py-2 bg-gray-800 flex flex-row justify-center">
          <img className="h-full w-full object-contain" src={`${assetsUrl}/hero-poses/${id}.jpg`}/>
        </div>
        <div className="w-1/4 h-11/12 flex flex-col justify-start gap-y-4">
          <div className="p-4 flex flex-col gap-y-2 bg-gray-800 h-fit">
            <div className="flex flex-row justify-start items-baseline gap-x-2">
              <img className="h-5" src={`/zodiacs/${zodiac}.svg`}/>
              <span className="text-xl font-semibold">{name}</span>
            </div>
            <BaseGradeIcon heroId={id ?? ''} baseGrade={base_grade ?? 0} />
            <div className="flex flex-row gap-x-2 items-center">
              <img className="h-6" src={`/role-icons/${role?.replace(' ', '_')}.png`}/>
              <span className="text-lg font-medium">{capitalize(role ?? '')}</span>
            </div>
            <div className="flex flex-row gap-x-2 items-center">
              <img className="h-6" src={`/element-icons/${element}.png`}/>
              <span className="text-lg font-medium">{capitalize(element ?? '')}</span>
            </div>
          </div>

          <div className="p-4 bg-gray-800 h-fit">
          {
            Object.keys(baseStats).map((key, idx) => (
              <div className="flex flex-row justify-between">
                <div className="flex-3/4 font-semibold">{capitalize(key.replace('_', ' '))}</div>
                <div className="flex-1/4 text-yellow-500 text-start font-medium">
                {`${baseStats[key as keyof typeof baseStats]}${idx > 3 ? ' %' : ''}`}
                </div>
              </div>
            ))
          }
          </div>
        </div>
      </div>
      <div className="p-8 flex lg:flex-row md:flex-col gap-x-4">
      {
        (skills ?? []).map(({ name, description, cooldown, is_active, can_soulburn, soul_cost, soul_description }) => (
          <div className="bg-gray-800 p-4 lg:flex-1/3 md:flex-1 flex flex-col gap-y-4" key={name ?? ''}>
            <div className="flex flex-row justify-between">
              <span className="text-lg font-semibold">
                {`${name ?? ''} `}
                {is_active ? <span className="text-sm text-yellow-600">{'passive '}</span> : null}
                {can_soulburn ? <span className="text-sm text-blue-400">{`Soulburn: ${soul_cost}`}</span> : null}
              </span>
              {!is_active ? <span className="text-blue-300">{`Cooldown: ${cooldown ?? ''}`}</span> : null}
            </div>
            {
              description?.split('\\n').map((paragraf, key) => <p key={`${name} - ${key}`} className="text-justify">{paragraf}</p>)
            }
            {
              can_soulburn ? (
                <p>
                  <span className="text-blue-400 font-semibold">{'Soulburn: '}</span>
                  {soul_description}
                </p>
              ) : null
            }
          </div>
        ))
      }
      </div>
    </>
  )
}

export default HeroDetail;
