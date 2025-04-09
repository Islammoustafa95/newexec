import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring';

interface FairyProps {
  mousePosition: { x: number; y: number };
  isActive: boolean;
}

const Fairy: React.FC<FairyProps> = ({ mousePosition, isActive }) => {
  const fairyRef = useRef<HTMLDivElement>(null);
  const [isResting, setIsResting] = useState(false);
  const [lastMouseMove, setLastMouseMove] = useState(Date.now());
  const [randomMovement, setRandomMovement] = useState({ x: 0, y: 0 });

  // Fairy position with smooth animation
  const { x, y, rotation } = useSpring({
    x: !isActive ? -100 : (isResting ? mousePosition.x + randomMovement.x : mousePosition.x),
    y: !isActive ? -100 : (isResting ? mousePosition.y + randomMovement.y : mousePosition.y),
    rotation: isResting ? randomMovement.x * 0.2 : 0,
    config: { tension: 120, friction: 14 },
  });

  // Fairy wing animation
  const wingAnimation = useSpring({
    from: { transform: 'scaleX(1)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'scaleX(-1)' });
        await next({ transform: 'scaleX(1)' });
      }
    },
    config: { duration: 300 },
  });

  // Sparkle trail effect
  const createSparkle = (x: number, y: number) => {
    if (!fairyRef.current || !isActive) return;
    
    const sparkle = document.createElement('div');
    sparkle.className = 'absolute w-1 h-1 bg-[#40E0D0] rounded-full';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.opacity = '0.8';
    
    fairyRef.current.appendChild(sparkle);

    setTimeout(() => {
      sparkle.style.transition = 'all 0.5s ease-out';
      sparkle.style.transform = `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px)`;
      sparkle.style.opacity = '0';
    }, 50);

    setTimeout(() => sparkle.remove(), 500);
  };

  // Random movements when resting
  useEffect(() => {
    if (!isActive) return;

    const checkIdleTime = setInterval(() => {
      const now = Date.now();
      if (now - lastMouseMove > 2000) {
        setIsResting(true);
        setRandomMovement({
          x: Math.sin(now / 1000) * 30,
          y: Math.cos(now / 1000) * 30,
        });
      }
    }, 100);

    return () => clearInterval(checkIdleTime);
  }, [lastMouseMove, isActive]);

  // Update last mouse move time
  useEffect(() => {
    if (!isActive) return;
    setLastMouseMove(Date.now());
    setIsResting(false);
  }, [mousePosition, isActive]);

  // Create sparkle trail
  useEffect(() => {
    if (!isResting && isActive) {
      createSparkle(mousePosition.x, mousePosition.y);
    }
  }, [mousePosition.x, mousePosition.y, isResting, isActive]);

  if (!isActive) return null;

  return (
    <div ref={fairyRef} className="fixed top-0 left-0 pointer-events-none z-50">
      <animated.div
        style={{
          transform: rotation.to(r => `translate(${x}px, ${y}px) rotate(${r}deg)`),
        }}
        className="relative"
      >
        {/* Fairy body */}
        <div className="relative w-6 h-6">
          {/* Fairy glow */}
          <div className="absolute inset-0 bg-[#40E0D0] rounded-full blur-md opacity-30 animate-pulse"></div>
          
          {/* Fairy core */}
          <div className="absolute inset-1 bg-white rounded-full shadow-lg"></div>
          
          {/* Fairy wings */}
          <animated.div
            style={wingAnimation}
            className="absolute -left-4 top-1 w-4 h-4 bg-white/50 rounded-full blur-sm"
          ></animated.div>
          <animated.div
            style={wingAnimation}
            className="absolute left-6 top-1 w-4 h-4 bg-white/50 rounded-full blur-sm"
          ></animated.div>
        </div>
      </animated.div>
    </div>
  );
};

export default Fairy;