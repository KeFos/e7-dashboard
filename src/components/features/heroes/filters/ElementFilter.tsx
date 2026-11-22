import type React from 'react'
import type { HeroSearchQueryType } from '../../../../models/Hero'
import { ELEMENT_BADGE_COLORS } from '../../../../constants/badgeColors'
import type { BadgeProps } from '../../../ui/Badge'
import CustomCheckBox from '../../../ui/CustomCheckBox'
import Badge from '../../../ui/Badge'
import { capitalize } from '../../../../utils/string'
import { ASSETS_URL } from '../../../../constants/urls'

type ElementFilterProps = {
  value: HeroSearchQueryType
  setValue: React.Dispatch<React.SetStateAction<HeroSearchQueryType>>
}

const ElementFilter: React.FC<ElementFilterProps> = ({ value, setValue }) => {
  const elements = Object.entries(ELEMENT_BADGE_COLORS).map(([element]) => element)

                  
  return (
    <div>
      <h4 className="text-lg font-semibold">Element</h4>
      <div className="grid grid-cols-2 gap-1 border-t border-t-white py-2">
        {
          elements.map(element => {
              const elementKey = element as keyof typeof ELEMENT_BADGE_COLORS
              const selected = value.elements.has(elementKey)
              const badgeProps: BadgeProps = {
                text: capitalize(elementKey),
                bgColor: ELEMENT_BADGE_COLORS[elementKey].bg,
                textColor: ELEMENT_BADGE_COLORS[elementKey].text,
                imageLink: `${ASSETS_URL}/elements/${element}.png`
              }
              return (
                <CustomCheckBox
                  key={elementKey}
                  name={elementKey}
                  value={elementKey}
                  checked={selected}
                  type="checkbox"
                  onChange={() =>
                    setValue(prev => {
                      const newElements = new Set(prev.elements)
                      if (selected) newElements.delete(elementKey)
                      else newElements.add(elementKey)
                      return { ...prev, elements: newElements }
                    })
                  }
                >
                  <Badge {...badgeProps}/>
                </CustomCheckBox>
              )
            })
        }
      </div>
    </div>
  )
}

export default ElementFilter
