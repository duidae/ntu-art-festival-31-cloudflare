import { mainMissions, subMissions } from './projectMissions';
import { TREASURE_HUNT_MISSIONS, otherInstallations } from './sideMissions';

export const CATFISH_3D_MODEL = 'mission-1-catfish.glb';
export const CATFISH_3D_MODEL_COVER = 'mission-1-catfish.png';

export const ART_FESTIVAL_CENTER: [number, number] = [25.018429, 121.538275]; // NTU center coordinates
export const ART_FESTIVAL_APP_NAME = 'NTU 31<sup>st</sup> ART FESTIVAL';
export const ART_FESTIVAL_LOGO = '/art-festival-logo.png';
export const ART_FESTIVAL_TREASURE_HUNTER_START_DATE = '20260201';
export const ART_FESTIVAL_TREASURE_HUNTER_END_DATE = '20260314';
export const ART_FESTIVAL_START_DATE = '20260201';
export const ART_FESTIVAL_END_DATE = '20260531';

export const MAP_ROUTE_PATH = '/?noIntro=true';

export const MISSIONS = {
  Main: mainMissions,
  Sub: subMissions,
  Pre: TREASURE_HUNT_MISSIONS, // treasure hunter missions
  Others: otherInstallations, // other installations
};

export const THEME_COLORS = {
  Green: '#097261',
  Red: '#ca242b',
  Brown: '#c29f72',
};
export const THEME_COLOR_VALUES = Object.values(THEME_COLORS);
export const DEFAULT_COLOR = '#6d6b69';
