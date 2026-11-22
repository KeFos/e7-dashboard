import type React from 'react'
import type { ReactNode } from 'react'

export type BadgeProps = {
  text: ReactNode,
  imageLink?: string,
  bgColor?: string,
  textColor?: string,
}

const Badge: React.FC<BadgeProps> = ({
  bgColor = 'bg-gray-600/50',
  textColor = 'text-white',
  imageLink,
  text
}) => (
  <div className={`${bgColor} ${textColor} w-fit px-3 rounded-xl flex flex-row gap-x-1 items-center`}>
    {imageLink && <img className={`${imageLink.includes('zodiacs') ? 'h-3' : 'h-4'} w-auto`} src={imageLink} alt="" />}
    <span className="text-sm font-medium">{text}</span>
  </div>
)

export default Badge
