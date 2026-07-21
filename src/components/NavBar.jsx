import React, { useState } from 'react';
import { navLinks } from '../constants';

const NavBar = ({ currentSection, setCurrentSection, theme, setTheme, onOpenContact }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const isHero     = currentSection === 'hero' || currentSection === 'home';
  const isDark     = theme === 'dark';
  const useLightNav = !isHero && !isDark;

  const navBgClass = isHero
    ? 'md:top-10 top-0 bg-transparent'
    : isDark
      ? 'top-0 bg-black/80 backdrop-blur-md border-b border-zinc-800/50'
      : 'top-0 bg-white/90 backdrop-blur-md border-b border-zinc-200';

  const textClass     = useLightNav ? 'text-zinc-950'  : 'text-white';
  const linkTextClass = useLightNav ? 'text-zinc-600 hover:text-zinc-950' : 'text-zinc-300 hover:text-white';
  const underlineClass = useLightNav ? 'bg-zinc-950' : 'bg-white';

  // Mobile drawer background
  const drawerBg = isDark ? 'bg-black/95 border-zinc-800' : 'bg-white/95 border-zinc-200';
  const drawerLinkClass = useLightNav ? 'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100' : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60';

  const navigate = (target) => {
    setCurrentSection && setCurrentSection(target);
    setMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed w-full left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ease-in-out py-2 ${navBgClass}`}>
        <div className="mx-auto flex items-center justify-between px-5 md:px-20">

          {/* Logo */}
          <button
            className={`${textClass} text-xl md:text-2xl font-semibold transition-transform duration-300 hover:scale-105`}
            onClick={() => navigate('hero')}
          >
            Michael | AGM
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex space-x-8">
              {navLinks.map(({ link, name }) => {
                let target = link.replace('#', '').toLowerCase();
                if (target === 'home') target = 'hero';
                return (
                  <li key={name} className="relative group">
                    <button
                      onClick={() => navigate(target)}
                      className={`cursor-pointer ${linkTextClass} transition-colors duration-300`}
                    >
                      <span>{name}</span>
                      <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${underlineClass} transition-all duration-300 group-hover:w-full`} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right actions row */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={() => setTheme && setTheme(isDark ? 'light' : 'dark')}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 cursor-pointer ${
                isDark
                  ? 'border-zinc-700 bg-zinc-900/60 text-yellow-300 hover:border-yellow-400/50 hover:bg-zinc-800'
                  : 'border-zinc-300 bg-white/80 text-zinc-700 hover:border-zinc-400 hover:bg-white'
              }`}
            >
              {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="4"/>
                  <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>
                </svg>
              )}
            </button>

            {/* Contact button — desktop only */}
            <button
              onClick={() => {
                setMenuOpen(false);
                onOpenContact && onOpenContact();
              }}
              className={`hidden lg:block px-5 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 ${
                useLightNav ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-zinc-200'
              }`}
            >
              Contact me
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-md transition-colors ${
                isDark ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'
              }`}
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 transition-all duration-300 origin-center ${isDark ? 'bg-white' : 'bg-zinc-900'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 transition-all duration-300 ${isDark ? 'bg-white' : 'bg-zinc-900'} ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 transition-all duration-300 origin-center ${isDark ? 'bg-white' : 'bg-zinc-900'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 left-0 w-full z-[99] transition-all duration-300 ease-in-out lg:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Slide-down panel */}
        <div className={`relative border-b ${drawerBg} px-5 pt-20 pb-6 transition-transform duration-300 ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <nav>
            <ul className="flex flex-col gap-1">
              {navLinks.map(({ link, name }) => {
                let target = link.replace('#', '').toLowerCase();
                if (target === 'home') target = 'hero';
                return (
                  <li key={name}>
                    <button
                      onClick={() => navigate(target)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors duration-200 ${drawerLinkClass}`}
                    >
                      {name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile contact button */}
          <button
            onClick={() => {
              setMenuOpen(false);
              onOpenContact && onOpenContact();
            }}
            className={`w-full mt-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-colors duration-200 ${
              useLightNav ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-zinc-200'
            }`}
          >
            Contact me
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;