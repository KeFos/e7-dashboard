import type { Zodiac } from "../models/Hero";

let localAPI: string = 'http://localhost:8000/';

export const getZodiacs = async (): Promise<Zodiac[]> => {
  const res = await fetch(localAPI + 'get-zodiacs');
  if (!res.ok) throw new Error('Failed to fetch get-zodiacs!');
  return res.json();
}
