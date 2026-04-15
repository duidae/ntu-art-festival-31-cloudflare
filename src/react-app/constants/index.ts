import { subMissions } from './projectMissions';
import { TREASURE_HUNT_MISSIONS, EXHIBITIONS } from './sideMissions';

export const CATFISH_3D_MODEL = 'mission-1-catfish.glb';
export const CATFISH_3D_MODEL_COVER = 'mission-1-catfish.png';

const isTreasureHuntActive = import.meta.env.VITE_ART_FESTIVAL_TREASURE_HUNTER_ENABLED === "true";
export const MAP_ZOOM = 15;
export const ART_FESTIVAL_CENTER: [number, number] = isTreasureHuntActive ? [25.01662428526506, 121.5377609363122] : [25.018429, 121.538275]; // NTU center coordinates
export const ART_FESTIVAL_APP_NAME = 'NTU 31<sup>st</sup> ART FESTIVAL';
export const ART_FESTIVAL_LOGO = '/art-festival-logo.png';
export const ART_FESTIVAL_LOGO_SVG = '/art-festival-logo.svg';
export const ART_FESTIVAL_TREASURE_HUNTER_START_DATE = '20260201';
export const ART_FESTIVAL_TREASURE_HUNTER_END_DATE = '20260314';
export const ART_FESTIVAL_START_DATE = '20260201';
export const ART_FESTIVAL_END_DATE = '20260531';

export const MAP_ROUTE_PATH = '/?noIntro=true';

export const MISSIONS = {
  Main: [], // mainMissions,
  Sub: subMissions,
  Pre: TREASURE_HUNT_MISSIONS, // treasure hunter missions
  Others: EXHIBITIONS, // other installations
};

export const THEME_COLORS = {
  Green: '#177b6d',
  Red: '#d72b2d',
  Brown: '#d4b386',
  Cream: '#dcd8cb',
  LightGray: '#e0e0e1',
  MediumGray: '#d1d1d1',
  DarkGray: '#767575',
  Black: '#000000',
};
export const THEME_COLOR_VALUES = [THEME_COLORS.Green, THEME_COLORS.Red, THEME_COLORS.Brown];
export const DEFAULT_COLOR = THEME_COLORS.DarkGray;
