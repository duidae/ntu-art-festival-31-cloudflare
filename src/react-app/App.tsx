import { useState } from 'react';
import { SCENES } from '@/src/react-app/constants/enum';
import { ART_FESTIVAL_APP_NAME } from '@/src/react-app/constants';
import { Intro, MissionMap, MainMission, SubMission, Final } from '@/src/react-app/scene';

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

  const headerJSX = (
    <div className="h-10 border-b-2 border-zinc-900 flex justify-between items-center px-4 bg-white z-50 relative shrink-0">
      <span className="font-mono font-bold text-xs tracking-widest" dangerouslySetInnerHTML={{ __html: ART_FESTIVAL_APP_NAME }}></span>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#4dff88] animate-pulse border border-zinc-900"></div>
        <span className="font-mono text-xs font-bold">訊號連線中</span>
      </div>
    </div>
  );

  const noiseOverlayJSX = (
    <div className="absolute inset-0 opacity-[0.08] pointer-events-none z-0 mix-blend-multiply" 
      style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` 
      }}
    />
  );

  return (
    <div className="min-h-screen bg-[#dcdcdc] flex items-center justify-center p-0 md:p-8 font-sans text-zinc-900">
      <div className="w-full max-w-md h-[100dvh] md:h-[800px] bg-[#f4f4f5] md:border-4 border-zinc-900 shadow-2xl overflow-hidden relative flex flex-col">
        {noiseOverlayJSX}
        {headerJSX}
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
