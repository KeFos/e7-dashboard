import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { getHeroDetail } from '../../../api/hero'
import HeroArtwork from './details/HeroArtwork'
import HeroSummary from './details/HeroSummary'
import SkillCard from './details/SkillCard'
import LoadingScreen from '../../ui/LoadingScreen'

const HeroDetail = () => {
  const { id } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['getHeroDetail', id],
    queryFn: () => getHeroDetail(id),
    enabled: !!id
  })

  const { hero, skills, base_stat } = data || {}

  return isLoading ? <LoadingScreen /> : (
    <div className="p-8 grid grid-cols-1 gap-y-8">
      <div className="h-fit animate-slide-up grid sm:grid-cols-1 md:grid-cols-2 gap-6">
        <HeroArtwork id={id ?? ''}/>
        <HeroSummary hero={hero} baseStats={base_stat}/>
      </div>
      <div className="grid grid-cols-1 gap-y-2">
        <h4 className="px-4 text-2xl font-bold">Skills</h4>
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 sm:gap-y-4 lg:gap-x-4">
          {
            (skills ?? []).map((skill) => <SkillCard key={skill?.name} {...skill}/>) 
          }
        </div>
      </div>
    </div>
  )
}

export default HeroDetail
