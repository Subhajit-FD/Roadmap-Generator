import Interview from "@/components/forms/Interview"

const GetStarted = () => {
  return (
    <div className="min-h-screen text-foreground py-20 px-6 overflow-x-hidden bg-background">
      <div className="max-w-[650px] mx-auto space-y-16">
        {/* Header Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary block"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Initiate Trajectory</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
            Get<br/>Started.
          </h1>
          
          <p className="text-muted-foreground font-medium text-lg leading-relaxed max-w-[500px]">
            Provide your professional background and target role. Our AI will synthesize a precise roadmap for your career pivot.
          </p>
        </div>

        {/* Form Section */}
        <Interview />
      </div>
    </div>
  )
}

export default GetStarted