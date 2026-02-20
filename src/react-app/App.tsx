import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SCENES } from '@/react-app/constants/enum';
import { Intro, MissionMap, MainMission, SubMission, Final } from '@/react-app/scene';
import { AppLayout } from '@/react-app/components/AppLayout';

/**
 * 城市幽靈：瑠公圳的隱地下生態 (Voices from the Underground)
 * Style: DECOmposer (Art Festival / Brutalist / Deconstruction)
 * Palette: Light Gray Noise, Neon Green (#4dff88), Black
 */

export default function App() {
  const [searchParams] = useSearchParams();
  const noIntro = searchParams.get('noIntro') === 'true';
  
  const [currentScene, setCurrentScene] = useState<{scene: SCENES, story: string}>({scene: noIntro ? SCENES.MAP : SCENES.INTRO, story: ""});
  const [progress, setProgress] = useState({ m1: false, m2: false, m3: false, b1: false, b2: false, b3: false });

  const backToMap = () => {
    setCurrentScene({scene: SCENES.MAP, story: ""});
  };

  return (
    <AppLayout>
      {currentScene.scene === SCENES.INTRO && <Intro onChangeScene={backToMap} />}
      {currentScene.scene === SCENES.MAP && <MissionMap setScene={setCurrentScene} progress={progress} />}
      {currentScene.scene === SCENES.MAIN_MISSION && <MainMission setProgress={setProgress} onChangeScene={backToMap} />}
      {(currentScene.scene === SCENES.SUB_MISSION || currentScene.scene === SCENES.OTHER_MISSION) && <SubMission storyPath={currentScene.story} onChangeScene={backToMap} />}
      {currentScene.scene === SCENES.FINALE && <Final onChangeScene={backToMap} />}
    </AppLayout>
  );
}
