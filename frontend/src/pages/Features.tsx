import { Link } from "react-router-dom";
import { 
  FileText, 
  BarChart3, 
  Compass, 
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Features() {
  return (
    <div className="min-h-screen bg-background text-foreground py-24 px-6 pt-32">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* Header Section */}
        <div className="flex gap-8 items-start">
          <div className="w-px h-40 bg-primary/20 shrink-0 mt-2" />
          <div className="space-y-6 max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              Core<br/>Capabilities
            </h1>
            <p className="text-muted-foreground font-medium text-lg leading-relaxed">
              High-performance neural tools for career trajectory optimization.<br className="hidden md:block"/>
              Pure data, zero friction.
            </p>
          </div>
        </div>

        {/* Bento Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[200px]">
          
          {/* Resume Parsing - Large */}
          <BentoItem 
            className="md:col-span-8 md:row-span-2"
            icon={<FileText className="w-5 h-5 text-primary" />}
            title="Resume Parsing"
            description="Instant neural extraction of qualifications. Our engine deconstructs your professional history into actionable data points with 99.9% accuracy."
          >
             <div className="mt-8 relative h-48 w-full bg-secondary/20 border border-border overflow-hidden p-6 font-mono text-[10px] text-primary/40 space-y-2 group-hover:text-primary/60 transition-colors">
                <p>&gt; INITIALIZING SCAN...</p>
                <p>&gt; EXTRACTING ENTITIES...</p>
                <p>&gt; [SKILL] RECOGNIZED: MACHINE LEARNING</p>
                <p>&gt; [EXP] RECOGNIZED: SENIOR ARCHITECT</p>
                <div className="absolute bottom-4 right-4 animate-pulse">_</div>
             </div>
          </BentoItem>

          {/* Skill Gap - Tall */}
          <BentoItem 
            className="md:col-span-4 md:row-span-2"
            icon={<BarChart3 className="w-5 h-5 text-primary" />}
            title="Skill Gap Analysis"
            description="A diagnostic layer that compares your current stack against industry-leading requirements."
          >
             <div className="mt-12 flex items-end gap-2 h-40 px-4 pb-4">
                {[40, 65, 30, 90, 55].map((h, i) => (
                    <div 
                        key={i} 
                        className="flex-1 bg-primary/20 border-t border-primary/40 group-hover:bg-primary/40 transition-all duration-500"
                        style={{ height: `${h}%` }}
                    />
                ))}
             </div>
          </BentoItem>

          {/* Learning Paths */}
          <BentoItem 
            className="md:col-span-4"
            icon={<Compass className="w-5 h-5 text-primary" />}
            title="Learning Paths"
            description="Customized sequences designed for rapid upskilling."
          />

          {/* Market Data */}
          <BentoItem 
            className="md:col-span-4"
            icon={<Globe className="w-5 h-5 text-primary" />}
            title="Curated Resources"
            description="Live telemetry from global hiring markets and expert courses."
          />

          {/* Efficiency - Moved up beside Curated Resources */}
          <div className="md:col-span-4 p-10 border border-border bg-card flex flex-col justify-center gap-4 group cursor-default transition-all duration-500 hover:border-primary/50">
             <div className="text-7xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors">99%</div>
             <div className="space-y-1">
                <h3 className="font-bold uppercase tracking-widest text-xs">System Efficiency</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-relaxed">Maximum impact, zero wasted effort in your job search protocol.</p>
             </div>
          </div>

        </div>

        {/* Footer CTA Section */}
        <div className="pt-20 border-t border-border flex flex-col items-center gap-12">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-center">Ready for Reset?</h2>
            
            <div className="flex flex-col md:flex-row gap-4 w-full max-w-sm">
                <Button className="flex-1 py-8 text-xs font-bold uppercase tracking-widest rounded-none bg-primary text-primary-foreground hover:opacity-90 transition-opacity" asChild>
                    <Link to="/get-started">Initialize System</Link>
                </Button>
            </div>
        </div>

      </div>
    </div>
  );
}

function BentoItem({ className, icon, title, description, children }: any) {
    return (
        <div className={`p-8 border border-border bg-card flex flex-col gap-4 relative group overflow-hidden transition-all duration-500 hover:border-primary/50 text-foreground ${className}`}>
           <div className="mb-2">{icon}</div>
           <div className="space-y-4">
              <h3 className="text-xl font-bold uppercase tracking-tight group-hover:text-primary transition-colors">{title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
                {description}
              </p>
           </div>
           {children}
           
           {/* Decorative hover elements */}
           <div className="absolute -bottom-1 -right-1 w-24 h-24 bg-primary/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </div>
    );
}
