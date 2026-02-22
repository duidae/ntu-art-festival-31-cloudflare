import { useState, useEffect } from 'react';
import { MissionView } from '@/react-app/scene/MissionView';

interface SubMissionProps {
  storyPath: string;
  onChangeScene: () => void;
}

export const SubMission = (props: SubMissionProps) => {
  const { storyPath, onChangeScene } = props;
  const [story, setStory] = useState<any>(null);

  useEffect(() => {
    const loadStory = async () => {
      try {
        const response = await fetch(storyPath);
        const story = await response.json();
        setStory(story);
      } catch (err) {
        console.error(err);
      }
    };
    loadStory();
  }, []);

  const loadingJSX = (
    <div className="h-1/2 bg-[#f4f4f5] flex flex-col items-center justify-center relative p-6">
      <div className="text-center space-y-6">
        <div className="inline-block">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 border-2 border-zinc-300 rounded-none animate-pulse"></div>
            <div className="absolute inset-2 border-2 border-[#4dff88] animate-spin-slow"></div>
          </div>
        </div>
        <div className="font-mono text-lg text-zinc-500 space-y-2">
          <p>正在讀取檔案...</p>
          <p className="text-[#4dff88] font-bold animate-pulse-slow">資料載入中</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full bg-[#f4f4f5] relative flex flex-col justify-between px-6 pt-6">
      {story ? (
        <MissionView story={story} onClose={onChangeScene} />
      ) : (
        loadingJSX
      )}
    </div>
  );
};

export default SubMission;
