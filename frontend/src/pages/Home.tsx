import { buttonVariants } from "@/components/ui/button"
import { Link } from "react-router-dom"
import Hero3D from "@/components/Hero3D"
import { Upload, Target, Map, Shield, Zap, RefreshCw } from "lucide-react"

const Home = () => {
  return (
    <div className="flex flex-col w-full overflow-hidden no-scrollbar">
      {/* SECTION 1: HERO */}
      <section className="min-h-screen flex flex-col lg:flex-row items-stretch border-b border-border">
        {/* Left: Content */}
        <div className="flex-1 flex flex-col justify-center p-8 lg:p-16 space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 border border-border px-4 py-2 rounded-none bg-secondary/20">
              <span className="w-2 h-2 bg-primary animate-pulse rounded-none" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] opacity-70">Next-Gen Career Intelligence</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-balance">
              Achieve <br /> Your <br /> <span className="text-primary italic">Potential</span>
            </h1>
            
            <p className="max-w-md text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
              Reset uses advanced AI to bridge the gap between your current skills and professional goals. Personalized, actionable, and ready in seconds.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/get-started" 
              className={`${buttonVariants({ variant: 'default' })} rounded-none px-10 py-7 text-sm font-black uppercase tracking-widest transition-all hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]`}
            >
              Generate Roadmap
            </Link>
          </div>
        </div>

        {/* Right: 3D Visual */}
        <div className="flex-1 relative min-h-[500px] lg:min-h-auto overflow-hidden">
          {/* Subtle glow for depth */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-primary/5 blur-[120px] pointer-events-none" />
          <Hero3D />
        </div>
      </section>

      {/* SECTION 2: PROCESS */}
      <section className="py-24 px-8 lg:px-16 border-b border-border bg-background">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-20">
          <div className="space-y-4">
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-primary italic">Process</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
              Your Path, <br /> Reconstructed.
            </h2>
          </div>
          <p className="max-w-xs text-xs font-bold uppercase tracking-widest opacity-60 text-right leading-relaxed">
            Three steps to transform your career trajectory using high-precision data analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-border">
          {[
            { id: '01', icon: <Upload className="w-6 h-6" />, title: 'Upload Resume', desc: 'Drag and drop your professional history. Our AI parses every detail to map your current coordinate.' },
            { id: '02', icon: <Target className="w-6 h-6" />, title: 'Define Target', desc: 'Input the job description for your dream role. We identify the exact requirements and expectations.' },
            { id: '03', icon: <Map className="w-6 h-6" />, title: 'Get Roadmap', desc: 'Receive a hyper-personalized, step-by-step path detailing skill gaps and learning resources.' }
          ].map((item, idx) => (
            <div key={item.id} className={`p-10 space-y-8 group transition-colors hover:bg-secondary/20 ${idx !== 2 ? 'md:border-r border-border' : ''} ${idx !== 0 ? 'border-t md:border-t-0 border-border' : ''}`}>
              <div className="text-5xl lg:text-7xl font-black opacity-10 group-hover:opacity-20 transition-opacity italic">{item.id}</div>
              <div className="space-y-4">
                <div className="text-primary">{item.icon}</div>
                <h3 className="text-xl font-bold uppercase tracking-tight">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: FEATURES */}
      <section id="features" className="flex flex-col lg:flex-row items-stretch border-b border-border">
        {/* Left Visual Placeholder */}
        <div className="flex-1 min-h-[400px] border-r border-border bg-secondary/10 relative group overflow-hidden flex items-center justify-center p-12">
          <div className="w-full h-full border border-border bg-background flex flex-col relative overflow-hidden">
            <div className="h-8 border-b border-border flex items-center px-4 gap-2 bg-secondary/10">
              <div className="w-2 h-2 rounded-none bg-red-400 opacity-50" />
              <div className="w-2 h-2 rounded-none bg-yellow-400 opacity-50" />
              <div className="w-2 h-2 rounded-none bg-green-400 opacity-50" />
            </div>
            <div className="flex-1 p-6 space-y-4 font-mono text-[10px] opacity-40">
              <div className="h-2 w-3/4 bg-border" />
              <div className="h-2 w-1/2 bg-border" />
              <div className="h-2 w-5/6 bg-border" />
              <div className="h-2 w-2/3 bg-border" />
              <div className="mt-8 flex items-center justify-center border border-border p-4 bg-primary/5">
                <span className="text-xs font-bold uppercase tracking-widest text-primary animate-pulse">AI Analysis Active</span>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background to-transparent" />
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 p-8 lg:p-20 space-y-12 flex flex-col justify-center text-left">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-tight">
            Advanced <br /> Features For <br /> Accelerated <br /> <span className="text-primary italic">Growth</span>
          </h2>

          <div className="space-y-8">
            {[
              { icon: <Shield className="w-5 h-5" />, title: 'Gap Analysis', desc: 'Precise identification of technical and soft skill gaps compared to industry standards.' },
              { icon: <Zap className="w-5 h-5" />, title: 'Curated Resources', desc: 'Dynamic links to top courses, certifications, and projects tailored to your path.' },
              { icon: <RefreshCw className="w-5 h-5" />, title: 'Real-Time Updates', desc: 'Your roadmap evolves as market demands and your skills change over time.' }
            ].map((feature, idx) => (
              <div key={idx} className="flex gap-6 items-start group text-left">
                <div className="p-3 border border-border bg-secondary/10 group-hover:bg-primary/10 transition-colors rounded-none">
                  <div className="text-primary">{feature.icon}</div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold uppercase tracking-widest text-sm">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: CTA */}
      <section className="py-32 px-8 flex flex-col items-center justify-center text-center space-y-12 bg-foreground text-background">
        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
          Ready for a <br /> Career Reset?
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <Link 
            to="/get-started" 
            className={`${buttonVariants({ variant: 'secondary' })} rounded-none px-12 py-8 text-base font-black uppercase tracking-widest transition-all hover:scale-105`}
          >
            Start Your Reset
          </Link>
        </div>

        <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">
          Free for your first 3 roadmaps. No credit card required.
        </p>
      </section>
    </div>
  )
}

export default Home
