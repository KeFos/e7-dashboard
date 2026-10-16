import type { HeroDetailType } from "../models/Hero";

const url = import.meta.env.VITE_BACKEND_URL;

export const getHeroDetail = async (id?: string): Promise<HeroDetailType> => {
  const res = await fetch(`${url}/get-heroes/${id}`);
  if (!res.ok) throw new Error('Failed to fetch!');
  return res.json();
}
