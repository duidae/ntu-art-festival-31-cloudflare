import { mainMissions, subMissions } from './projectMissions';
import { treasureHunterMissions, otherInstallations } from './sideMissions';

export const CATFISH_3D_MODEL = 'mission-1-catfish.glb';
export const CATFISH_3D_MODEL_COVER = 'mission-1-catfish.png';

export const ART_FESTIVAL_CENTER = [25.018429, 121.538275]; // NTU center coordinates
export const ART_FESTIVAL_APP_NAME = 'NTU 31<sup>st</sup> ART FESTIVAL';
export const ART_FESTIVAL_LOGO = '/art-festival-logo.png';
// TODO: move to env
export const ART_FESTIVAL_TREASURE_HUNTER_START_DATE = '20260201';
export const ART_FESTIVAL_TREASURE_HUNTER_END_DATE = '20260314';
export const ART_FESTIVAL_START_DATE = '20260201';
export const ART_FESTIVAL_END_DATE = '20260531';

export const MISSIONS = {
  Main: mainMissions,
  Sub: subMissions,
  Pre: treasureHunterMissions, // treasure hunter missions
  Others: otherInstallations, // other installations
};
