const treasureHunterDate = '2026藝術週';
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

export const EXHIBITIONS = [{
  title: '困境與希望',
  coordinates: [25.019462, 121.537305],
  siteCode: 'yhfsw0',
  story: '/story/doom-and-hope.json',
  img: '/mission-1-catfish.png',
}, {
  title: '《一個大事件》- 殞落',
  coordinates: [25.017403555754996, 121.53932810436642],
  story: '/story/liu-gong-jun-pool.json',
  img: '/art-festival-logo.png',
}, {
  title: '《一個大事件》- 生命的定格',
  coordinates: [25.014667448157486, 121.53835455723987],
  story: '/story/liu-gong-jun-pool.json',
  img: '/art-festival-logo.png',
}, {
  title: '《一個大事件》- 藝術季全貌',
  coordinates: [25.01819594397589, 121.54023135369349],
  story: '/story/liu-gong-jun-pool.json',
  img: '/art-festival-logo.png',
}, {
  title: '《地下網絡｜視線之外》- 邊緣顯影',
  coordinates: [25.01819594397589, 121.54023135369350],
  story: '/story/liu-gong-jun-pool.json',
  img: '/art-festival-logo.png',
}, {
  title: '《地下網絡｜視線之外》- 菌落繁生',
  coordinates: [25.01819594397589, 121.54023135369351],
  story: '/story/liu-gong-jun-pool.json',
  img: '/art-festival-logo.png',
}, {
  title: '《臺大窗殺紀念碑》',
  coordinates: [25.01844002771249, 121.53982716617925],
  story: '/story/liu-gong-jun-pool.json',
  img: '/art-festival-logo.png',
}, {
  title: '《臺大窗殺紀念碑》',
  coordinates: [25.018698186637938, 121.54304654335996],
  story: '/story/liu-gong-jun-pool.json',
  img: '/art-festival-logo.png',
}, {
  title: '《臺大窗殺紀念碑》',
  coordinates: [25.019214372825658, 121.54357933049583],
  story: '/story/liu-gong-jun-pool.json',
  img: '/art-festival-logo.png',
}];
