import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Footer from '../components/Footer.jsx';

/* ============================================================================
   HOW TO INTEGRATE / ROLLBACK (Under 60 Seconds):
   TO INTEGRATE:
   1. In App.jsx: import Projects from './sections/Projects.jsx';
   2. Render:     <Projects theme={theme} setCurrentSection={setCurrentSection} />
   TO ROLLBACK:
   1. Delete import line above.
   2. Remove <Projects /> element.
   ============================================================================ */

const GITHUB_PROFILE_URL = 'https://github.com/NamesAGM';

// ---------------------------------------------------------------------------
// PROJECT DATA
// ---------------------------------------------------------------------------
const projectsData = [
  {
    id: 'audio-ai',
    title: 'AudioAI',
    tagline: 'Transform your documents into natural-sounding speech.',
    category: 'AI / Full-Stack',
    description:
      'AudioAI is a full-stack SaaS application that converts PDF documents into high-quality audio using AI-powered text-to-speech synthesis. It supports multiple voice profiles, adjustable reading speeds, and an integrated Gemini-powered chat interface to ask questions about any uploaded document.',
    tech: ['Next.js', 'TypeScript', 'Gemini API', 'Supabase', 'PostgreSQL', 'Vercel', 'Edge TTS'],
    role: 'Full-Stack Developer & AI Engineer',
    location: 'Remote · Deployed on Vercel',
    liveUrl: 'https://audio-ai-peach.vercel.app',
    githubUrl: `${GITHUB_PROFILE_URL}/audio-ai`,
    thumbnail: '/images/projects/audioai-login.png',
    gallery: [
      { src: '/images/projects/audioai-login.png',       caption: 'Authentication Screen'    },
      { src: '/images/projects/audioai-studio.png',      caption: 'AudioAI Studio Dashboard' },
      { src: '/images/projects/audioai-conversions.png', caption: 'Conversions & Playback'   },
    ],
    highlights: [
      'Multi-voice TTS synthesis supporting Edge, Neural, and Premium voice profiles.',
      'Real-time audio playback with speed controls (0.75x → 1.5x).',
      'Gemini AI chat sidebar for contextual PDF Q&A with auto-read answers.',
      'Secure user auth and per-user conversion history backed by Supabase.',
      'Drag-and-drop PDF ingestion with server-side processing and progress tracking.',
    ],
  },
  {
    id: 'attendance-101',
    title: 'Attendance 101',
    tagline: 'Class attendance, made simple.',
    category: 'Full-Stack · EdTech',
    description:
      'Attendance 101 is a real-time campus attendance management platform built for Lead City University. Lecturers start a session and generate a live code; students authenticate and check in while class is in session. The system enforces strict time-gating — attendance only registers during active sessions — and produces exportable attendance reports.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
    role: 'Full-Stack Developer',
    location: 'Remote · Lead City University',
    liveUrl: 'https://attendance-lhs-three-32.vercel.app',
    githubUrl: `${GITHUB_PROFILE_URL}/attendance-101`,
    thumbnail: '/images/projects/attendance101.png',
    gallery: [
      { src: '/images/projects/attendance101.png', caption: 'Landing Page — LCU Portal' },
    ],
    highlights: [
      'Time-gated attendance: sign-ins only accepted while a session is live.',
      'Dual access flows — Staff dashboard and Student self-registration.',
      'Real-time session state management via Supabase realtime channels.',
      'Auto-generated reports exportable as CSV for each lecture session.',
      'Mobile-first responsive design built for on-campus phone sign-ins.',
    ],
  },
];

