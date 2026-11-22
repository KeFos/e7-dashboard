import type React from 'react'
import type { PropsWithChildren } from 'react'

type CustomCheckBoxProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const CustomCheckBox: React.FC<PropsWithChildren<CustomCheckBoxProps>> = ({ children, ...props }) => (
  <label className="cursor-pointer">
    <input {...props} className="peer sr-only"/>
    <div className="w-fit border-2 border-gray-950 rounded-xl hover:border-white peer-checked:border-white">
      {children}
    </div>
  </label>
)

export default CustomCheckBox
