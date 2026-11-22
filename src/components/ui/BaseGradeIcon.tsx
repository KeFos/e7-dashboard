import type React from 'react'

type BaseGradeIconProps = {
  heroId?: string,
  baseGrade: number,
  skewed?: boolean,
  size?: 'card' | 'detail'
}

const BaseGradeIcon: React.FC<BaseGradeIconProps> = ({ heroId = '_', baseGrade, skewed = false, size = 'card' }) => (
  <div className="flex flex-row items-center">
  {
    [...Array(baseGrade ?? 0)].map((_, key) => (
        <img
          key={`${heroId}-${key}`}
          src="/star.svg"
          alt="stars"
          className={`w-auto ${size === 'card' ? 'h-4' : 'h-5'}${skewed ? ' -skew-x-12' : ''}`}
        />
      )
    )
  }
  </div>
)
export default BaseGradeIcon
