
import React from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AnalysisPage from './pages/AnalysisPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-[#020617] text-slate-200">
        <nav className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 transform hover:rotate-6 transition-transform">
                  <span className="text-white font-rowdies font-bold text-xl">R</span>
                </div>
                <span className="text-2xl font-rowdies font-bold tracking-tight text-white">Realix AI</span>
              </div>
              <div className="hidden md:flex space-x-8 text-sm font-medium">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    `hover:text-indigo-400 transition-colors uppercase tracking-widest text-[11px] font-bold ${isActive ? 'text-indigo-400' : 'text-slate-400'}`
                  }
                >
                  Experience
                </NavLink>
                <NavLink 
                  to="/analyze" 
                  className={({ isActive }) => 
                    `hover:text-indigo-400 transition-colors uppercase tracking-widest text-[11px] font-bold ${isActive ? 'text-indigo-400' : 'text-slate-400'}`
                  }
                >
                  Workbench
                </NavLink>
                <a href="#tech" className="text-slate-400 hover:text-indigo-400 transition-colors uppercase tracking-widest text-[11px] font-bold">Protocol</a>
              </div>
              <div>
                <NavLink 
                  to="/analyze" 
                  className="bg-white hover:bg-slate-200 text-black px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-white/5 active:scale-95"
                >
                  Scan Media
                </NavLink>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/analyze" element={<AnalysisPage />} />
          </Routes>
        </main>

        <footer className="bg-[#01040a] border-t border-white/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-rowdies font-bold text-lg">R</span>
                  </div>
                  <span className="text-xl font-rowdies font-bold text-white">Realix AI</span>
                </div>
                <p className="text-slate-500 max-w-sm leading-relaxed text-sm">
                  The definitive standard for visual truth. Realix AI provides sovereign-grade forensic tools to detect advanced synthetic manipulation.
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8">Infrastructure</h4>
                <ul className="space-y-4 text-slate-500 text-[11px] font-bold uppercase tracking-widest">
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Forensic API</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Quantum Labs</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Case Management</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8">Governance</h4>
                <ul className="space-y-4 text-slate-500 text-[11px] font-bold uppercase tracking-widest">
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Neural Ethics</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Verification Node</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Data Sovereignty</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-16 pt-8 border-t border-white/5 text-center text-slate-600 text-[10px] font-bold uppercase tracking-[0.3em]">
              © {new Date().getFullYear()} Realix Forensic Systems. Secured by AI.
            </div>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
