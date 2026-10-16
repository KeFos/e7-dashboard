import type { Zodiac } from "../models/Hero";

const url = import.meta.env.VITE_BACKEND_URL;

export const getZodiacs = async (): Promise<Zodiac[]> => {
  const res = await fetch(`${url}/get-zodiacs`);
  if (!res.ok) throw new Error('Failed to fetch get-zodiacs!');
  return res.json();
}
