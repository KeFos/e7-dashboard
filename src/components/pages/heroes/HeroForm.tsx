import { useQuery } from "@tanstack/react-query";
import type { HeroClass, Zodiac } from "../../../models/Hero";
import { getHeroRoles } from "../../../api/get-roles";
import { getZodiacs } from "../../../api/get-zodiacs";

const HeroForm = () => {

  const {
    data: heroClasses,
    isLoading: isGetHeroClassesLoading
  } = useQuery({ queryKey: ['getHeroRoles'], queryFn: getHeroRoles });

  const {
    data: zodiacs,
    isLoading: isGetZodiacsLoading
  } = useQuery({ queryKey: ['getZodiacs'], queryFn: getZodiacs });

  return (
    <>
      <div className="w-full p-4 flex flex-row justify-center">
        <div className="max-w-sx border-2">
          <form className="p-4">
            <div className="mb-4">
              <label className="block">Hero Name</label>
              <input placeholder="Name"/>
            </div>
            <div>
              {
                isGetZodiacsLoading ?
                  (<span>Loading...</span>)
                : (
                  <select name="zodiac" className="max-w-max">
                    {
                      zodiacs ? zodiacs.map(({ id, name }: Zodiac) => (
                        <option key={id} value={name}>{name}</option>
                      )) : null
                    }
                  </select>
                )
              }
            </div>
            <div>
              {
                isGetHeroClassesLoading ?
                  (<span>Loading...</span>)
                : (
                  <select name="class" className="max-w-max">
                    {
                      heroClasses ? heroClasses.map(({ id, name }: HeroClass) => (
                        <option key={id} value={name}>{name}</option>
                      )) : null
                    }
                  </select>
                )
              }
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default HeroForm;
