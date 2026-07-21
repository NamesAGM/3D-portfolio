import React from 'react';
import { socialImgs } from '../constants';

const Footer = ({ theme }) => {
  const isDark = theme === 'dark';
  const bg = isDark ? 'bg-[#050505] border-t border-zinc-800' : 'bg-zinc-100 border-t border-zinc-200';
  const text = isDark ? 'text-zinc-400' : 'text-zinc-600';
  const hoverText = isDark ? 'hover:text-white' : 'hover:text-zinc-900';
  
  return (
    <footer className={`w-full py-8 px-5 md:px-20 mt-auto transition-colors duration-500 ${bg}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Copyright */}
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium tracking-wide ${text}`}>
            © {new Date().getFullYear()} Michael | AGM. All rights reserved.
          </span>
        </div>

        {/* Center/Right: Social Links */}
        <div className="flex items-center gap-5">
          {socialImgs.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-200 ${text} ${hoverText}`}
            >
              <img 
                src={social.imgPath} 
                alt={social.name} 
                className={`w-5 h-5 object-contain ${isDark ? 'brightness-150 grayscale' : 'brightness-0 opacity-70'}`}
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
