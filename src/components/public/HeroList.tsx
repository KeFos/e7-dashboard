import { useQuery } from '@tanstack/react-query'
import type { Hero } from '../../models/Hero';
import { getHeroes } from '../../api/get-heroes';
import { useNavigate } from 'react-router';

const HeroList = () => {
  const { data, isLoading } = useQuery({ queryKey: ['getHeroes'], queryFn: getHeroes });
  const navigate = useNavigate();

  return (
    <>
      <div className="m-6 flex flex-row flex-wrap justify-between gap-4">
        {
          isLoading ?
            (
              <div>
                <span>Loading...</span>
                <img src="/gifs/e7-angelica-eats.gif" alt="loading"/>
              </div>
            )
          :
            data ? data.map(({ id, name, element, base_grade, role }: Hero) => (
              <div
                key={id}
                className="bg-blue-800 hover:bg-blue-900 text-gray-100 cursor-pointer rounded-md h-20 flex-1/5"
                onClick={() => navigate(`/heroes/${id}`)}
              >
                <div
                  style={{ backgroundImage: `url(/hero-thumbnails/${id}.png)` }}
                  className="bg-no-repeat bg-right flex flex-col justify-between h-full p-2"
                >
                  <div className="w-fit flex flex-row gap-x-2 items-end backdrop-blur-xl font-medium">
                    <span>
                      <img src={`/role-icons/${role?.replace(' ', '_')}.png`} className="w-auto h-6"/>
                    </span>
                    <span>{name}</span>
                  </div>
                  <div className="flex flex-row justify-start gap-x-2">
                    <span>
                      <img src={`/element-icons/${element}.png`} className="w-auto h-6"/>
                    </span>
                    <span className="flex flex-row">
                      {
                        [...Array(base_grade ?? 0)].map((key) => <img key={`${id}-${key}`} src="/icon_star.png" alt="stars" className="w-auto h-5"/>)
                      }
                    </span>
                  </div>
                </div>
              </div>
            )) : null
        }
      </div>
    </>
  )
}

export default HeroList;
