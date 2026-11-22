import type React from 'react'
import type { HeroSearchQueryType } from '../../../../models/Hero'
import { useQuery } from '@tanstack/react-query'
import { getZodiacs } from '../../../../api/zodiac'
import { ZODIAC_BADGE_COLORS } from '../../../../constants/badgeColors'
import type { BadgeProps } from '../../../ui/Badge'
import CustomCheckBox from '../../../ui/CustomCheckBox'
import Badge from '../../../ui/Badge'
import { capitalize } from '../../../../utils/string'
import { ASSETS_URL } from '../../../../constants/urls'

type ZodiacFilterProps = React.HTMLAttributes<HTMLDivElement> & {
  value: HeroSearchQueryType
  setValue: React.Dispatch<React.SetStateAction<HeroSearchQueryType>>
}

const ZodiacFilter: React.FC<ZodiacFilterProps> = ({ value, setValue, ...props }) => {
  const { data, isLoading } = useQuery({ queryKey: ['getZodiacs'], queryFn: getZodiacs })
  const zodiacs = data ?? []
  if (isLoading) return (<div>Loading...</div>)

  return (
    <div {...props}>
      <h4 className="text-lg font-semibold">Zodiac</h4>
      <div className="grid sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(120px,_1fr))] gap-1 border-t border-t-white py-2">
        {
          zodiacs.map(({ name }) => {
            const zodiacKey = (name ?? '') as keyof typeof ZODIAC_BADGE_COLORS
            const selected = value.zodiacs.has(zodiacKey)
            const badgeProps: BadgeProps = {
              text: capitalize(name ?? ''),
              bgColor: ZODIAC_BADGE_COLORS[zodiacKey].bg,
              textColor: ZODIAC_BADGE_COLORS[zodiacKey].text,
              imageLink: `${ASSETS_URL}/zodiacs/${name}.svg`,
            }
            const onChange = () =>
              setValue(prev => {
                const newZodiacs = new Set(prev.zodiacs)
                if (selected) newZodiacs.delete(zodiacKey)
                else newZodiacs.add(zodiacKey)
                return { ...prev, zodiacs: newZodiacs }
              })

            return (
              <CustomCheckBox key={zodiacKey} value={zodiacKey} checked={selected} type="checkbox" onChange={onChange}>
                <Badge {...badgeProps}/>
              </CustomCheckBox>
            )
          })
        }
      </div>
    </div>
  )
}

export default ZodiacFilter
