import { ROUTES } from '@/app/config/routes';

export type SidebarLink = {
  link: string;
  text: string;
};

export const sidebarLinksArray: SidebarLink[] = [
  {
    link: ROUTES.home,
    text: 'Home',
  },
  {
    link: ROUTES.newCampaigns,
    text: 'New Campaign',
  },
  {
    link: ROUTES.headlines,
    text: 'All Headlines',
  },
  {
    link: ROUTES.newHeadlines,
    text: 'New Headlines',
  },
  {
    link: ROUTES.images,
    text: 'All Images',
  },
  {
    link: ROUTES.newImages,
    text: 'New Image',
  },
  {
    link: ROUTES.creatives,
    text: 'All Creatives',
  },
  {
    link: ROUTES.newCreatives,
    text: 'New Creative',
  },
];