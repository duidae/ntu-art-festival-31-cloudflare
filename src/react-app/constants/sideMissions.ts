const treasureHunterDate = '20260314';
export const TREASURE_HUNT_MISSIONS = [{
  title: `${treasureHunterDate} 尋寶任務1`,
  siteCode: 'kzqpt9',
  coordinates: [25.017254, 121.540416],
  story: '/story/treasure-hunt-mission-1.json',
}, {
  title: `${treasureHunterDate} 尋寶任務2`,
  siteCode: 'mrvxa7',
  coordinates: [25.016325, 121.540081],
  story: '/story/treasure-hunt-mission-2.json',
}, {
  title: `${treasureHunterDate} 尋寶任務3`,
  siteCode: 'gthui5',
  coordinates: [25.0178591423562, 121.53998518789876],
  story: '/story/treasure-hunt-mission-3.json',
}];
export const ART_FESTIVAL_TREASURE_HUNT_PATHS = TREASURE_HUNT_MISSIONS.map(m => m.siteCode);

export const otherInstallations = [{
  title: '奇美拉',
  coordinates: [25.01730978748543, 121.53938221654623],
  story: '/story/liu-gong-jun-pool.json',
  img: '/art-festival-logo.png',
}, {
  title: '窗殺紀念碑',
  coordinates: [25.01781990436312, 121.53382737817032],
  story: '/story/liu-gong-jun-pool.json',
  img: '/art-festival-logo.png',
}];
