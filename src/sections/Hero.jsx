import { words } from '../constants/index.js'
import Button from '../components/Button'
import Spline from '@splinetool/react-spline'
import { useGSAP} from '@gsap/react';
import gsap from 'gsap';
import { useState, useEffect } from 'react';

const Hero = ({ setCurrentSection }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if device is mobile based on screen width
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        // Initial check
        checkMobile();
        
        // Listen for window resize
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useGSAP(() => {
        gsap.fromTo('.hero-text h1',
            {
                y: 50,
                opacity: 0, 
            },
            {
                y: 0,
                opacity: 1,
                stagger: 1.5,
                duration: 1,
                ease: 'power2.inOut'
            },
        ) 
    }) 

    
  return (
    <section id="hero" className="relative overflow-hidden">
        <div className="absolute top-0 left-0 z-10">
          <img src="/images/bg.png" alt="background" />   
        </div>

        <div className="hero-layout">
            {/*LEft: HERO CONTENT */}
            <header className="flex flex-col justify-center md: w-screen md:px-20 px-5">
               <div className="flex flex-col gap-7 max-w-xl lg:max-w-2xl">
                   <div className="hero-text">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                        Engineering
                        <span className="slide nline-flex h-[1.2em] overflow-hidden relative align-bottom select-none">
                            <span className="wrapper flex flex-col">
                                {words.map((word, index) => (
                                <span key={index} className="flex items-center md:gap-3 gap-1 pb-2">
                                    <img
                                      src={word.imgPath}
                                      alt={word.text}
                                      className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                                    />

                                    <span>{word.text}</span>
                                    </span>


                                ))}
                            </span>

                        </span>

                    </h1>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                        into smart, full-stack ecosystems
                    </h1>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                        that delivers results built for the future of technology.
                    </h1>
                   </div> 
                    <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
                        Hi, I'm Michael, a full stacked developer, AI engineer with a passion for coding and learning.
                    </p>  
                    <Button
                      className="md:w-80 md:h-16 w-60 h-12"
                      id="button"
                      text="See my Work"
                    />
                </div>

            </header>
            {/*RIGHT: 3D MODEL */}
            <div className="hero-3d-layout">
                {!isMobile && (
                    <Spline scene="https://prod.spline.design/yjBMOTJem7zwpiRy/scene.splinecode" />
                )}
            </div>
        </div>
    </section> 
  );
};

export default Hero