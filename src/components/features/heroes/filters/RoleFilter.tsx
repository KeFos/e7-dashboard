import type React from 'react'
import type { HeroSearchQueryType } from '../../../../models/Hero'
import { getRoles } from '../../../../api/role'
import { useQuery } from '@tanstack/react-query'
import { ROLE_BADGE_COLORS } from '../../../../constants/badgeColors'
import type { BadgeProps } from '../../../ui/Badge'
import CustomCheckBox from '../../../ui/CustomCheckBox'
import Badge from '../../../ui/Badge'
import { capitalize } from '../../../../utils/string'
import { ASSETS_URL } from '../../../../constants/urls'

type RoleFilterProps = React.HTMLAttributes<HTMLDivElement> & {
  value: HeroSearchQueryType
  setValue: React.Dispatch<React.SetStateAction<HeroSearchQueryType>>
}

const RoleFilter: React.FC<RoleFilterProps> = ({ value, setValue, ...props }) => {
  const { data, isLoading } = useQuery({ queryKey: ['getRoles'], queryFn: getRoles })
  const roles = data ?? []
  if (isLoading) return (<div>Loading...</div>)

  return (
    <div {...props}>
      <h4 className="text-lg font-semibold">Class</h4>
      <div className="grid grid-cols-[repeat(2,minmax(120px,_1fr))] gap-1 border-t border-t-white py-2">
        {
          roles.map(({ name }) => {
            const roleKey = name?.replaceAll(' ', '_') as keyof typeof ROLE_BADGE_COLORS
            const selected = value.roles.has(roleKey)
            const badgeProps: BadgeProps = {
              text: capitalize(name ?? ''),
              bgColor: ROLE_BADGE_COLORS[roleKey].bg,
              textColor: ROLE_BADGE_COLORS[roleKey].text,
              imageLink: `${ASSETS_URL}/roles/${roleKey}.png`
            }
            return (
              <CustomCheckBox
                key={roleKey}
                value={roleKey}
                checked={selected}
                type="checkbox"
                onChange={() =>
                  setValue(prev => {
                    const newRoles = new Set(prev.roles)
                    if (selected) newRoles.delete(roleKey)
                    else newRoles.add(roleKey)
                    return { ...prev, roles: newRoles }
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

export default RoleFilter
