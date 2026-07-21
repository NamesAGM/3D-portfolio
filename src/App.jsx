import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar.jsx';
import Hero from './sections/Hero';
import About from './sections/About.jsx';
import Projects from './sections/Projects.jsx';
import ContactModal from './components/ContactModal.jsx';

const App = () => {
  const [currentSection, setCurrentSection] = useState('hero');
  // THEME TOGGLE STATE — ROLLBACK: delete this line and remove theme props below
  const [theme, setTheme] = useState('dark');
  const [isContactOpen, setIsContactOpen] = useState(false);

  const getTranslateX = () => {
    switch (currentSection) {
      case 'hero': return 'translateX(0%)';
      case 'about': return 'translateX(-100vw)';
      case 'projects': return 'translateX(-200vw)';
      default: return 'translateX(0%)';
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white">
      {/* DYNAMIC NAVBAR - Now receives state to avoid hash jumping */}
      <div className="absolute top-0 z-50 w-full pointer-events-auto">
         <NavBar 
           currentSection={currentSection} 
           setCurrentSection={setCurrentSection} 
           theme={theme} 
           setTheme={setTheme} 
           onOpenContact={() => setIsContactOpen(true)}
         />
      </div>
      
      {/* HORIZONTAL SLIDER TRACK — ROLLBACK: DELETE THIS LINE to revert to vertical stack */}
      <div 
        className="flex w-[300vw] h-full transition-transform duration-700 ease-in-out"
        style={{ transform: getTranslateX() }}
      >
        {/* PAGE 1: HERO */}
        <div className="w-screen h-screen overflow-y-auto overflow-x-hidden relative">
          <Hero setCurrentSection={setCurrentSection} />
        </div>

        {/* PAGE 2: ABOUT */}
        {/* The bg-* wrapper class here is driven by theme for smooth frame-level bg transition */}
        <div className={`w-screen h-screen overflow-y-auto overflow-x-hidden relative transition-colors duration-500 ${theme === 'dark' ? 'bg-[#030303]' : 'bg-zinc-50'}`}>
          <About theme={theme} setCurrentSection={setCurrentSection} />
        </div>

        {/* PAGE 3: PROJECTS */}
        <div className={`w-screen h-screen overflow-y-auto overflow-x-hidden relative transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-zinc-50'}`}>
           <Projects theme={theme} setCurrentSection={setCurrentSection} />
        </div>
      </div>{/* ROLLBACK: DELETE THIS LINE (closing tag of slider track) */}

      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
        theme={theme} 
      />
    </div>
  );
};

export default App;