import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/src/react-app/components/Button';
import { ImgComparisonSlider } from '@img-comparison-slider/react';
import { SanitizeHref } from '@/src/react-app/utils';

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

  const renderRef = (ref: string) => {
    return ref && (
      <div className="w-full mb-2">
        <a
          className="text-xs block w-full text-center truncate"
          href={SanitizeHref(ref)}
          target="_blank"
          rel="noopener noreferrer"
          title={ref}
          aria-label={`資料來源: ${ref}`}
        >
          資料來源: {ref}
        </a>
      </div>
    );
  };

  const renderStory = (story: any) => {
    if (!story || !story.contents) return null;
    
    return story.contents.map((item: any, index: number) => {
      switch (item.type) {
        case 'paragraph':
          return (
            <div key={`section-${index}`}>
              <p className="mb-4 text-zinc-900">{item.text}</p>
              {item.ref && renderRef(item.ref)}
            </div>
          );
        case 'image':
          return (
            <div key={`section-${index}`}>
              <img key={`image-${index}`} src={SanitizeHref(item.url)} loading="lazy" className="mb-1 w-full h-auto" />
              {item.ref && renderRef(item.ref)}
            </div>
          );
        case 'video':
          return (
            <div key={`section-${index}`}>
              <video key={`video-${index}`} controls className="mb-4 w-full h-auto">
                <source src={SanitizeHref(item.url)} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {item.ref && renderRef(item.ref)}
            </div>
          );
        case 'image-compare':
          return (
            <div key={`section-${index}`} className="mb-4 w-full">
              <ImgComparisonSlider>
                <img slot="first" src={SanitizeHref(item.before)} />
                <img slot="second" src={SanitizeHref(item.after)} />
              </ImgComparisonSlider>
              {item.ref && renderRef(item.ref)}
            </div>
          );
        default:
          return null;
      }
    });
  };

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
      {story ? 
        <div>
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <h1 className="text-9xl font-black">HIST</h1>
          </div>
          
          <div className="z-10 mb-6 flex justify-between items-center border-b-2 border-zinc-900 pb-2">
            <h3 className="text-xl font-black uppercase flex items-center gap-2">
              <span className="bg-[#4dff88] text-zinc-900 px-1">支線</span> {story.title}
            </h3>
            <button onClick={() => onChangeScene()} className="cursor-pointer"><X size={20} /></button>
          </div>

          <div className="items-center justify-center">
            {renderStory(story)}
          </div>
        </div> : loadingJSX}

      <div className="z-10 flex flex-col items-center justify-center relative pb-6">
        <div className="animate-fade-in text-center w-full">
          <Button onClick={() => onChangeScene()} variant="primary" className="w-full cursor-pointer">
            關閉檔案
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubMission;
