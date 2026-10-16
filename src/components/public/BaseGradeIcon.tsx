import type React from 'react';

type BaseGradeIconType = React.FC<{ heroId: string, baseGrade: number }>

const BaseGradeIcon: BaseGradeIconType = ({ heroId, baseGrade }) => (
  <div className="flex flex-row items-center">
  {
    [...Array(baseGrade ?? 0)].map((_, key) => (
        <img
          key={`${heroId}-${key}`}
          src='/star.svg'
          alt='stars'
          className='w-auto h-4 -skew-x-12'
        />
      )
    )
  }
  </div>
)
export default BaseGradeIcon;
