import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  onNavigate: {
    about: () => void;
    services: () => void;
    portfolio: () => void;
    clients: () => void;
    team: () => void;
    contact: () => void;
  };
}

const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'About', onClick: onNavigate.about },
    { label: 'Services', onClick: onNavigate.services },
    { label: 'Projects', onClick: onNavigate.portfolio },
    { label: 'Clients', onClick: onNavigate.clients },
    { label: 'Meet the Team', onClick: onNavigate.team },
    { label: 'Contact Us', onClick: onNavigate.contact },
  ];

  const handleMenuClick = (callback: () => void) => {
    setIsOpen(false);
    callback();
  };

  return (
    <div className="fixed top-0 right-0 z-[9999] p-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-[9999] bg-gray-900/80 backdrop-blur-sm text-white p-3 rounded-full hover:bg-gray-800 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-20 right-4 w-64 bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl overflow-hidden z-[9999]"
            >
              <div className="py-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleMenuClick(item.onClick)}
                    className="w-full px-6 py-3 text-left text-white hover:bg-[#40E0D0]/10 hover:text-[#40E0D0] transition-colors flex items-center gap-2"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navigation;