import type { HeroClass } from "../models/Hero";

let localAPI: string = 'http://localhost:8000/';

export const getHeroRoles = async (): Promise<HeroClass[]> => {
  const res = await fetch(localAPI + 'get-roles');
  if (!res.ok) throw new Error('Failed to fetch get-classes!');
  return res.json();
}
