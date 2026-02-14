import React from 'react';

interface CameraOverlayProps {
  cameraActive: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  cameraStream: MediaStream | null;
  setCameraStream: (stream: MediaStream | null) => void;
  setCameraActive: (active: boolean) => void;
}

export const CameraOverlay: React.FC<CameraOverlayProps> = ({ cameraActive, videoRef, cameraStream, setCameraStream, setCameraActive }) => {
  if (!cameraActive) return null;

  const takePicture = () => {
    const video = videoRef.current;
    if (!video) return;
    const w = video.videoWidth || video.clientWidth || 640;
    const h = video.videoHeight || video.clientHeight || 480;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    try {
      ctx.drawImage(video, 0, 0, w, h);
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `capture-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      console.error('Failed to capture image', e);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(t => t.stop());
    }
    setCameraStream(null);
    setCameraActive(false);
  };

  return (
    <div className="absolute inset-0 z-[3000] bg-black flex items-stretch">
      <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-[3100]">
        <div className="flex gap-3 bg-black/40 backdrop-blur-sm p-2 rounded-full">
          <button onClick={takePicture} className="bg-white/90 text-zinc-900 px-4 py-2 border-2 border-zinc-900 font-bold rounded-full cursor-pointer">拍照</button>
          <button onClick={stopCamera} className="bg-white/90 text-zinc-900 px-4 py-2 border-2 border-zinc-900 font-bold rounded-full cursor-pointer">關閉</button>
        </div>
      </div>
    </div>
  );
};

export default CameraOverlay;
