import { Button } from "@/components/ui/button";

interface ModalEmailProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export const ModalEmail = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: ModalEmailProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="flex justify-end gap-3">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-gray-300 hover:bg-gray-50"
          >
            Cancelar
          </Button>
          <Button 
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Criar
          </Button>
        </div>
      </div>
    </div>
  );
};