// ---------------------------------------------------------------------------
// MODAL — rendered via React Portal directly onto document.body
// This bypasses the CSS transform stacking context of the slider so the
// modal always appears correctly over the full viewport.
// ---------------------------------------------------------------------------
const ProjectModal = ({ project, onClose, isDark }) => {
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const bg       = isDark ? 'bg-[#0d0d0d] border-zinc-800'  : 'bg-white border-zinc-200';
  const text     = isDark ? 'text-white'                     : 'text-zinc-900';
  const muted    = isDark ? 'text-zinc-400'                  : 'text-zinc-500';
  const pill     = isDark ? 'bg-zinc-800 text-zinc-300'      : 'bg-zinc-100 text-zinc-700';
  const divider  = isDark ? 'border-zinc-800'                : 'border-zinc-200';
  const metaBg   = isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200';

  const modal = (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 99999 }}
      className="flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className={`relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl border shadow-2xl ${bg}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-colors ${
            isDark ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white'
                   : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900'
          }`}
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 md:p-10">
          {/* Hero image */}
          <div className="w-full rounded-xl overflow-hidden mb-4 bg-zinc-950 aspect-video">
            <img
              src={project.gallery[activeImg].src}
              alt={project.gallery[activeImg].caption}
              className="w-full h-full object-cover object-top transition-all duration-300"
            />
          </div>

          {/* Thumbnail strip */}
          {project.gallery.length > 1 && (
            <div className="flex gap-3 mb-8 overflow-x-auto pb-1">
              {project.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    activeImg === i ? 'border-blue-500 opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={img.src} alt={img.caption} className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          )}

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <span className={`text-xs font-bold tracking-widest uppercase block mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                {project.category}
              </span>
              <h2 className={`text-3xl md:text-4xl font-bold ${text}`}>{project.title}</h2>
              <p className={`mt-2 text-base ${muted}`}>{project.tagline}</p>
            </div>
            <div className="flex gap-3 flex-shrink-0 flex-wrap">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
                  isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-zinc-900 text-white hover:bg-zinc-700'
                }`}>
                View Live
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase border transition-all duration-200 ${
                  isDark ? 'border-zinc-700 text-white hover:bg-zinc-800' : 'border-zinc-300 text-zinc-900 hover:bg-zinc-100'
                }`}>
                GitHub
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                </svg>
              </a>
            </div>
          </div>

          <div className={`border-t ${divider} my-6`} />

          {/* Meta grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl border mb-8 ${metaBg}`}>
            {[
              { label: 'Role',     value: project.role },
              { label: 'Stack',    value: project.tech.slice(0, 3).join(' · ') },
              { label: 'Location', value: project.location },
            ].map(({ label, value }) => (
              <div key={label}>
                <span className={`text-[10px] uppercase tracking-widest font-bold block mb-1 ${muted}`}>{label}</span>
                <span className={`text-xs font-medium ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>{value}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h4 className={`text-[10px] uppercase tracking-widest font-bold mb-3 ${muted}`}>About This Project</h4>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>{project.description}</p>
          </div>

          {/* Tech stack */}
          <div className="mb-8">
            <h4 className={`text-[10px] uppercase tracking-widest font-bold mb-3 ${muted}`}>Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className={`text-xs px-3 py-1.5 rounded-full font-medium ${pill}`}>{t}</span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-8">
            <h4 className={`text-[10px] uppercase tracking-widest font-bold mb-4 ${muted}`}>Key Features & Achievements</h4>
            <ul className="space-y-3">
              {project.highlights.map((h, i) => (
                <li key={i} className={`flex items-start gap-3 text-sm ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span className="leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom actions */}
          <div className={`border-t ${divider} pt-6 flex flex-col sm:flex-row gap-3`}>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className={`flex-1 sm:flex-none text-center text-xs font-bold tracking-widest uppercase px-8 py-3.5 rounded-xl transition-colors duration-200 ${
                isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-zinc-900 text-white hover:bg-zinc-700'
              }`}>
              Visit Live Site →
            </a>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className={`flex-1 sm:flex-none text-center text-xs font-bold tracking-widest uppercase px-8 py-3.5 rounded-xl border transition-colors duration-200 ${
                isDark ? 'border-zinc-700 text-white hover:bg-zinc-800' : 'border-zinc-300 text-zinc-900 hover:bg-zinc-100'
              }`}>
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  // Render via portal — escapes the slider's transform stacking context entirely
  return createPortal(modal, document.body);
};

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------
const Projects = ({ theme = 'dark', setCurrentSection }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const isDark = theme === 'dark';

  const sectionBg = isDark ? 'bg-[#0a0a0a] text-white'       : 'bg-zinc-50 text-zinc-900';
  const cardBg    = isDark ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-600' : 'bg-white border-zinc-200 shadow-sm hover:border-zinc-400 hover:shadow-md';
  const tagBg     = isDark ? 'bg-zinc-800 text-zinc-300'      : 'bg-zinc-100 text-zinc-600';
  const muted     = isDark ? 'text-zinc-500'                  : 'text-zinc-500';
  const descColor = isDark ? 'text-zinc-400'                  : 'text-zinc-600';

  return (
    <section
      id="projects"
      className={`w-full min-h-screen flex flex-col justify-center transition-colors duration-500 ${sectionBg}`}
    >
      <div className="w-full max-w-7xl mx-auto px-5 md:px-20 py-32">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className={`text-xs font-bold tracking-[0.25em] uppercase block mb-2 ${muted}`}>
              // DEPLOYED WORK
            </span>
            <h2 className={`text-4xl md:text-5xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
              Featured Projects
            </h2>
          </div>
          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold tracking-wide border transition-all duration-200 flex-shrink-0 ${
              isDark ? 'bg-zinc-900 text-white border-zinc-800 hover:border-zinc-600' : 'bg-white text-zinc-900 border-zinc-200 hover:border-zinc-400 shadow-sm'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
            </svg>
            Explore GitHub →
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projectsData.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 ${cardBg}`}
            >
              {/* Card image */}
              <div className="relative w-full h-52 sm:h-60 overflow-hidden bg-zinc-950">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-bold tracking-widest uppercase px-4 py-2 rounded-lg bg-black/60 backdrop-blur-sm">
                    View Project →
                  </span>
                </div>
                <span className={`absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full backdrop-blur-sm ${isDark ? 'bg-black/60 text-blue-300' : 'bg-white/80 text-blue-600'}`}>
                  {project.category}
                </span>
              </div>

              {/* Card info */}
              <div className="p-5 sm:p-6">
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>{project.title}</h3>
                <p className={`text-sm leading-relaxed line-clamp-2 mb-4 ${descColor}`}>{project.tagline}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.slice(0, 4).map((t) => (
                    <span key={t} className={`text-[10px] font-medium px-2 py-1 rounded-full ${tagBg}`}>{t}</span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${tagBg}`}>+{project.tech.length - 4}</span>
                  )}
                </div>
                <div className={`flex items-center justify-between pt-4 border-t ${isDark ? 'border-zinc-800' : 'border-zinc-100'}`}>
                  <span className={`text-xs font-semibold tracking-widest uppercase ${muted}`}>Click to explore</span>
                  <div className="flex gap-2">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`p-1.5 rounded-lg transition-colors ${isDark ? 'text-zinc-500 hover:text-white hover:bg-zinc-800' : 'text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100'}`}
                      title="GitHub Repository">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                      </svg>
                    </a>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`p-1.5 rounded-lg transition-colors ${isDark ? 'text-zinc-500 hover:text-white hover:bg-zinc-800' : 'text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100'}`}
                      title="Visit Live Site">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className={`text-sm mb-4 ${muted}`}>More projects available on GitHub</p>
          <a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-sm font-bold tracking-wide px-8 py-3.5 rounded-xl border transition-all duration-200 ${
              isDark ? 'border-zinc-700 text-white hover:bg-zinc-800' : 'border-zinc-300 text-zinc-900 hover:bg-zinc-100'
            }`}>
            View All Repositories →
          </a>
        </div>
      </div>

      <Footer theme={theme} />

      {/* Modal rendered via portal to escape slider transform context */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          isDark={isDark}
        />
      )}
    </section>
  );
};

export default Projects;
