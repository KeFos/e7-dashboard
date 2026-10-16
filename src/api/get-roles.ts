import type { HeroClass } from "../models/Hero";

const url = import.meta.env.VITE_BACKEND_URL;

export const getHeroRoles = async (): Promise<HeroClass[]> => {
  const res = await fetch(`${url}/get-roles`);
  if (!res.ok) throw new Error('Failed to fetch get-roles!');
  return res.json();
}
