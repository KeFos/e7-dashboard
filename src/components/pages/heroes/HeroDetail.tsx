import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getHeroDetail } from "../../../api/get-hero-detail";

const HeroDetail = () => {
  const { id } = useParams();

  const {
    data,
    isLoading: isGetHeroDetailLoading
  } = useQuery({
    queryKey: ['getHeroDetail'],
    queryFn: () => getHeroDetail(id)
  });

  const { attack, health, defense, speed } = data?.base_stat || {}
  const { name, element, zodiac, role } = data?.hero || {}

  return (
    <>
      {
        isGetHeroDetailLoading ? (<span>Loading ...</span>) : (
          <div className="p-4 flex flex-row justify-center gap-12">
            <div className="p-2 border-2 w-56">
              <div className="flex flex-row justify-between">
                <div>Name</div>
                <div>{name}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div>Zodiac</div>
                <div>{zodiac}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div>Role</div>
                <div>{role}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div>Element</div>
                <div>{element}</div>
              </div>
            </div>

            <div className="p-2 border-2 w-56">
              <div className="flex flex-row justify-between">
                <div>Attack</div>
                <div>{attack}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div>Health</div>
                <div>{health}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div>Defense</div>
                <div>{defense}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div>Speed</div>
                <div>{speed}</div>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default HeroDetail;
