import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const VideoModal = ({ isOpen, onClose }) => {
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Fecha ao clicar no fundo
        >
          <motion.div
            className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={(e) => e.stopPropagation()} // Impede fechamento ao clicar dentro do modal
          >
            {/* Botão de Fechar */}
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl"
              onClick={onClose}
              aria-label="Fechar modal"
            >
              <X size={24} />
            </button>

            {/* Vídeo */}
            <video controls className="w-full rounded">
              <source src="/video/tutorial_tedie.mp4" type="video/mp4" />
              Seu navegador não suporta vídeos.
            </video>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
