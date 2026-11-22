import type React from 'react'
import type { BASE_GRADE } from '../../../../constants/badgeColors'
import type { HeroSearchQueryType } from '../../../../models/Hero'
import CustomCheckBox from '../../../ui/CustomCheckBox'
import type { BadgeProps } from '../../../ui/Badge'
import Badge from '../../../ui/Badge'

type BaseGradeFilterType = {
  value: HeroSearchQueryType
  setValue: React.Dispatch<React.SetStateAction<HeroSearchQueryType>>
}

const baseGrades = [3, 4, 5] satisfies Array<BASE_GRADE>

const BaseGradeFilter: React.FC<BaseGradeFilterType> = ({ value, setValue }) => (
  <div>
    <h4 className="text-lg font-semibold">Base Grade</h4>
    <div className="flex flex-row flex-wrap gap-1 border-t border-t-white py-2">
      {
        baseGrades.map(grade => {
          const selected = value.base_grade.has(grade)

          const badgeProps: BadgeProps = {
            text: `${grade}`,
            imageLink: '/star.svg',
            bgColor: 'bg-amber-600',
            textColor: 'text-gray-100',
          }

          return (
            <CustomCheckBox
              key={grade}
              value={grade}
              checked={selected}
              type="checkbox"
              onChange={() =>
                setValue(prev => {
                  const newGrades = new Set(prev.base_grade)
                  if (selected) newGrades.delete(grade)
                  else newGrades.add(grade)
                  return { ...prev, base_grade: newGrades }
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

export default BaseGradeFilter
