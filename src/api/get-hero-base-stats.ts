import type { HeroBaseStat } from "../models/Hero";

// let ceciliaBotAPI: string = 'https://cecilia-bot-api.vercel.app/api/v1/getList?list=hero';
let localAPI: string = 'http://localhost:8000/';

export const getHeroBaseStat = async (params: URLSearchParams): Promise<HeroBaseStat> => {
  const res = await fetch(localAPI + `get-hero-base-stat?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch!');
  return res.json();
}
