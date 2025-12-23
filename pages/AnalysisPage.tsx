
import React, { useState, useRef } from 'react';
import { MediaFile, DetectionResult } from '../types';
import { geminiService } from '../services/geminiService';

const AnalysisPage: React.FC = () => {
  const [media, setMedia] = useState<MediaFile | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    setError(null);
    setResult(null);
    const type = file.type.startsWith('video') ? 'video' : 'image';
    const previewUrl = URL.createObjectURL(file);
    setMedia({ file, previewUrl, type: type as 'video' | 'image' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const startAnalysis = async () => {
    if (!media) return;
    setAnalyzing(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const res = await geminiService.analyzeMedia(base64, media.file.type);
        setResult(res);
        setAnalyzing(false);
      };
      reader.readAsDataURL(media.file);
    } catch (err: any) {
      setError(err.message || 'An error occurred during analysis.');
      setAnalyzing(false);
    }
  };

  const reset = () => {
    setMedia(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-[#020617]">
      <div className="max-w-7xl mx-auto">
        <header className="mb-24 text-center lg:text-left">
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black tracking-[0.3em] uppercase mb-8">
            Realix Analysis Suite
          </div>
          <h1 className="text-6xl font-rowdies font-bold text-white mb-8">Deepscan Workbench</h1>
          <p className="text-slate-500 max-w-3xl text-xl font-light leading-relaxed">
            Deploy industrial-grade forensics on any digital asset. Realix AI dissects pixel data to identify synthetic manipulation with clinical precision.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Workspace Side */}
          <div className="lg:col-span-7 space-y-10">
            {!media ? (
              <div 
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) processFile(f); }}
                className="group relative h-[550px] rounded-[60px] border-2 border-dashed border-white/5 bg-white/[0.01] flex flex-col items-center justify-center transition-all hover:border-indigo-500/40 hover:bg-white/[0.03] cursor-pointer shadow-inner"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-28 h-28 rounded-[35px] bg-slate-900 flex items-center justify-center mb-12 group-hover:scale-110 group-hover:bg-indigo-600 transition-all duration-500 shadow-2xl">
                  <svg className="w-12 h-12 text-indigo-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-rowdies font-bold text-white mb-4">Ingest Data Packet</h3>
                <p className="text-slate-600 text-[11px] font-bold uppercase tracking-[0.2em]">Drop high-fidelity media for verification</p>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,video/*" />
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
                <div className="relative rounded-[60px] overflow-hidden border border-white/10 bg-black shadow-3xl aspect-video group">
                  {media.type === 'video' ? (
                    <video src={media.previewUrl} controls className="w-full h-full object-contain" />
                  ) : (
                    <img src={media.previewUrl} alt="Preview" className="w-full h-full object-contain" />
                  )}
                  
                  {/* Analysis Overlay */}
                  {analyzing && (
                    <div className="absolute inset-0 bg-[#020617]/95 backdrop-blur-xl flex flex-col items-center justify-center z-20">
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="scan-line absolute w-full h-1/4 opacity-40"></div>
                      </div>
                      <div className="relative z-10 text-center">
                        <div className="w-20 h-20 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-10 mx-auto"></div>
                        <h4 className="text-3xl font-rowdies font-bold text-white mb-4 tracking-tight animate-pulse uppercase">Dissecting Neurals...</h4>
                        <div className="flex space-x-3 justify-center">
                          <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce"></span>
                        </div>
                      </div>
                    </div>
                  )}

                  {!analyzing && !result && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-12">
                       <p className="text-[10px] text-white/40 tracking-[0.4em] uppercase font-black">Laboratory state: Ready for Inquest</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center p-8 glass rounded-[40px] border-white/5 shadow-2xl">
                  <div className="flex items-center space-x-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                      <svg className="w-7 h-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" strokeWidth="1.5"/></svg>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white truncate max-w-[250px] mb-1">{media.file.name}</div>
                      <div className="text-[9px] text-indigo-500 uppercase font-black tracking-[0.3em]">Protocol Active</div>
                    </div>
                  </div>
                  {!analyzing && !result && (
                    <div className="flex space-x-6 items-center">
                      <button onClick={reset} className="text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors px-4">Purge</button>
                      <button 
                        onClick={startAnalysis}
                        className="bg-white hover:bg-slate-200 text-black px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-white/5 active:scale-95 transition-all"
                      >
                        Deep Forensic Scan
                      </button>
                    </div>
                  )}
                  {result && (
                    <button onClick={reset} className="px-10 py-4 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 border border-indigo-500/20 transition-all">New Inspection</button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Report Side */}
          <div className="lg:col-span-5">
            {result ? (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-1000">
                {/* Result Hero Card */}
                <div className={`p-12 rounded-[60px] border relative overflow-hidden shadow-3xl ${
                  result.isDeepfake ? 'bg-red-500/5 border-red-500/20' : 'bg-emerald-500/5 border-emerald-500/20'
                }`}>
                  <div className="absolute top-0 right-0 p-10">
                    <div className={`w-4 h-4 rounded-full ${result.isDeepfake ? 'bg-red-500 shadow-[0_0_20px_red]' : 'bg-emerald-500 shadow-[0_0_20px_green]'} animate-pulse`}></div>
                  </div>
                  
                  <div className="mb-14">
                    <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-6">Final Verification</h2>
                    <div className={`text-5xl font-rowdies font-bold ${result.isDeepfake ? 'text-red-500' : 'text-emerald-500'} leading-none`}>
                      {result.isDeepfake ? 'SYNTHETIC' : 'AUTHENTIC'}
                    </div>
                  </div>

                  <div className="mb-14">
                    <div className="flex justify-between items-end mb-5">
                      <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Manipulation Probability</span>
                      <span className="text-5xl font-rowdies text-white">{(result.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ease-out ${result.isDeepfake ? 'bg-red-500 shadow-[0_0_15px_red]' : 'bg-emerald-500 shadow-[0_0_15px_green]'}`}
                        style={{ width: `${result.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="p-8 rounded-[35px] bg-white/[0.03] border border-white/5 relative group">
                    <span className="block text-[9px] text-indigo-400 font-black uppercase tracking-[0.3em] mb-5">Forensic Inquest Summary</span>
                    <p className="text-slate-300 text-lg leading-relaxed font-light italic">
                      "{result.reasoning}"
                    </p>
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-indigo-500/5 blur-3xl rounded-full group-hover:bg-indigo-500/10 transition-colors"></div>
                  </div>
                </div>

                {/* Indicators List */}
                <div className="glass p-12 rounded-[60px] border-white/5">
                  <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-12 flex items-center">
                    <span className="w-1.5 h-6 bg-indigo-600 mr-5 rounded-full"></span>
                    Detection Artifact Map
                  </h3>
                  <div className="space-y-8">
                    {result.analysisPoints.map((point, idx) => (
                      <div key={idx} className="group flex items-start space-x-6 p-6 rounded-[30px] transition-all hover:bg-white/[0.04] border border-transparent hover:border-white/5">
                        <div className={`mt-2 w-2.5 h-2.5 rounded-full shrink-0 ${
                          point.severity === 'high' ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.7)]' : 
                          point.severity === 'medium' ? 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]' : 'bg-emerald-500'
                        }`}></div>
                        <div>
                          <div className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] mb-2 group-hover:text-indigo-400 transition-colors">
                            {point.category}
                          </div>
                          <p className="text-slate-400 text-sm leading-relaxed font-light">{point.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[500px] flex items-center justify-center p-16 glass border-dashed border-2 border-white/5 rounded-[60px] text-center">
                <div className="opacity-15">
                  <svg className="w-24 h-24 mx-auto mb-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-2xl font-rowdies font-bold text-white uppercase tracking-widest">Awaiting Link</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] mt-4">Node: STANDBY</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 px-8 py-5 bg-red-600 text-white rounded-full font-bold shadow-3xl flex items-center space-x-4 animate-in fade-in slide-in-from-bottom-10 z-50">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <span className="text-xs uppercase tracking-[0.2em] font-black">{error}</span>
        </div>
      )}
    </div>
  );
};

export default AnalysisPage;
