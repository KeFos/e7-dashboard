import type React from 'react'
import type { HeroSearchQueryType } from '../../../models/Hero'

type HeroSearchProps = {
  value: HeroSearchQueryType
  setValue: React.Dispatch<React.SetStateAction<HeroSearchQueryType>>
}

const HeroSearch: React.FC<HeroSearchProps> = ({ value, setValue }) => (
  <div className="w-full max-w-md min-w-50">
    <input
      className="w-full bg-transparent text-sm border-2 border-gray-100 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-gray-100 hover:border-gray-100 shadow-sm focus:shadow"
      placeholder="Search by name here..."
      value={value.name}
      onChange={e => setValue({ ...value, name: e.target.value })}
    />
  </div>
)

export default HeroSearch
