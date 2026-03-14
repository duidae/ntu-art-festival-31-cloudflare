const treasureHunterDate = '20260314';
export const TREASURE_HUNT_MISSIONS = [{
  title: `${treasureHunterDate} 尋寶任務1`,
  siteCode: 'kzqpt9',
  coordinates: [25.0177262, 121.5359260],
  story: '/story/treasure-hunt-mission-1.json',
}, {
  title: `${treasureHunterDate} 尋寶任務2`,
  siteCode: 'mrvxa7',
  coordinates: [25.0173297, 121.5390890],
  story: '/story/treasure-hunt-mission-2.json',
}, {
  title: `${treasureHunterDate} 尋寶任務3`,
  siteCode: 'gthui5',
  coordinates: [25.0163250, 121.5400810],
  story: '/story/treasure-hunt-mission-3.json',
}];
export const ART_FESTIVAL_TREASURE_HUNT_PATHS = TREASURE_HUNT_MISSIONS.map(m => m.siteCode);

export const otherInstallations = [{
  title: '奇美拉',
  coordinates: [25.01746905336982, 121.5402407988009],
  story: '/story/liu-gong-jun-pool.json',
  img: '/art-festival-logo.png',
}, {
  title: '碰撞',
  coordinates: [25.01806026511564, 121.54020423321757],
  story: '/story/liu-gong-jun-pool.json',
  img: '/art-festival-logo.png',
}];
