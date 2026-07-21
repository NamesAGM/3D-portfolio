import React, { useState } from 'react';
import Footer from '../components/Footer.jsx';

/* ============================================================================
   HOW TO ROLLBACK (Under 60 Seconds):
   1. Delete this entire file: src/sections/About.jsx
   2. In App.jsx, remove the line:  import About from './sections/About.jsx';
   3. In App.jsx, replace the <About /> slot div with a placeholder or remove it.
   That's it. Your Hero and slider structure remain completely untouched.
   ============================================================================ */

// ---------------------------------------------------------------------------
// ALL DATA LIVES HERE — fully self-contained, no external constants needed
// ---------------------------------------------------------------------------
const techCategories = [
  {
    category: 'Languages',
    items: [
      {
        name: 'TypeScript',
        metrics: [1, 1, 1, 1, 0],
        duration: '3+ Years',
        scope: 'Strongly-typed application logic, scalable codebases, and API contract enforcement across frontend and backend systems.',
      },
      {
        name: 'JavaScript',
        metrics: [1, 1, 1, 1, 1],
        duration: '5+ Years',
        scope: 'Core scripting language for interactive web UIs, server-side logic, automation tooling, and rapid prototyping.',
      },
      {
        name: 'C++',
        metrics: [1, 1, 0, 0, 0],
        duration: '2+ Years',
        scope: 'Systems-level programming, algorithmic problem solving, and foundational data structure implementations.',
      },
      {
        name: 'Java',
        metrics: [1, 1, 1, 0, 0],
        duration: '2+ Years',
        scope: 'Object-oriented application development, Android fundamentals, and enterprise backend architecture.',
      },
      {
        name: 'Python',
        metrics: [1, 1, 1, 1, 0],
        duration: '4+ Years',
        scope: 'Scripting, data analysis, AI/ML model prototyping, and backend automation pipelines.',
      },
      {
        name: 'SQL',
        metrics: [1, 1, 1, 0, 0],
        duration: '3+ Years',
        scope: 'Relational database design, complex query optimization, and data integrity management.',
      },
      {
        name: 'HTML5 / CSS3',
        metrics: [1, 1, 1, 1, 1],
        duration: '5+ Years',
        scope: 'Semantic markup, responsive layouts, CSS Grid/Flexbox architectures, and modern animation systems.',
      },
    ],
  },
  {
    category: 'Frontend',
    items: [
      {
        name: 'React',
        metrics: [1, 1, 1, 1, 1],
        duration: '4+ Years',
        scope: 'Component-driven UI architecture, state management patterns, and high-performance single-page applications.',
      },
      {
        name: 'Tailwind CSS v4',
        metrics: [1, 1, 1, 1, 0],
        duration: '3+ Years',
        scope: 'Utility-first styling, design system tokenization, and rapid UI prototyping with zero-config builds.',
      },
      {
        name: 'Next.js',
        metrics: [1, 1, 1, 0, 0],
        duration: '2+ Years',
        scope: 'Server-side rendering, static site generation, API routes, and full-stack React framework development.',
      },
      {
        name: 'Framer Motion',
        metrics: [1, 1, 1, 0, 0],
        duration: '2+ Years',
        scope: 'Declarative animations, gesture-based interactions, and layout transition orchestration in React.',
      },
      {
        name: 'Redux / Zustand',
        metrics: [1, 1, 1, 0, 0],
        duration: '3+ Years',
        scope: 'Global state management, predictable state containers, and lightweight reactive stores.',
      },
    ],
  },
  {
    category: 'Backend',
    items: [
      {
        name: 'Node.js',
        metrics: [1, 1, 1, 1, 0],
        duration: '4+ Years',
        scope: 'Event-driven server architectures, real-time applications, and scalable microservice backends.',
      },
      {
        name: 'Express.js',
        metrics: [1, 1, 1, 1, 0],
        duration: '4+ Years',
        scope: 'RESTful API design, middleware pipelines, authentication layers, and route management.',
      },
      {
        name: 'PostgreSQL',
        metrics: [1, 1, 1, 0, 0],
        duration: '2+ Years',
        scope: 'Advanced relational modeling, JSON operations, and enterprise-grade transactional databases.',
      },
      {
        name: 'MongoDB',
        metrics: [1, 1, 1, 0, 0],
        duration: '3+ Years',
        scope: 'NoSQL document stores, flexible schema design, and aggregation pipeline operations.',
      },
      {
        name: 'Supabase',
        metrics: [1, 1, 0, 0, 0],
        duration: '1+ Year',
        scope: 'Open-source Firebase alternative with real-time subscriptions, auth, and Postgres-backed storage.',
      },
      {
        name: 'RESTful APIs',
        metrics: [1, 1, 1, 1, 0],
        duration: '4+ Years',
        scope: 'Stateless endpoint architecture, HTTP verb semantics, pagination, and versioned API contracts.',
      },
      {
        name: 'GraphQL',
        metrics: [1, 1, 0, 0, 0],
        duration: '1+ Year',
        scope: 'Declarative data fetching, schema-first design, and efficient query resolution for complex data graphs.',
      },
    ],
  },
  {
    category: 'Video & Motion',
    items: [
      {
        name: 'Adobe Premiere Pro',
        metrics: [1, 1, 1, 1, 0],
        duration: '3+ Years',
        scope: 'Professional video editing, color grading, multi-track audio mixing, and export pipeline optimization.',
      },
      {
        name: 'After Effects',
        metrics: [1, 1, 1, 0, 0],
        duration: '2+ Years',
        scope: 'Motion graphics, visual effects compositing, kinetic typography, and broadcast-ready animations.',
      },
      {
        name: 'CapCut',
        metrics: [1, 1, 1, 0, 0],
        duration: '2+ Years',
        scope: 'Rapid social media content editing, trending template workflows, and mobile-first video production.',
      },
      {
        name: 'Clipchamp',
        metrics: [1, 1, 0, 0, 0],
        duration: '1+ Year',
        scope: 'Browser-based video editing, quick screen recordings, and lightweight content creation.',
      },
    ],
  },
  {
    category: 'UI / Design',
    items: [
      {
        name: 'Figma',
        metrics: [1, 1, 1, 1, 0],
        duration: '3+ Years',
        scope: 'Collaborative interface design, interactive prototyping, design system creation, and developer handoff.',
      },
      {
        name: 'Adobe Photoshop',
        metrics: [1, 1, 1, 0, 0],
        duration: '3+ Years',
        scope: 'Photo manipulation, digital asset creation, texture work, and high-fidelity mockup production.',
      },
      {
        name: 'Canva',
        metrics: [1, 1, 0, 0, 0],
        duration: '2+ Years',
        scope: 'Rapid brand asset creation, social media graphics, presentation design, and template-based workflows.',
      },
    ],
  },
  {
    category: 'Tools & DevOps',
    items: [
      {
        name: 'Git & GitHub',
        metrics: [1, 1, 1, 1, 1],
        duration: '5+ Years',
        scope: 'Version control mastery, branching strategies, pull request workflows, and open-source collaboration.',
      },
      {
        name: 'Docker',
        metrics: [1, 1, 0, 0, 0],
        duration: '1+ Year',
        scope: 'Containerized development environments, image orchestration, and reproducible deployment pipelines.',
      },
      {
        name: 'Vite',
        metrics: [1, 1, 1, 1, 0],
        duration: '3+ Years',
        scope: 'Lightning-fast HMR dev server, optimized production bundling, and modern ES module builds.',
      },
      {
        name: 'Firebase / Firestore',
        metrics: [1, 1, 1, 0, 0],
        duration: '2+ Years',
        scope: 'Serverless backend services, real-time database synchronization, authentication, and cloud functions.',
      },
    ],
  },
];

