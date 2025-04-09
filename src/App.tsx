import React, { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, ExternalLink, Waves, Container as PoolContainer, Hexagon, Cuboid as Cube, Factory, Sparkles, Building2, HomeIcon, CircuitBoard, Hammer, Menu, Youtube, Linkedin } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import Fairy from './components/Fairy';
import PortfolioCarousel from './components/PortfolioCarousel';
import Navigation from './components/Navigation';
import ChatWidget from './components/ChatWidget';

function App() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isFairyActive, setIsFairyActive] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const legacyRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const cadGridRef = useRef<HTMLDivElement>(null);
  const blueprintLinesRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [clearMessage, setClearMessage] = useState('');
  const [showLogo, setShowLogo] = useState(true);
  const clearMessageRef = useRef<string>('');
  const typingRef = useRef<NodeJS.Timeout | null>(null);
  const cursorMarkerRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const services = [
    {
      icon: Waves,
      title: "Swimming Pool Design & Construction",
      description: "Custom-designed pools built for durability, aesthetics, and functionality.",
      image: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&q=80&w=600"
    },
    {
      icon: PoolContainer,
      title: "Acrylic Pool Walls",
      description: "Clear, strong, and stylish walls for a seamless underwater view.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600"
    },
    {
      icon: Hexagon,
      title: "Acrylic Pool Windows",
      description: "High-quality acrylic windows for stunning aquatic visibility.",
      image: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&q=80&w=600"
    },
    {
      icon: Cube,
      title: "Acrylic Pool Floors",
      description: "Transparent, durable flooring for a unique pool experience.",
      image: "https://images.unsplash.com/photo-1529290130-4ca3753253ae?auto=format&fit=crop&q=80&w=600"
    },
    {
      icon: Factory,
      title: "FRP Pools",
      description: "Lightweight, durable, and low-maintenance fiberglass pools.",
      image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=600"
    },
    {
      icon: Sparkles,
      title: "Custom Acrylic Works",
      description: "Bespoke acrylic structures for pools, aquariums, and more.",
      image: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&q=80&w=600"
    },
    {
      icon: Building2,
      title: "Custom GRP Works",
      description: "Durable, corrosion-resistant GRP solutions for various applications.",
      image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=600"
    },
    {
      icon: HomeIcon,
      title: "Carpentry & Joinery",
      description: "Precision woodwork for interiors, exteriors, and custom furniture.",
      image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&q=80&w=600"
    },
    {
      icon: CircuitBoard,
      title: "Fit-Out",
      description: "Complete interior finishing and transformation services.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600"
    },
    {
      icon: Hammer,
      title: "Metal Works",
      description: "Custom metal fabrication for architectural and industrial needs.",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600"
    }
  ];

  const portfolioImages = [
    "https://i.ibb.co/QSxfxBm/enhasdasdnced-image-2.png",
    "https://i.ibb.co/wFmRbf1w/sdadasimage-1.png",
    "https://i.ibb.co/HfXwPmq3/4342343.png",
    "https://i.ibb.co/WW3t3Fjd/23213213.png",
    "https://i.ibb.co/ch5NtQbF/321313.png",
    "https://i.ibb.co/27V3H4gP/q34343enhanced-image.png",
    "https://i.ibb.co/Xf4T252B/edfsdgfdsfnhanced-image.png",
    "https://i.ibb.co/FbZwvckg/3432423.png",
    "https://i.ibb.co/xKpfb9qh/34343enhanced-image-1.png",
    "https://i.ibb.co/cKQC51g2/2sdwasenhanced-image.png",
    "https://i.ibb.co/mFRknRqD/12e43enhanced-image.png",
    "https://i.ibb.co/v43gJcgM/enhanced-image-1.png",
    "https://i.ibb.co/cWC3rbp/enhanced-image-new.png",
    "https://i.ibb.co/wFFr0dkW/enhanced-image90.png",
    "https://i.ibb.co/N6xZ6d7L/enhanced-image88.png",
    "https://i.ibb.co/84nGJvSM/enhanced-image85.png",
    "https://i.ibb.co/ZRRvwdkr/enhanced-image-84.png",
    "https://i.ibb.co/XxCPKXm1/enhanced-image83.png",
    "https://i.ibb.co/SDXvkYqq/enhanced-image82.png",
    "https://i.ibb.co/tTwhQQ1h/enhanced-image81.png",
    "https://i.ibb.co/5XdKhrkF/enhanced-image80.png",
    "https://i.ibb.co/prbMtXZS/enhanced-image79.png",
    "https://i.ibb.co/MQD5jBR/enhanced-image78.png",
    "https://i.ibb.co/zThq8D53/enhanced-image76.png",
    "https://i.ibb.co/BKYQvK1v/enhanced-image75.png",
    "https://i.ibb.co/ZRms0KPf/34q342qenhanced-image.png",
    "https://i.ibb.co/vvdBFSHF/enhanced-image73.png",
    "https://i.ibb.co/JVG43vL/enhanced-image72.png",
    "https://i.ibb.co/j9mPtHqW/enhanced-image70.png",
    "https://i.ibb.co/G3QXHCHs/enhanced-image68.png",
    "https://i.ibb.co/5XHfVs5d/enhanced-image67.png",
    "https://i.ibb.co/s9y1xW0Z/enhanced-image66.png",
    "https://i.ibb.co/C3NW5dXz/enhanced-image65.png",
    "https://i.ibb.co/5Xq1DSTp/enhanced-image64.png",
    "https://i.ibb.co/8Lc6B5Dt/enhanced-image63.png",
    "https://i.ibb.co/xqDPjrpv/enhanced-image62.png",
    "https://i.ibb.co/KjJ6P7x9/enhanced-image61.png",
    "https://i.ibb.co/xtV0vpf8/enhanced-image60.png",
    "https://i.ibb.co/Y4HZVyMG/enhanced-image-60.png",
    "https://i.ibb.co/Fbs6htZT/enhanced-image.png",
    "https://i.ibb.co/fVqNXPZ7/enhanced-image39.png",
    "https://i.ibb.co/JRnDkmph/enhanced-image38.png",
    "https://i.ibb.co/HfjnKZHr/enhancsdsed-image.png",
    "https://i.ibb.co/4RCbr4jj/35-enhanced.png",
    "https://i.ibb.co/TB4K1mN2/34-enhanced.png",
    "https://i.ibb.co/WNgpQgJX/32-enhanced.png",
    "https://i.ibb.co/mrmgRDrr/31-enhanced.png",
    "https://i.ibb.co/pjXR5n71/30-enhanced.png",
    "https://i.ibb.co/kgKfwzVH/26-enhanced.png",
    "https://i.ibb.co/wNkswTSY/25-enhanced.png",
    "https://i.ibb.co/zVCc2Ysv/24-enhanced.png",
    "https://i.ibb.co/jkLMZGkD/23-enhanced.png",
    "https://i.ibb.co/SDbNn3Yb/22-enhanced.png",
    "https://i.ibb.co/HDVwJxs9/27.jpg",
    "https://i.ibb.co/XZkB6xqW/20-enhanced.png",
    "https://i.ibb.co/Z64Sknts/19-enhanced.png",
    "https://i.ibb.co/v4fYVzcy/18-enhanced.png",
    "https://i.ibb.co/fdhHGGcj/17-enhanced.png",
    "https://i.ibb.co/MyLPnQhW/14-enhanced.png",
    "https://i.ibb.co/Z6kQgS65/13-enhadsfnced.png",
    "https://i.ibb.co/PsfWm4gn/3-enhanced.png",
    "https://i.ibb.co/vvhRm8Yj/12-enhanced.png",
    "https://i.ibb.co/jPhsxyfN/11-enhanced.png",
    "https://i.ibb.co/ZpsxwC9f/10-enhanced.png",
    "https://i.ibb.co/wNpdDqKk/9-enhanced.png",
    "https://i.ibb.co/Hf8Xf67T/8-enhanced.png",
    "https://i.ibb.co/x8fHJ2j1/6-enhanced.png",
    "https://i.ibb.co/fzmMt6mw/5-enhanced.png",
    "https://i.ibb.co/CKMBrnMC/Screenshot-2025-03-30-001933-enhanced.png",
    "https://i.ibb.co/d0JynVcn/2-enhanced.png",
    "https://i.ibb.co/HTvw4ZLw/1-enhanced.png",
    "https://i.ibb.co/5WJnN06m/7.png",
    "https://i.ibb.co/wFFr0dkW/16.jpg",
    "https://i.ibb.co/VYdRL8Hw/15.jpg"
  ];

  const clients = [
    {
      name: "Condor",
      logo: "https://i.ibb.co/r2mHfrcq/condor.png",
      description: "Leading industry partner"
    },
    {
      name: "Master Concept",
      logo: "https://i.ibb.co/PZn5wjdt/master-concept.png",
      description: "Strategic technology partner"
    },
    {
      name: "Jadan Landscaping",
      logo: "https://i.ibb.co/20CY1WLz/Jadan.png",
      description: "Landscaping excellence"
    },
    {
      name: "Intel Space",
      logo: "https://i.ibb.co/4wDky92j/Intelspace.png",
      description: "Building innovation"
    },
    {
      name: "Ashtaar Interiors",
      logo: "https://i.ibb.co/TMt44ST3/Ashtaar.png",
      description: "Interior design excellence"
    },
    {
      name: "Dynamic Castle",
      logo: "https://i.ibb.co/7JQ2w58j/dynamic-castle-interior-decoration-logo.jpg",
      description: "Interior decoration specialists"
    },
    {
      name: "Interiors International",
      logo: "https://i.ibb.co/JFkdn4Tj/interiors-international.jpg",
      description: "Global interior solutions"
    },
    {
      name: "Emkay",
      logo: "https://i.ibb.co/x8RYnMf1/emkay.jpg",
      description: "Innovative design solutions"
    },
    {
      name: "Alamis",
      logo: "https://i.ibb.co/JFy4mgSn/alamis.jpg",
      description: "Architectural excellence"
    },
    {
      name: "Desert Dream",
      logo: "https://i.ibb.co/s9qZZzYR/desertdream.jpg",
      description: "Desert-inspired designs"
    },
    {
      name: "Creating Homes",
      logo: "https://i.ibb.co/G4RCMXCk/failed-creating-homes.jpg",
      description: "Custom home solutions"
    },
    {
      name: "Henessy",
      logo: "https://i.ibb.co/d4q7v1t0/failwed-henessy.jpg",
      description: "Luxury interior design"
    },
    {
      name: "Secret Garden",
      logo: "https://i.ibb.co/TMvdVm0S/Failed-secret-garden.jpg",
      description: "Landscape architecture"
    },
    {
      name: "La Casa",
      logo: "https://i.ibb.co/hxzgG1qz/failed-lacasa-logo.jpg",
      description: "Premium living spaces"
    },
    {
      name: "Atef Design",
      logo: "https://i.ibb.co/JWwDVQnD/done-atef.jpg",
      description: "Innovative design solutions"
    },
    {
      name: "CK Architecture",
      logo: "https://i.ibb.co/XkpJDWPt/Failed-ck-architecture-interiors-l-l-c-cover.jpg",
      description: "Architectural innovation"
    }
  ];

  // Duplicate clients array to create infinite scroll effect
  const duplicatedClients = [...clients, ...clients];

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (heroRef.current) {
        const heroRect = heroRef.current.getBoundingClientRect();
        const isInHero = e.clientY <= heroRect.bottom;
        setIsFairyActive(!isInHero);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const navigationCallbacks = {
    about: () => scrollToSection(legacyRef),
    services: () => scrollToSection(servicesRef),
    portfolio: () => scrollToSection(portfolioRef),
    clients: () => scrollToSection(clientsRef),
    team: () => navigate('/team'),
    contact: () => scrollToSection(contactRef),
  };

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const typeMessage = (message: string) => {
    let index = 0;
    clearMessageRef.current = '';
    
    if (typingRef.current) {
      clearTimeout(typingRef.current);
    }

    const type = () => {
      if (index < message.length) {
        clearMessageRef.current += message[index];
        setClearMessage(clearMessageRef.current);
        index++;
        typingRef.current = setTimeout(type, 50);
      } else {
        setTimeout(() => {
          setClearMessage('');
          clearMessageRef.current = '';
        }, 2000);
      }
    };

    type();
  };

  const clearDesign = () => {
    if (heroRef.current) {
      const elements = heroRef.current.querySelectorAll('.drawing-line, .line-length, .drawing-line-preview, .measurement-text, .cursor-marker');
      elements.forEach(element => element.remove());

      setIsDrawing(false);
      setStartPoint(null);
      
      const cursorMarker = document.createElement('div');
      cursorMarker.className = 'cursor-marker';
      heroRef.current.appendChild(cursorMarker);
      cursorMarkerRef.current = cursorMarker;
      
      typeMessage('CAD Board is cleared!');
    }
  };

  useEffect(() => {
    if (!heroRef.current || !blueprintLinesRef.current || !cadGridRef.current) return;

    const hero = heroRef.current;
    const blueprintLines = blueprintLinesRef.current;
    const cadGrid = cadGridRef.current;
    
    const cursorMarker = document.createElement('div');
    cursorMarker.className = 'cursor-marker';
    hero.appendChild(cursorMarker);
    cursorMarkerRef.current = cursorMarker;

    const tooltip = document.createElement('div');
    tooltip.className = 'hover-tooltip';
    tooltip.textContent = 'Click and drag to draw lines';
    hero.appendChild(tooltip);
    tooltipRef.current = tooltip;

    const createDepthMarkers = () => {
      const depths = [
        { x: 25, y: 30, depth: '3ft' },
        { x: 45, y: 50, depth: '5ft' },
        { x: 65, y: 70, depth: '7ft' },
        { x: 85, y: 50, depth: '8ft' }
      ];

      depths.forEach(({ x, y, depth }) => {
        const marker = document.createElement('div');
        marker.className = 'pool-depth-marker';
        marker.textContent = depth;
        marker.style.left = `${x}%`;
        marker.style.top = `${y}%`;
        hero.appendChild(marker);
      });
    };

    const createTechnicalNotes = () => {
      const notes = [
        { x: 85, y: 35, text: 'NE Swimming Pool Design\nReinforced concrete shell: 8" thickness' },
        { x: 80, y: 80, text: 'Filtration system capacity: 2000 GPH' }
      ];

      notes.forEach(({ x, y, text }) => {
        const note = document.createElement('div');
        note.className = 'technical-note';
        note.textContent = text;
        note.style.left = `${x}%`;
        note.style.top = `${y}%`;
        hero.appendChild(note);
      });
    };

    const headingText = "Architectural Engineering Pioneers";
    const heading = hero.querySelector('h1');
    if (heading) {
      heading.innerHTML = headingText.split('').map(char => 
        `<span class="kinetic-text"><span>${char === ' ' ? '&nbsp;' : char}</span></span>`
      ).join('');
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = hero.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;
      
      if (cursorMarkerRef.current) {
        cursorMarkerRef.current.style.left = `${clientX - rect.left}px`;
        cursorMarkerRef.current.style.top = `${clientY - rect.top}px`;
      }

      if (tooltipRef.current) {
        tooltipRef.current.style.left = `${clientX - rect.left + 25}px`;
        tooltipRef.current.style.top = `${clientY - rect.top - 30}px`;
      }

      if (isDrawing && startPoint) {
        const currentPoint = {
          x: clientX - rect.left,
          y: clientY - rect.top
        };

        const line = document.createElement('div');
        line.className = 'drawing-line';
        const length = Math.sqrt(
          Math.pow(currentPoint.x - startPoint.x, 2) +
          Math.pow(currentPoint.y - startPoint.y, 2)
        );
        const angle = Math.atan2(
          currentPoint.y - startPoint.y,
          currentPoint.x - startPoint.x
        ) * 180 / Math.PI;

        line.style.width = `${length}px`;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.left = `${startPoint.x}px`;
        line.style.top = `${startPoint.y}px`;

        const oldLine = hero.querySelector('.drawing-line-preview');
        if (oldLine) oldLine.remove();
        
        line.classList.add('drawing-line-preview');
        hero.appendChild(line);

        const lengthIndicator = document.createElement('div');
        lengthIndicator.className = 'line-length';
        lengthIndicator.textContent = `${Math.round(length)}px`;
        lengthIndicator.style.left = `${startPoint.x + length / 2}px`;
        lengthIndicator.style.top = `${startPoint.y - 20}px`;

        const oldLength = hero.querySelector('.line-length');
        if (oldLength) oldLength.remove();
        
        hero.appendChild(lengthIndicator);
      }
      
      cadGrid.style.transform = `
        perspective(1000px)
        rotateX(${60 + y * 3}deg)
        rotateY(${x * 3}deg)
        translateZ(0)
      `;

      const measurementText = document.createElement('div');
      measurementText.className = 'measurement-text';
      measurementText.innerHTML = `
        <div>X: ${Math.round(clientX - rect.left)}px</div>
        <div>Y: ${Math.round(clientY - rect.top)}px</div>
        <div>Scale: 1:50</div>
      `;
      measurementText.style.left = `${clientX - rect.left + 30}px`;
      measurementText.style.top = `${clientY - rect.top + 30}px`;

      const oldMeasurement = hero.querySelector('.measurement-text');
      if (oldMeasurement) oldMeasurement.remove();
      
      hero.appendChild(measurementText);
      
      const letters = hero.querySelectorAll('.kinetic-text span');
      letters.forEach(letter => {
        const rect = letter.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        const maxDistance = 200;
        
        if (distance < maxDistance) {
          const angle = Math.atan2(distanceY, distanceX);
          const force = (maxDistance - distance) / maxDistance;
          const x = Math.cos(angle) * 30 * force;
          const y = Math.sin(angle) * 30 * force;
          const scale = 1 + force * 0.5;
          
          (letter as HTMLElement).style.transform = 
            `translate(${x}px, ${y}px) scale(${scale})`;
        } else {
          (letter as HTMLElement).style.transform = 'translate(0, 0) scale(1)';
        }
      });
    };

    const handleMouseDown = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      setIsDrawing(true);
      setStartPoint({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });

      if (tooltipRef.current) {
        tooltipRef.current.classList.remove('visible');
      }
    };

    const handleMouseUp = () => {
      if (isDrawing && startPoint && heroRef.current) {
        const previewLine = heroRef.current.querySelector('.drawing-line-preview');
        if (previewLine) {
          previewLine.classList.remove('drawing-line-preview');
        }
      }
      setIsDrawing(false);
      setStartPoint(null);
    };

    const handleMouseEnter = () => {
      if (tooltipRef.current) {
        tooltipRef.current.classList.add('visible');
      }
    };

    const handleMouseLeave = () => {
      if (tooltipRef.current) {
        tooltipRef.current.classList.remove('visible');
      }
    };

    createDepthMarkers();
    createTechnicalNotes();

    window.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    hero.addEventListener('mouseenter', handleMouseEnter);
    hero.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      hero.removeEventListener('mouseenter', handleMouseEnter);
      hero.removeEventListener('mouseleave', handleMouseLeave);
      if (typingRef.current)
        clearTimeout(typingRef.current);
      if (tooltipTimeoutRef.current)
        clearTimeout(tooltipTimeoutRef.current);
    };
  }, [isDrawing, startPoint]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation onNavigate={navigationCallbacks} />
      <Fairy mousePosition={mousePosition} isActive={isFairyActive} />
      <ChatWidget />
      
      {/* Logo */}
      <div className="logo-container">
        <div className="logo-text">
          <span className="text-white">NEW</span>
          <span className="text-[#40E0D0]">EXCLUSIVE</span>
          <img 
            src="/polar-bear.svg" 
            alt="Logo"
            className="logo-image"
          />
        </div>
      </div>

      {/* Hero Section */}
      <div ref={heroRef} className="h-screen relative hero-section">
        <div ref={cadGridRef} className="cad-grid"></div>
        <div ref={blueprintLinesRef} className="blueprint-lines"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center text-white px-4 hero-content">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 select-none"></h1>
            <p className="text-xl md:text-2xl mb-16 opacity-90">
              Crafting spaces that define tomorrow
            </p>
          </div>
          <button 
            onClick={scrollToServices}
            className="hero-button text-white rounded-full text-sm font-semibold px-6 py-2 mt-20 z-50"
          >
            
            Explore Our Services
          </button>
        </div>
        {/* Clear Design Button */}
        <button
          onClick={clearDesign}
          className="absolute bottom-8 left-8 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 text-blue-300 px-6 py-3 rounded-lg font-mono text-sm hover:bg-blue-500/30 transition-all duration-300 z-10"
        >
          Clear Design
        </button>
        {/* Clear Message */}
        {clearMessage && (
          <div className="absolute bottom-24 left-8 text-blue-300 font-mono text-sm z-10">
            {clearMessage}
          </div>
        )}
      </div>

      {/* Our Legacy Section */}
      <div ref={legacyRef} className="py-20 px-4 md:px-8 bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGM0LjQxOCAwIDgtMy41ODIgOC04cy0zLjU4Mi04LTgtOC04IDMuNTgyLTggOCAzLjU4MiA4IDggOHoiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-5"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-8 text-white">Our Legacy</h2>
          <div className="relative">
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#40E0D0]/0 via-[#40E0D0] to-[#40E0D0]/0"></div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Backed by 25+ years of industry expertise, New Exclusive has established itself as a trusted leader in acrylic works and architectural solutions across the Arabian Gulf, especially in the UAE. Our journey began with a focus on high-quality acrylic installations, including pool walls, windows, and floors, and has since expanded to encompass expert swimming pool construction, metal fabrication, fiberglass works, and complete fit-out services. With a commitment to precision, innovation, and craftsmanship, we deliver bespoke solutions that seamlessly blend artistry with durability. Whether it's custom fabrications, large-scale architectural projects, or high-end interior transformations, we exceed expectations by redefining luxury and functionality.
            </p>
            <div className="absolute -right-4 top-0 w-1 h-full bg-gradient-to-b from-[#40E0D0]/0 via-[#40E0D0] to-[#40E0D0]/0"></div>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#40E0D0] mb-2">25+</div>
              <div className="text-gray-400">Years of Excellence</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#40E0D0] mb-2">500+</div>
              <div className="text-gray-400">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#40E0D0] mb-2">100%</div>
              <div className="text-gray-400">Client Satisfaction</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Services Section */}
      <div ref={servicesRef} className="py-20 px-4 md:px-8 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGM0LjQxOCAwIDgtMy41ODIgOC04cy0zLjU4Mi04LTgtOC04IDMuNTgyLTggOCAzLjU4MiA4IDggOHoiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-5"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Tilt
                key={index}
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
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative group"
                >
                  <div className="relative overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-6 h-full transition-all duration-300 hover:border-[#40E0D0]/50">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#40E0D0]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <service.icon className="w-12 h-12 text-[#40E0D0] mb-4" />
                      <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-[#40E0D0] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {service.description}
                      </p>
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#40E0D0]/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </div>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Our Clients Section */}
      <div ref={clientsRef} className="py-20 px-4 md:px-8 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGM0LjQxOCAwIDgtMy41ODIgOC04cy0zLjU4Mi04LTgtOC04IDMuNTgyLTggOCAzLjU4MiA4IDggOHoiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-5"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-4 text-white">Our Trusted Clients</h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            We're proud to work with industry leaders who trust us to deliver exceptional quality and innovation.
          </p>
          <div 
            ref={carouselRef}
            className="client-carousel"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
          >
            <div className="client-carousel-inner">
              {duplicatedClients.map((client, index) => (
                <motion.div
                  key={index}
                  className="client-logo w-48 h-48 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-20 w-auto object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Portfolio Section */}
      <div ref={portfolioRef} className="py-20 px-4 md:px-8 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGM0LjQxOCAwIDgtMy41ODIgOC04cy0zLjU4Mi04LTgtOC04IDMuNTgyLTggOCAzLjU4MiA4IDggOHoiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-5"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Our Portfolio</h2>
          <PortfolioCarousel images={portfolioImages} />
        </motion.div>
      </div>

      {/* Contact Section */}
      <div ref={contactRef} className="py-20 px-4 md:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Get in Touch</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Ready to start your project? Contact us today for a consultation and let's bring your vision to life.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
            >
              <Phone className="w-8 h-8 text-[#40E0D0] mb-4" />
              <h3 className="text-white text-xl font-semibold mb-2">Phone</h3>
              <a href="tel:+97143962562" className="text-gray-400 hover:text-[#40E0D0] transition-colors">+971 4 396 2562</a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
            >
              <Mail className="w-8 h-8 text-[#40E0D0] mb-4" />
              <h3 className="text-white text-xl font-semibold mb-2">Email</h3>
              <a href="mailto:info@new-exclusive.com" className="text-gray-400 hover:text-[#40E0D0] transition-colors">info@new-exclusive.com</a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
            >
              <MapPin className="w-8 h-8 text-[#40E0D0] mb-4" />
              <h3 className="text-white text-xl font-semibold mb-2">Location</h3>
              <a 
                href="https://www.google.com/maps?q=25.0033095240547,55.1171323181796" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#40E0D0] transition-colors"
              >
                View on Google Maps
              </a>
            </motion.div>
          </div>
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-semibold text-white mb-6">Where to Find Us on Social Media</h3>
            <div className="flex justify-center gap-6">
              <a 
                href="https://www.instagram.com/ne_decordesign_fitout_dubai/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-[#40E0D0] transition-colors transform hover:scale-110 duration-300"
              >
                <Instagram className="w-8 h-8" />
              </a>
              <a 
                href="https://www.tiktok.com/@new.exclusive.dubai" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-[#40E0D0] transition-colors transform hover:scale-110 duration-300"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-8 h-8" 
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61553242498001" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-[#40E0D0] transition-colors transform hover:scale-110 duration-300"
              >
                <Facebook className="w-8 h-8" />
              </a>
              <a 
                href="https://youtube.com/@newexclusive21?si=RQlCbqFJmCXF3_J3" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-[#40E0D0] transition-colors transform hover:scale-110 duration-300"
              >
                <Youtube className="w-8 h-8" />
              </a>
              <a 
                href="https://www.linkedin.com/company/new-exclusive-decoration-design-fit-out-llc/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-[#40E0D0] transition-colors transform hover:scale-110 duration-300"
              >
                <Linkedin className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-950 text-gray-400 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <img 
              src="https://i.ibb.co/vx5HLjQw/NE-New-Logo-1-2.png" 
              alt="NEW EXCLUSIVE Logo" 
              className="h-24 w-auto mr-3"
            />
            <p className="text-sm">
              © {new Date().getFullYear()} NEW EXCLUSIVE. All rights reserved.
            </p>
          </div>
          <div className="flex gap-8 text-sm">
            <a href="#" className="hover:text-[#40E0D0] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#40E0D0] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#40E0D0] transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;