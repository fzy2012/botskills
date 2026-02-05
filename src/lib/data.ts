import { cache } from 'react';
import skillsData from '@/data/skills.json';

export interface Skill {
  name: string;
  url: string;
  description: string;
  category: string;
}

export interface Category {
  name: string;
  skills: Skill[];
}

export interface SiteData {
  introduction: string;
  installation: string;
  about: string;
  categories: Category[];
}

export const getSiteData = cache(async (): Promise<SiteData> => {
  return skillsData as SiteData;
});

// Helper to get just categories for components that only need that
export const getCategories = cache(async (): Promise<Category[]> => {
  const data = await getSiteData();
  return data.categories;
});
