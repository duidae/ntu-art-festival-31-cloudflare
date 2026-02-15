import { useState } from 'react';
import { SCENES } from '@/react-app/constants/enum';
import { Intro, MissionMap, MainMission, SubMission, Final } from '@/react-app/scene';
import { Header } from '@/react-app/components/Header';
import { NoiseOverlay } from '@/react-app/components/NoiseOverlay';

/**
 * 圳下之聲：瑠公圳的隱地下生態 (Voices from the Underground)
 * Style: DECOmposer (Art Festival / Brutalist / Deconstruction)
 * Palette: Light Gray Noise, Neon Green (#4dff88), Black
 */

export default function App() {
  const [currentScene, setCurrentScene] = useState<{scene: SCENES, story: string}>({scene: SCENES.INTRO, story: ""});
  const [progress, setProgress] = useState({ m1: false, m2: false, m3: false, b1: false, b2: false, b3: false });

  const backToMap = () => {
    setCurrentScene({scene: SCENES.MAP, story: ""});
  };

  return (
    <div className="min-h-screen bg-[#dcdcdc] flex items-center justify-center p-0 md:p-8 font-sans text-zinc-900">
      <div className="w-full max-w-md h-[100dvh] md:h-[800px] bg-[#f4f4f5] md:border-4 border-zinc-900 shadow-2xl overflow-hidden relative flex flex-col">
        <NoiseOverlay />
        <Header />
        <div className="flex-1 relative overflow-auto">
          {currentScene.scene === SCENES.INTRO && <Intro onChangeScene={backToMap} />}
          {currentScene.scene === SCENES.MAP && <MissionMap setScene={setCurrentScene} progress={progress} />}
          {currentScene.scene === SCENES.MAIN_MISSION && <MainMission setProgress={setProgress} onChangeScene={backToMap} />}
          {(currentScene.scene === SCENES.SUB_MISSION || currentScene.scene === SCENES.OTHER_MISSION) && <SubMission storyPath={currentScene.story} onChangeScene={backToMap} />}
          {currentScene.scene === SCENES.FINALE && <Final onChangeScene={backToMap} />}
        </div>
      </div>
    </div>
  );
}
