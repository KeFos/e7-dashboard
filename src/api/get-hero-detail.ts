import type { HeroDetail } from "../models/Hero";

let localAPI: string = 'http://localhost:8000/';

export const getHeroDetail = async (id?: string): Promise<HeroDetail> => {
  const res = await fetch(localAPI + `get-heroes/${id}`);
  if (!res.ok) throw new Error('Failed to fetch!');
  return res.json();
}
