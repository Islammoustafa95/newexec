import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import ImageModal from './ImageModal';

interface PortfolioCarouselProps {
  images: string[];
}

const PortfolioCarousel: React.FC<PortfolioCarouselProps> = ({ images }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const gridIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const dragStartTime = useRef<number>(0);
  const [featuredStartIndex, setFeaturedStartIndex] = useState(0);
  const [isGridPaused, setIsGridPaused] = useState(false);

  // Auto-change grid every 3 seconds
  useEffect(() => {
    if (!isGridPaused) {
      gridIntervalRef.current = setInterval(() => {
        setFeaturedStartIndex((prevIndex) => {
          const nextIndex = prevIndex + 4;
          return nextIndex >= images.length ? 0 : nextIndex;
        });
      }, 3000);
    }

    return () => {
      if (gridIntervalRef.current) {
        clearInterval(gridIntervalRef.current);
      }
    };
  }, [isGridPaused, images.length]);

  const autoScroll = () => {
    if (carouselRef.current) {
      const isAtEnd = carouselRef.current.scrollLeft >= 
        (carouselRef.current.scrollWidth - carouselRef.current.clientWidth);

      if (isAtEnd) {
        carouselRef.current.scrollLeft = 0;
      } else {
        carouselRef.current.scrollBy({ left: 2, behavior: 'auto' });
      }
    }
  };

  useEffect(() => {
    if (!isPaused) {
      scrollIntervalRef.current = setInterval(autoScroll, 50);
    }
    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [isPaused]);

  const scrollTo = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setScrollPosition(carouselRef.current.scrollLeft + scrollAmount);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    dragStartTime.current = Date.now();
  };

  const handleMouseUp = (e: React.MouseEvent, image: string) => {
    const dragDuration = Date.now() - dragStartTime.current;
    if (dragDuration < 200) { // If the drag was less than 200ms, consider it a click
      const imageIndex = images.indexOf(image);
      if (imageIndex !== -1) {
        setFeaturedStartIndex(imageIndex);
      }
    }
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    dragStartTime.current = Date.now();
  };

  const handleTouchEnd = (e: React.TouchEvent, image: string) => {
    const dragDuration = Date.now() - dragStartTime.current;
    if (dragDuration < 200) {
      const imageIndex = images.indexOf(image);
      if (imageIndex !== -1) {
        setFeaturedStartIndex(imageIndex);
      }
    }
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Get the current featured images based on the start index
  const featuredImages = images.slice(featuredStartIndex, featuredStartIndex + 4);
  // Get the remaining images for the carousel
  const carouselImages = [
    ...images.slice(featuredStartIndex + 4),
    ...images.slice(0, featuredStartIndex)
  ];

  return (
    <>
      <div className="space-y-8">
        {/* Featured Grid (2x2) */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          onMouseEnter={() => setIsGridPaused(true)}
          onMouseLeave={() => setIsGridPaused(false)}
        >
          {featuredImages.map((image, index) => (
            <Tilt
              key={`${featuredStartIndex}-${index}`}
              className="transform-gpu"
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              perspective={1000}
              scale={1.02}
              transitionSpeed={1500}
              gyroscope={true}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={image}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 h-[300px] group cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt="Portfolio showcase"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-gray-300 text-sm mb-4">
                    Click to view full size
                  </p>
                  <div className="text-[#40E0D0] hover:text-white transition-colors duration-300 flex items-center gap-2">
                    View Details
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>

        {/* Carousel Section */}
        <div 
          className="relative max-w-6xl mx-auto px-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            onClick={() => scrollTo('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900/80 p-2 rounded-full text-white hover:bg-gray-800 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div
            ref={carouselRef}
            className={`overflow-x-auto scrollbar-hide flex gap-6 scroll-smooth cursor-${isDragging ? 'grabbing' : 'grab'}`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={(e) => handleMouseUp(e, '')}
            onMouseLeave={() => {
              handleMouseUp({ pageX: 0 } as React.MouseEvent, '');
              setIsPaused(false);
            }}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={(e) => handleTouchEnd(e, '')}
            onTouchMove={handleTouchMove}
          >
            {carouselImages.map((image, index) => (
              <motion.div
                key={`carousel-${index}`}
                className="flex-none w-[300px]"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onMouseUp={(e) => handleMouseUp(e, image)}
                onTouchEnd={(e) => handleTouchEnd(e, image)}
              >
                <div className="relative overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 h-[200px] group cursor-pointer">
                  <img
                    src={image}
                    alt="Portfolio showcase"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 p-4 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="text-[#40E0D0] hover:text-white transition-colors duration-300 flex items-center gap-2 text-sm">
                      Click to update featured images
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => scrollTo('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900/80 p-2 rounded-full text-white hover:bg-gray-800 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <ImageModal
        imageUrl={selectedImage || ''}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
};

export default PortfolioCarousel;