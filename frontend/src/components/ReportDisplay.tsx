import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


interface Question {
  question: string;
  intention: string;
  answer: string;
}

interface SkillGap {
  skill: string;
  severity: "low" | "medium" | "high";
}

interface PreparationPlan {
  day: number;
  focus: string;
  tasks: string[];
}

interface CuratedResource {
  title: string;
  url: string;
  type: string;
  description: string;
}

interface InterviewReport {
  title: string;
  matchScore: number;
  technicalQuestions: Question[];
  behavioralQuestions: Question[];
  skillGaps: SkillGap[];
  preparationPlan: PreparationPlan[];
  curatedResources?: CuratedResource[];
}

export default function ReportDisplay({ report }: { report: InterviewReport }) {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
            {report.title}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground font-medium">
            Interview Preparation Report
          </p>
        </div>
        <div className="flex items-center gap-3 bg-secondary/30 px-5 py-3 border border-border/50 shrink-0">
          <span className="text-xs md:text-sm font-semibold uppercase tracking-wider opacity-70">
            Match Score
          </span>
          <span className={`text-xl md:text-2xl font-black ${report.matchScore > 70 ? 'text-green-500' : report.matchScore > 40 ? 'text-yellow-500' : 'text-red-500'}`}>
            {report.matchScore}%
          </span>
        </div>
      </div>

      <Tabs defaultValue="technical" className="w-full">
        <div className="border-b border-border/50">
          <TabsList className="flex h-auto w-full justify-start md:justify-center bg-transparent p-0 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <TabsTrigger 
              value="technical" 
              className="relative px-5 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary text-muted-foreground hover:text-foreground/80 md:px-10 font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all duration-300 shrink-0"
            >
              Technical
            </TabsTrigger>
            <TabsTrigger 
              value="behavioral" 
              className="relative px-5 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary text-muted-foreground hover:text-foreground/80 md:px-10 font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all duration-300 shrink-0"
            >
              Behavioural
            </TabsTrigger>
            <TabsTrigger 
              value="roadmap" 
              className="relative px-5 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary text-muted-foreground hover:text-foreground/80 md:px-10 font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all duration-300 shrink-0"
            >
              RoadMap
            </TabsTrigger>
            <TabsTrigger 
              value="gaps" 
              className="relative px-5 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary text-muted-foreground hover:text-foreground/80 md:px-10 font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all duration-300 shrink-0"
            >
              Skill Gaps
            </TabsTrigger>
            <TabsTrigger 
              value="resources" 
              className="relative px-5 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary text-muted-foreground hover:text-foreground/80 md:px-10 font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all duration-300 shrink-0"
            >
              Resources
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="mt-6 border border-border/50 p-4 md:p-8 min-h-[500px] bg-card/20 backdrop-blur-sm relative overflow-hidden">
          {/* Subtle background glow for depth */}
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/10 to-transparent" />
          <TabsContent value="technical" className="mt-0 space-y-6 animate-in slide-in-from-bottom-4 duration-300">
            {report.technicalQuestions.map((q, i) => (
              <Card key={i} className="bg-transparent border-none shadow-none px-2 md:px-4">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-base md:text-lg font-bold flex gap-3 text-balance items-start">
                    <span className="text-primary opacity-50 shrink-0">Q{i + 1}.</span>
                    {q.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0 space-y-4">
                  <div className="bg-secondary/20 p-4 border border-border/50">
                    <p className="text-[10px] md:text-xs font-bold text-primary/60 uppercase tracking-widest mb-1 italic">Intention</p>
                    <p className="text-sm leading-relaxed">{q.intention}</p>
                  </div>
                  <div className="bg-primary/5 p-4 border border-primary/20">
                    <p className="text-[10px] md:text-xs font-bold text-primary/60 uppercase tracking-widest mb-1">Recommended Answer</p>
                    <p className="text-sm md:text-base leading-relaxed">{q.answer}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="behavioral" className="mt-0 space-y-6 animate-in slide-in-from-bottom-4 duration-300">
            {report.behavioralQuestions.map((q, i) => (
              <Card key={i} className="bg-transparent border-none shadow-none px-2 md:px-4">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-base md:text-lg font-bold flex gap-3 text-balance items-start">
                    <span className="text-primary opacity-50 shrink-0">Q{i + 1}.</span>
                    {q.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0 space-y-4">
                  <div className="bg-secondary/20 p-4 border border-border/50">
                    <p className="text-[10px] md:text-xs font-bold text-primary/60 uppercase tracking-widest mb-1 italic">Intention</p>
                    <p className="text-sm leading-relaxed">{q.intention}</p>
                  </div>
                  <div className="bg-primary/5 p-4 border border-primary/20">
                    <p className="text-[10px] md:text-xs font-bold text-primary/60 uppercase tracking-widest mb-1">Recommended Answer</p>
                    <p className="text-sm md:text-base leading-relaxed">{q.answer}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="roadmap" className="mt-0 animate-in slide-in-from-bottom-4 duration-300">
            <div className="relative space-y-8 before:absolute before:inset-0 before:left-5 md:before:left-1/2 before:-translate-x-1/2 before:h-full before:w-px before:bg-linear-to-b before:from-transparent before:via-border before:to-transparent">
              {report.preparationPlan.sort((a,b) => a.day - b.day).map((day, i) => (
                <div key={i} className={`relative flex items-center group ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Circle */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-border bg-background group-hover:border-primary transition-colors z-10 shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                    <span className="text-sm font-bold text-primary">{day.day}</span>
                  </div>
                  
                  {/* Card wrapper */}
                  <div className={`w-full ml-4 md:ml-0 md:w-[45%] ${i % 2 === 0 ? 'md:pl-0' : 'md:pr-0'}`}>
                    <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all shadow-lg group-hover:translate-y-[-2px]">
                      <CardContent className="p-4 md:p-5">
                        <div className="font-bold text-base md:text-lg text-primary mb-2 flex items-center gap-2">
                          <span className="md:hidden">Day {day.day}:</span>
                          {day.focus}
                        </div>
                        <ul className="text-muted-foreground text-xs md:text-sm list-disc pl-5 space-y-2">
                          {day.tasks.map((task, j) => (
                            <li key={j} className="leading-relaxed">{task}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="gaps" className="mt-0 animate-in slide-in-from-bottom-4 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {report.skillGaps.map((gap, i) => (
                <Card key={i} className="bg-secondary/10 border-border group hover:border-primary/50 transition-colors">
                  <CardContent className="p-4 flex flex-col justify-between h-full gap-4">
                    <h3 className="font-semibold text-lg">{gap.skill}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-xs uppercase tracking-wider font-bold opacity-50">Severity</span>
                      <Badge variant={gap.severity === 'high' ? 'destructive' : gap.severity === 'medium' ? 'default' : 'outline'} className="capitalize rounded-none text-center">
                        {gap.severity}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="resources" className="mt-0 animate-in slide-in-from-bottom-4 duration-300">
            {report.curatedResources && report.curatedResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {report.curatedResources.map((resource, i) => (
                    <Card key={i} className="bg-secondary/10 border-border group hover:border-primary/50 transition-colors">
                      <CardContent className="p-4 flex flex-col justify-between h-full gap-4">
                        <div className="space-y-2">
                          <Badge variant="outline" className="capitalize rounded-none text-[10px] tracking-widest">
                            {resource.type}
                          </Badge>
                          <h3 className="font-bold text-lg leading-tight">{resource.title}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">{resource.description}</p>
                        </div>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2 mt-auto pt-4 border-t border-border/50 hover:opacity-80">
                          Visit Resource <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
            ) : (
                <div className="text-center py-12 text-muted-foreground border border-dashed border-border p-8 bg-secondary/10">
                    <p className="font-bold uppercase tracking-widest text-sm">No curated resources found for this map.</p>
                </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
