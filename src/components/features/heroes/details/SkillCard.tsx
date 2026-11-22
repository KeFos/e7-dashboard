import type React from 'react'
import type { Skill } from '../../../../models/Hero'
import { parseMarkedText } from '../../../../utils/string'

const TEXT_TYPE_COLORS = {
  positive: 'text-blue-300',
  negative: 'text-red-300',
  core: 'text-orange-400',
} as const

const SkillCard: React.FC<Skill> = ({
  name, description, cooldown, is_active, can_soulburn, soul_cost, soul_description
}) => {
  return (
    <div className="bg-gray-800 p-4 flex flex-col gap-y-4">
      <div className="flex flex-row justify-between">
        <span className="text-lg font-semibold">
          {`${name ?? ''} `}
          {is_active ? <span className="text-sm text-yellow-600">{'passive '}</span> : null}
          {can_soulburn ? <span className="text-sm text-blue-400">{`Soulburn: ${soul_cost}`}</span> : null}
        </span>
        {!is_active ? <span className="font-semibold text-blue-300">{`Cooldown: ${cooldown ?? ''}`}</span> : null}
      </div>
      {
        description?.split(/\\n|\r\n?|\n/g).map((paragraf, key) =>
          <p key={`${name} - ${key}`} className="text-justify">
            {
              parseMarkedText(paragraf).map(({ text, type }) =>
                type === 'neutral' ? text : (
                  <span key={text} className={`font-semibold ${TEXT_TYPE_COLORS[type]}`}>
                    {text}
                  </span>
                )
              )
            }
          </p>
        )
      }
      {
        can_soulburn ? (
          <p>
            <span className="text-blue-400 font-semibold">{'Soulburn: '}</span>
            {soul_description}
          </p>
        ) : null
      }
    </div>
  )
}

export default SkillCard