// Flatten all items for quick lookup and set a global default
const allItems = techCategories.flatMap((cat) =>
  cat.items.map((item) => ({ ...item, category: cat.category }))
);

// ---------------------------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------------------------
const About = ({ theme = 'dark', setCurrentSection }) => {
  const [activeTool, setActiveTool] = useState(allItems[0]);
  const isDark = theme === 'dark';

  return (
    <section
      id="about"
      className={`w-full min-h-screen flex flex-col justify-center transition-colors duration-500 ${isDark ? 'bg-black text-white' : 'bg-zinc-50 text-zinc-900'}`}
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* ================================================================
            SUB-SECTION A: HERO INTRO
            ================================================================ */}
        <div className="w-full pt-32 pb-24 px-5 md:px-20 flex flex-col gap-16 lg:gap-20">
          {/* Top — Bold Statement (Left aligned, wide) */}
          <div className="w-full lg:w-[85%]">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              I'm a{' '}
              <span className={isDark ? 'text-blue-400' : 'text-blue-600'}>Full-Stack Developer</span>,{' '}
              <span className={isDark ? 'text-blue-400' : 'text-blue-600'}>AI Engineer</span>, and{' '}
              <span className={isDark ? 'text-blue-400' : 'text-blue-600'}>UI/UX Designer</span>{' '}
              Building the next generation of the web through intelligent engineering and intuitive design.
            </h1>
          </div>

          {/* Bottom Right — Philosophy + CTA */}
          <div className="w-full flex lg:justify-end">
            <div className="w-full md:w-2/3 lg:w-[40%] flex flex-col lg:items-end text-left lg:text-right gap-6">
              <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Combining speed, scalability, and design precision is my standard.
                I bridge clean full-stack engineering with modern AI models
                execution, and the kind of obsessive attention to detail to build 
                web applications that are as powerful under the hood as they are effortless
                on the surface. For me, true quality means zero friction for the end user.
              </p>
              <button
                onClick={() => setCurrentSection && setCurrentSection('projects')}
                className={`uppercase tracking-widest text-xs font-bold px-8 py-3.5 rounded-full border transition-all duration-300 ${
                  isDark
                    ? 'border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 hover:bg-zinc-800'
                    : 'border-zinc-300 text-zinc-700 hover:text-zinc-900 hover:border-zinc-500 hover:bg-zinc-100'
                }`}
              >
                SEE MY WORK
              </button>
            </div>
          </div>
        </div>

        {/* ================================================================
            SUB-SECTION B: TECHNICAL STACK GRID
            ================================================================ */}
        <div className="w-full px-5 md:px-20 pb-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-6 mb-10">
          <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            Technical Stack
          </h2>
          <span className={`text-sm md:text-base pb-1 ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
            / Tools, frameworks & systems I deploy daily
          </span>
        </div>

        {/* Main Grid: 2/3 left + 1/3 right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT / CENTER — Category Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {techCategories.map((cat) => (
              <div
                key={cat.category}
                className={`backdrop-blur-md rounded-2xl p-5 flex flex-col border transition-colors duration-500 ${
                  isDark
                    ? 'bg-zinc-900/40 border-zinc-800/60'
                    : 'bg-white border-zinc-200 shadow-md'
                }`}
              >
                {/* Category Title */}
                <h3 className={`text-lg font-semibold mb-3 tracking-wide ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                  {cat.category}
                </h3>

                {/* Individual Clickable Rows */}
                <div className="flex flex-col gap-1.5">
                  {cat.items.map((item) => {
                    const isActive = activeTool.name === item.name;
                    return (
                      <button
                        key={item.name}
                        onClick={() =>
                          setActiveTool({ ...item, category: cat.category })
                        }
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                          isActive
                            ? isDark
                              ? 'text-blue-300 bg-blue-950/40 border border-blue-800/50 shadow-[0_0_15px_rgba(147,197,253,0.1)]'
                              : 'text-blue-700 bg-blue-50 border border-blue-200 shadow-sm'
                            : isDark
                              ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/50 border border-transparent'
                              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 border border-transparent'
                        }`}
                      >
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — Sticky Expertise Vector */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28">
              <div className={`backdrop-blur-md rounded-2xl p-6 flex flex-col min-h-[420px] border transition-colors duration-500 ${
                  isDark ? 'bg-zinc-900/40 border-zinc-800/60' : 'bg-white border-zinc-200 shadow-md'
                }`}>
                {/* Header Label */}
                <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-600 mb-4 font-semibold">
                  Expertise Vector
                </span>

                {/* Active Tool Title */}
                <h2 className={`text-2xl font-bold mb-1 ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                  {activeTool.name}
                </h2>
                <span className={`text-xs mb-6 ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                  {activeTool.category}
                </span>

                {/* 5-Block Competency Metric */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-zinc-500 uppercase tracking-widest">
                      Competency
                    </span>
                    <span className={`text-xs font-semibold ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                      {activeTool.metrics.filter((m) => m === 1).length} / 5
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    {activeTool.metrics.map((active, idx) => (
                      <div
                        key={idx}
                        className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                          active
                            ? isDark
                              ? 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.4)]'
                              : 'bg-blue-600'
                            : isDark ? 'bg-zinc-800' : 'bg-zinc-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Duration Vector */}
                <div className={`flex items-center justify-between mb-6 py-3 px-4 rounded-xl border transition-colors duration-500 ${
                  isDark ? 'bg-zinc-800/40 border-zinc-700/30' : 'bg-zinc-100 border-zinc-200'
                }`}>
                  <span className={`text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                    Duration Vector
                  </span>
                  <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                    {activeTool.duration}
                  </span>
                </div>

                {/* Application Scope */}
                <div className="mt-auto">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-600 mb-2 block font-semibold">
                    Application Scope
                  </span>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {activeTool.scope}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      <Footer theme={theme} />
    </section>
  );
};

export default About;
