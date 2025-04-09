import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageModalProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, isOpen, onClose }) => {
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.01;
    const newScale = Math.min(Math.max(1, scale + delta), 3);
    setScale(newScale);
    
    if (newScale === 1) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const zoomIn = () => {
    setScale(Math.min(scale + 0.5, 3));
  };

  const zoomOut = () => {
    const newScale = Math.max(1, scale - 0.5);
    setScale(newScale);
    if (newScale === 1) {
      setPosition({ x: 0, y: 0 });
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 flex gap-2"
        >
          <button
            className="text-white/80 hover:text-white p-2 rounded-full bg-black/50 backdrop-blur-sm transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              zoomIn();
            }}
          >
            <ZoomIn className="w-6 h-6" />
          </button>
          <button
            className="text-white/80 hover:text-white p-2 rounded-full bg-black/50 backdrop-blur-sm transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              zoomOut();
            }}
          >
            <ZoomOut className="w-6 h-6" />
          </button>
          <button
            className="text-white/80 hover:text-white p-2 rounded-full bg-black/50 backdrop-blur-sm transition-colors"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </button>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-[90vw] h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          <div
            className={`w-full h-full flex items-center justify-center ${scale > 1 ? 'cursor-grab' : ''} ${isDragging && scale > 1 ? 'cursor-grabbing' : ''}`}
          >
            <img
              src={imageUrl}
              alt="Full size view"
              className="max-w-full max-h-full object-contain select-none"
              style={{
                transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                transition: isDragging ? 'none' : 'transform 0.2s',
              }}
              draggable={false}
            />
          </div>
        </motion.div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
          Use mouse wheel or buttons to zoom • Drag to pan when zoomed
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageModal;