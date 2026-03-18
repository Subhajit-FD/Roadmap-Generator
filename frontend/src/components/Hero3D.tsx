import { useState } from 'react';

export default function Hero3D() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full h-full min-h-[500px] lg:min-h-[700px] relative overflow-hidden flex items-center justify-center bg-transparent">
      {/* Loading Placeholder */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary/5 animate-pulse">
          <div className="w-32 h-32 border border-primary/20 flex items-center justify-center">
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] opacity-30">Initializing 3D...</span>
          </div>
        </div>
      )}

      {/* Spline 3D Scene - Custom Exported Scene */}
      <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'} pointer-events-auto`}>
        <iframe 
          src="https://my.spline.design/depthcopycopy-g1noagfkNGTejaPaMqMcHkTo-QO3/" 
          frameBorder="0" 
          width="100%" 
          height="100%"
          onLoad={() => setLoading(false)}
          className="pointer-events-auto bg-background"
        />
        {/* Mask to hide Spline watermark precisely */}
        <div className="absolute bottom-[19px] right-[20px] w-[137px] h-[40px] bg-background pointer-events-none z-30" />
      </div>

      {/* Overlay for status display as seen in reference */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[85%] max-w-sm bg-background/40 backdrop-blur-xl border border-border/50 p-6 rounded-none z-40 transition-all duration-500 hover:scale-105 hover:bg-background/60 group">
        <div className="space-y-4">
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
            <span>Status: Analyzing</span>
            <span className="text-primary animate-pulse">Live</span>
          </div>
          
          <div className="w-full h-[2px] bg-secondary/30 overflow-hidden">
            <div className="h-full bg-primary w-[72%] transition-all duration-1000 ease-out group-hover:w-[85%]" />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Current Roadmap</span>
            <div className="text-sm font-black uppercase tracking-tight">
              Senior Product Designer
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative corner accents for mechanical feel */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-primary/30" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-primary/30" />
    </div>
  )
}
