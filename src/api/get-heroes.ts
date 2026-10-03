import type { Hero } from "../models/Hero";

let localAPI: string = 'http://localhost:8000/';

export const getHeroes = async (): Promise<Hero[]> => {
  const res = await fetch(localAPI + 'get-heroes');
  if (!res.ok) throw new Error('Failed to fetch!');
  return res.json();
}
