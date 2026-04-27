import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/react-app/components/Button';
import { ImgComparisonSlider } from '@img-comparison-slider/react';
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
import { SanitizeHref } from '@/react-app/utils';
import styles from './MissionView.module.css'

type GlideInstance = InstanceType<typeof Glide>;
import { THEME_COLORS } from '@/react-app/constants';

const getYouTubeVideoId = (url: string) => {
  const youtubeRegex = /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(youtubeRegex);
  return match ? match[1] : null;
};

const GlideImageSlider = ({ images, alt, caption }: { images: string[]; alt?: string; caption: string }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const glideInstanceRef = useRef<GlideInstance | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const glide = new Glide(containerRef.current, {
      perView: 1,
      focusAt: 'center',
      gap: 0,
      hoverpause: true,
    });

    glide.mount();
    glideInstanceRef.current = glide;

    return () => {
      glideInstanceRef.current?.destroy();
      glideInstanceRef.current = null;
    };
  }, [images]);

  return (
    <div ref={containerRef} className="glide mb-4 w-full rounded border border-zinc-200 bg-white relative">
      <div className="absolute left-3 top-1/2 z-10 -translate-y-1/2">
        <button
          type="button"
          className="h-10 w-10 rounded-full bg-zinc-900 text-white hover:bg-zinc-700 cursor-pointer"
          onClick={() => glideInstanceRef.current?.go('<')}
          aria-label="上一張"
        >
          ‹
        </button>
      </div>
      <div className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
        <button
          type="button"
          className="h-10 w-10 rounded-full bg-zinc-900 text-white hover:bg-zinc-700 cursor-pointer"
          onClick={() => glideInstanceRef.current?.go('>')}
          aria-label="下一張"
        >
          ›
        </button>
      </div>
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          {images.map((src, idx) => (
            <li key={`glide-slide-${idx}`} className={`glide__slide ${styles.fix} flex flex-col items-center justify-center`}>
              <img
                src={SanitizeHref(src)}
                alt={alt || `slide-${idx + 1}`}
                loading="lazy"
                className="w-full h-auto object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="glide__bullets mt-3 flex justify-center gap-2" data-glide-el="controls[nav]">
        {images.map((_, idx) => (
          <button key={`glide-bullet-${idx}`} className="glide__bullet" data-glide-dir={`=${idx}`} />
        ))}
      </div>
      {caption && (
          <p className="text-center text-sm mt-2 px-4 text-zinc-700">{caption}</p>
      )}
    </div>
  );
};

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
        case 'title':
          return (
            <div key={`section-${index}`}>
              <h2 className="text-2xl font-bold mb-4">{item.text}</h2>
              {item.ref && renderRef(item.ref)}
            </div>
          );
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
              {getYouTubeVideoId(item.url) ? 
                <iframe
                  style={{ minHeight: 250 }}
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(item.url)}`}
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen>
                </iframe> :
                <>
                  <video key={`video-${index}`} controls className="mb-4 w-full h-auto">
                    <source src={SanitizeHref(item.url)} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {item.ref && renderRef(item.ref)}
                </>
              }
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
        case 'image-slider':
          return (
            <div key={`section-${index}`}>
              <GlideImageSlider images={Array.isArray(item.images) ? item.images : []} caption={item.caption} />
              {item.ref && renderRef(item.ref)}
            </div>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className='w-full'>
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <h1 className="text-9xl font-black">HIST</h1>
      </div>

      <div className="z-10 mb-6 flex justify-between items-center border-b-2 border-zinc-900 pb-2">
        <h3 className="text-xl font-black uppercase flex items-center gap-2">
          <span style={{ backgroundColor: THEME_COLORS.Green, color: 'white'}} className="text-zinc-900 px-1">支線</span> {story.title}
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
