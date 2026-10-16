import type { Hero } from "../models/Hero";

const url = import.meta.env.VITE_BACKEND_URL;

export const getHeroes = async (): Promise<Hero[]> => {
  const res = await fetch(`${url}/get-heroes`);
  if (!res.ok) throw new Error('Failed to fetch!');
  return res.json();
}
