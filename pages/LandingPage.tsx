
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="relative">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] opacity-30"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-44 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-12 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] font-black text-white">System: Realix Core V4</span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-rowdies font-bold text-white mb-12 leading-[0.85] tracking-tight">
              Believe Only<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-purple-300 text-glow">The Proven.</span>
            </h1>

            <p className="max-w-2xl text-xl text-slate-400 mb-16 leading-relaxed font-light tracking-wide">
              Realix AI implements advanced neural-dissection protocols to expose high-fidelity deepfakes. In a world of synthetic reality, we are the anchor of truth.
            </p>

            <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-10">
              <Link 
                to="/analyze" 
                className="group relative px-14 py-6 bg-indigo-600 text-white rounded-full font-bold text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-600/30"
              >
                Launch Workbench
                <span className="absolute inset-0 rounded-full border border-indigo-500/50 scale-110 opacity-0 group-hover:scale-125 group-hover:opacity-100 transition-all duration-500"></span>
              </Link>
              <a href="#tech" className="px-8 py-5 text-slate-500 hover:text-white font-bold text-[10px] uppercase tracking-[0.2em] transition-colors border-b border-transparent hover:border-indigo-500">
                The Protocol <span className="ml-2 text-indigo-500">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Grid */}
      <div className="border-y border-white/5 py-16 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 overflow-hidden">
          <div className="flex justify-around items-center opacity-40 grayscale contrast-125">
            <div className="text-2xl font-rowdies tracking-tighter">SENSX</div>
            <div className="text-2xl font-rowdies tracking-tighter">VIRTUE</div>
            <div className="text-2xl font-rowdies tracking-tighter">OPUS</div>
            <div className="text-2xl font-rowdies tracking-tighter">NODES</div>
          </div>
        </div>
      </div>

      {/* Methodology Section */}
      <section id="tech" className="py-48 bg-[#01040a]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="order-2 lg:order-1">
              <div className="text-indigo-500 font-black tracking-[0.4em] text-[10px] uppercase mb-8">Neural Forensics</div>
              <h2 className="text-5xl md:text-6xl font-rowdies font-bold text-white mb-10 leading-tight">Beyond the<br/>Digital Veil.</h2>
              <div className="space-y-16">
                <div className="flex items-start space-x-8">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                    <span className="text-indigo-400 font-rowdies font-bold text-xl">1</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-3">Sub-Pixel Jitter Analysis</h4>
                    <p className="text-slate-500 leading-relaxed font-light">Identifying microscopic frame-to-frame inconsistencies that AI generators cannot perfectly stabilize across temporal sequences.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-8">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                    <span className="text-purple-400 font-rowdies font-bold text-xl">2</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-3">Gradient Descent Tracing</h4>
                    <p className="text-slate-500 leading-relaxed font-light">Reverse-engineering the mathematical noise signatures left by Diffusion and GAN architectures during the upscaling process.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="absolute -inset-8 bg-indigo-500/15 rounded-[60px] blur-3xl animate-pulse"></div>
              <div className="relative rounded-[60px] overflow-hidden border border-white/10 glass transform hover:scale-[1.02] transition-transform duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" 
                  alt="Forensic Scanning" 
                  className="w-full grayscale brightness-75 hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="glass p-6 rounded-3xl flex items-center justify-between border-white/10 shadow-3xl">
                    <div>
                      <div className="text-[9px] text-indigo-400 uppercase font-black tracking-[0.3em] mb-2">Probe Status</div>
                      <div className="text-lg font-rowdies text-white">SCANNING SECTOR 07F</div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-indigo-500 animate-ping"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
