import { Button } from "../ui/button";

interface CreatorCardProps {
  videoSrc: string;
  items: number | number[];
  onAddToCart: (items: number | number[]) => void;
}

const CreatorCard = ({ videoSrc, items, onAddToCart }: CreatorCardProps) => {
  return (
    <div className="space-y-4">
      <div className="relative aspect-[9/16] bg-gray-100 rounded-[20px] overflow-hidden w-full border-4 border-white">
        <video
          src={videoSrc}
          className="object-cover w-full h-full"
          autoPlay
          muted
          loop
          playsInline
          controls={false} 
          aria-label="Vídeo do criador"
        />
      </div>
      <div className="flex justify-center">
        <Button 
          variant="default"
          className="bg-red-500 hover:bg-[#FFC600]"
          onClick={() => onAddToCart(items)}
          aria-label="Adicionar produtos ao carrinho"
        >
          EU QUERO
        </Button>
      </div>
    </div>
  );
};

export default CreatorCard;