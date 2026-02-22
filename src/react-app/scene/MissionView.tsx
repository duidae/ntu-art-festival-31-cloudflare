import { X } from 'lucide-react';
import { Button } from '@/react-app/components/Button';
import { ImgComparisonSlider } from '@img-comparison-slider/react';
import { SanitizeHref } from '@/react-app/utils';

interface MissionViewProps {
  story: any;
  onClose: () => void;
}

export const MissionView = ({ story, onClose }: MissionViewProps) => {
  if (!story) return null;

  const renderRef = (ref: string) => {
    return ref && (
      <div className="w-full mb-2" key={`ref-${ref}`}>
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

  const renderStory = (storyData: any) => {
    if (!storyData || !storyData.contents) return null;

    return storyData.contents.map((item: any, index: number) => {
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

  return (
    <div>
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <h1 className="text-9xl font-black">HIST</h1>
      </div>

      <div className="z-10 mb-6 flex justify-between items-center border-b-2 border-zinc-900 pb-2">
        <h3 className="text-xl font-black uppercase flex items-center gap-2">
          <span className="bg-[#4dff88] text-zinc-900 px-1">支線</span> {story.title}
        </h3>
        <button onClick={() => onClose()} className="cursor-pointer"><X size={20} /></button>
      </div>

      <div className="items-center justify-center">
        {renderStory(story)}
      </div>

      <div className="z-10 flex flex-col items-center justify-center relative pb-6">
        <div className="animate-fade-in text-center w-full">
          <Button onClick={() => onClose()} variant="primary" className="w-full cursor-pointer">
            關閉檔案
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MissionView;
