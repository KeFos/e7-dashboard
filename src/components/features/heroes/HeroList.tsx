import { useQuery } from '@tanstack/react-query'
import { getHeroes } from '../../../api/hero'
import HeroCard from './HeroCard'
import { useMemo, useState } from 'react'
import { useDebouncedValue } from '../../../hooks/useDebounceValue'
import HeroSearch from './HeroSearch'
import type { HeroSearchQueryType } from '../../../models/Hero'
import {
  type BASE_GRADE,
  type ELEMENT_BADGE_COLORS,
  type ROLE_BADGE_COLORS,
  type ZODIAC_BADGE_COLORS
} from '../../../constants/badgeColors'
import ZodiacFilter from './filters/ZodiacFilter'
import RoleFilter from './filters/RoleFilter'
import ElementFilter from './filters/ElementFilter'
import BaseGradeFilter from './filters/BaseGradeFilter'
import LoadingScreen from '../../ui/LoadingScreen'

const HeroList = () => {
  const { data, isLoading } = useQuery({ queryKey: ['getHeroes'], queryFn: getHeroes })

  const [filters, setFilters] = useState<HeroSearchQueryType>({
    name: '',
    zodiacs: new Set<keyof typeof ZODIAC_BADGE_COLORS>(),
    roles: new Set<keyof typeof ROLE_BADGE_COLORS>(),
    elements: new Set<keyof typeof ELEMENT_BADGE_COLORS>(),
    base_grade: new Set<BASE_GRADE>(),
  })
  const debouncedName = useDebouncedValue<string>(filters.name, 500)
  const filteredHeroes = useMemo(() => data
    ?.filter(({ name }) => name && name.toLowerCase().includes(debouncedName.toLowerCase()))
    ?.filter(({ zodiac }) => filters.zodiacs.size === 0 || filters.zodiacs.has(zodiac as keyof typeof ZODIAC_BADGE_COLORS))
    ?.filter(({ element }) => filters.elements.size === 0 || filters.elements.has(element as keyof typeof ELEMENT_BADGE_COLORS))
    ?.filter(({ role }) => filters.roles.size === 0 || filters.roles.has(role?.replace(' ', '_') as keyof typeof ROLE_BADGE_COLORS))
    ?.filter(({ base_grade }) => filters.base_grade.size === 0 || filters.base_grade.has(base_grade as BASE_GRADE)),
  [data, filters, debouncedName])

  return isLoading ? <LoadingScreen/> : data ? (
      <div className="m-6 flex flex-col gap-y-4">
        <div className="bg-gray-950 p-4 flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold">Hero List</h1>
            <h4 className="text-sm">Search and filter your roster</h4>
          </div>
          <HeroSearch value={filters} setValue={setFilters} />
        </div>
        <div className="bg-gray-950 p-4 grid sm:grid-cols-1 md:grid-cols-[_1fr_1fr] lg:grid-cols-[480px_repeat(auto-fit,minmax(240px,_1fr))] gap-x-4">
          <ZodiacFilter value={filters} setValue={setFilters} />
          <RoleFilter value={filters} setValue={setFilters} />
          <ElementFilter value={filters} setValue={setFilters} />
          <BaseGradeFilter value={filters} setValue={setFilters} />
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {filteredHeroes?.map((hero) => <HeroCard key={hero?.id} hero={hero}/>)}
        </div>
      </div>
    )
  : "Oops! Something Unexpected Happened :(!"
}

export default HeroList
