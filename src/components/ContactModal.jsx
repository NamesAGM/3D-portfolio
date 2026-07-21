import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const ContactModal = ({ isOpen, onClose, theme }) => {
  const isDark = theme === 'dark';
  
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Project Inquiry', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

  useEffect(() => {
    if (!isOpen) return;

    // Reset status when opened
    if (status !== 'idle') setStatus('idle');

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent empty submissions
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: 'Project Inquiry', message: '' });
        // Optionally close after a delay
        setTimeout(() => {
          if (isOpen) onClose();
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  const bg = isDark ? 'bg-[#0d0d0d] border-zinc-800' : 'bg-white border-zinc-200';
  const text = isDark ? 'text-white' : 'text-zinc-900';
  const muted = isDark ? 'text-zinc-400' : 'text-zinc-500';
  const inputBg = isDark ? 'bg-zinc-900/50 border-zinc-800 text-white placeholder-zinc-500 focus:border-blue-500/50 focus:bg-zinc-800' : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-blue-500/50 focus:bg-white';
  const divider = isDark ? 'border-zinc-800' : 'border-zinc-200';

  const modalContent = (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 transition-opacity duration-300"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className={`relative w-full max-w-2xl overflow-hidden rounded-2xl border shadow-2xl ${bg}`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between px-6 md:px-8 py-5 border-b ${divider}`}>
          <h2 className={`text-xl font-bold tracking-wide ${text}`}>Send a Message</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white' : 'hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 md:p-8">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
              <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${text}`}>Message Sent!</h3>
              <p className={muted}>Thanks for reaching out. I'll get back to you shortly.</p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={`text-xs font-semibold tracking-wide uppercase ${muted}`}>Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200 ${inputBg}`}
                  />
                </div>
                <div className="space-y-2">
                  <label className={`text-xs font-semibold tracking-wide uppercase ${muted}`}>Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200 ${inputBg}`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className={`text-xs font-semibold tracking-wide uppercase ${muted}`}>Subject</label>
                <select 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border outline-none appearance-none transition-all duration-200 ${inputBg}`}
                >
                  <option value="Project Inquiry">Project Inquiry</option>
                  <option value="Freelance Opportunity">Freelance Opportunity</option>
                  <option value="General Question">General Question</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className={`text-xs font-semibold tracking-wide uppercase ${muted}`}>Message</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Tell me about your project or inquiry..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border outline-none resize-none transition-all duration-200 ${inputBg}`}
                ></textarea>
              </div>

              {/* Error message */}
              {status === 'error' && (
                <p className="text-red-500 text-sm font-medium">Failed to send message. Please try again.</p>
              )}

              {/* Footer row */}
              <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  <span className={`text-xs font-medium tracking-wide ${muted}`}>Expected response time: Under 12 hours.</span>
                </div>
                
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`w-full md:w-auto px-8 py-3.5 rounded-xl text-sm font-bold tracking-widest uppercase transition-all duration-200 ${
                    status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
                  } ${
                    isDark
                      ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                  }`}
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message →'}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ContactModal;
