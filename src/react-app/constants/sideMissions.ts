const THEME_COLORS = {
  Green: '#177b6d',
  Red: '#d72b2d',
  Brown: '#d4b386',
  Cream: '#dcd8cb',
  LightGray: '#e0e0e1',
  MediumGray: '#d1d1d1',
  DarkGray: '#767575',
  Black: '#000000',
};

export const TREASURE_HUNT_MISSIONS = [{
  title: '尋寶任務1',
  siteCode: 'kzqpt9',
  coordinates: [25.0177262, 121.5359260],
  story: '/story/treasure-hunt-mission-1.json',
}, {
  title: '尋寶任務2',
  siteCode: 'mrvxa7',
  coordinates: [25.0173297, 121.5390890],
  story: '/story/treasure-hunt-mission-2.json',
}, {
  title: '尋寶任務3',
  siteCode: 'gthui5',
  coordinates: [25.0163250, 121.5400810],
  story: '/story/treasure-hunt-mission-3.json',
}];
export const ART_FESTIVAL_TREASURE_HUNT_PATHS = TREASURE_HUNT_MISSIONS.map(m => m.siteCode);

export const EXHIBITIONS = [{
  title: '《城市幽靈》 - 困境與希望',
  coordinates: [25.019462, 121.537305],
  siteCode: 'yhfsw0',
  story: '/story/exhibition-doom-and-hope.json',
  img: '/art-festival-logo.png',
  color: THEME_COLORS.MediumGray,
}];

export const ART_FESTIVAL_EXHIBITION_PATHS = EXHIBITIONS.map(m => m.siteCode);
