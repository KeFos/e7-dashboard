import { useQuery } from '@tanstack/react-query';
import { getHeroes } from '../../../api/get-heroes';
import HeroCard from './HeroCard';
import { useEffect, useState } from 'react';
import { getZodiacs } from '../../../api/get-zodiacs';
import { getHeroRoles } from '../../../api/get-roles';

type HeroSearchQueryType = {
  name: string
  zodiacs: string[]
  roles: string[]
  elements: string[]
  base_grade: number
}

type HeroArrayQueryType = keyof Omit<HeroSearchQueryType, 'name' | 'base_grade'> 

const HeroList = () => {
  const { data: heroes, isLoading: isGetHeroesLoading } = useQuery({ queryKey: ['getHeroes'], queryFn: getHeroes });
  const { data: zodiacs, isLoading: isGetZodiacsLoading } = useQuery({ queryKey: ['getZodiacs'], queryFn: getZodiacs });
  const { data: roles, isLoading: isGetRolesLoading } = useQuery({ queryKey: ['getRoles'], queryFn: getHeroRoles });
  const [queryName, setQueryName] = useState<string>('')
  const [queries, setQueries] = useState<HeroSearchQueryType>({
    name: '',
    zodiacs: [],
    roles: [],
    elements: [],
    base_grade: 0,
  });

  const onChangeArrayOfQueries = (key: HeroArrayQueryType, checked: boolean, value: string) => {
    const queryArray = queries[key];

    if (checked) {
      setQueries({
        ...queries,
        [key]: [...queryArray, value]
      })
    } else {
      setQueries({
        ...queries,
        [key]: queryArray.filter(zodiac => zodiac != value)
      })
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => setQueries({ ...queries, name: queryName }), 500);
    return () => clearTimeout(timeoutId);
  }, [queryName]);

  return (
    <>
      {
        isGetHeroesLoading ?
          (
            <div className="flex flex-row justify-center items-center">
              <img className="max-w-1/4 h-auto" src="/rnl_clap.webp" alt="loading"/>
            </div>
          )
        :
          heroes ?
            (
              <div className="m-6 flex flex-col gap-y-4">
                <div className="bg-gray-950 p-4 flex flex-row gap-x-4">
                  <div className="w-full max-w-md min-w-[200px]">
                    <input
                      className="w-full bg-transparent text-sm border-2 border-gray-100 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-gray-100 hover:border-gray-100 shadow-sm focus:shadow"
                      placeholder="Search by name here..."
                      value={queryName}
                      onChange={e => setQueryName(e.target.value)}
                    />
                  </div>
                  <div className="border-[1px] p-1 border-white flex flex-row flex-start items-center">
                    {
                      !isGetZodiacsLoading && zodiacs ? zodiacs.map(({ name }) => (
                        <div>
                          <label className="cursor-pointer">
                            <input
                              className="peer hidden"
                              value={name}
                              type="checkbox"
                              onChange={({ target: { checked, value }}) => onChangeArrayOfQueries('zodiacs', checked, value)}
                            />
                            <div className="p-1 hover:bg-blue-800 peer-checked:bg-blue-800">
                              <img className="w-auto h-8" src={`/zodiacs/${name}.svg`} alt={name}/>
                            </div>
                          </label>
                        </div>
                      )) : null
                    }
                  </div>
                  <div className="flex flex-row flex-start items-center gap-x-1">
                    {
                      !isGetRolesLoading && roles ? roles.map(({ name }) => (
                        <div>
                          <label className="cursor-pointer">
                            <input
                              className="peer hidden"
                              value={name}
                              type="checkbox"
                              onChange={({ target: { checked, value }}) => onChangeArrayOfQueries('roles', checked, value)}
                            />
                            <div className="hover:bg-blue-800 peer-checked:bg-blue-800">
                              <img className="w-auto h-9" src={`/role-icons/${name?.replace(' ', '_')}.png`} alt={name}/>
                            </div>
                          </label>
                        </div>
                      )) : null
                    }
                  </div>
                </div>
                <div className="flex flex-row flex-wrap gap-4">
                  {
                    heroes
                      .filter(({ name }) => name && name.toLowerCase().includes(queries.name.toLowerCase()))
                      .filter(({ zodiac }) => queries.zodiacs.length === 0 || queries.zodiacs.indexOf(zodiac ?? '') > -1)
                      .filter(({ role }) => queries.roles.length === 0 || queries.roles.indexOf(role ?? '') > -1)
                      .map((hero) => <HeroCard key={hero?.id} hero={hero}/>)
                  }
                </div>
              </div>
            )
          : null
      }
    </>
  )
}

export default HeroList;
