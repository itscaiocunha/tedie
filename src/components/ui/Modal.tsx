import { Button } from "../ui/button"
import { useEffect } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal = ({ isOpen, onClose }: VideoModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg p-6 max-w-4xl w-full mx-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-2 right-2 z-10 rounded-full w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition-colors"
          aria-label="Fechar modal"
        >
          <span className="text-xl font-bold">×</span>
        </Button>
        <div className="aspect-video w-full relative overflow-hidden">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/YDcQzNFi12I?autoplay=1&mute=1&modestbranding=1&rel=0&controls=0&showinfo=0&fs=0&disablekb=1"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default VideoModal;