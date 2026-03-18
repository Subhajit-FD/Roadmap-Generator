"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/use-auth"
import { generateReport } from "@/api/interview.api"
import {
  FormProvider,
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import {
  z
} from "zod"
import {
  toast
} from "sonner"
import { CloudUpload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"


const formSchema = z.object({
  selfDescription: z.string().min(5, "Please describe yourself"),
  jobDescription: z.string().min(5, "Please provide a job description")
})

type FormValues = z.infer<typeof formSchema>


export default function Interview() {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [resumeError, setResumeError] = useState<string | null>(null)

  const navigate = useNavigate()
  const { user, setUser } = useAuth()
  const [loading, setLoading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selfDescription: "",
      jobDescription: ""
    }
  })

  async function onSubmit(values: FormValues) {
    if (!resumeFile) {
      setResumeError("Please upload one PDF file.")
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("resume", resumeFile)
      formData.append("selfDescription", values.selfDescription)
      formData.append("jobDescription", values.jobDescription)

      const response = await generateReport(formData)
      
      if (response?.interviewReport?._id) {
        toast.success("Report generated successfully!")
        if (user && typeof user.tokens === "number") {
          setUser({ ...user, tokens: user.tokens - 1 })
        }
        navigate(`/report/${response.interviewReport._id}`)
      } else {
        toast.error("Failed to generate report structure.")
      }
    } catch (error: any) {
      console.error("Submission failed:", error)
      const errorMsg = error.response?.data?.message || "Something went wrong during report generation."
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    setResumeError(null)
    const file = event.target.files?.[0] ?? null
    if (!file) {
      setResumeFile(null)
      return
    }

    if (file.type !== "application/pdf") {
      setResumeFile(null)
      setResumeError("Only .pdf files are allowed.")
      return
    }

    setResumeFile(file)
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 pb-20">
        {/* Resume Upload Part */}
        <div className="space-y-4">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/80 block">
            Upload Resume (PDF ONLY)
          </label>
          <div className="relative group">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            />
            <div className={`border-2 border-dashed ${resumeError ? 'border-destructive/50' : 'border-border'} group-hover:border-primary/50 transition-colors p-12 flex flex-col items-center justify-center gap-4 bg-secondary/5 rounded-none`}>
              <CloudUpload className="w-8 h-8 text-muted-foreground/50" />
              <div className="text-center space-y-1">
                <p className="text-sm font-bold text-foreground/80 uppercase tracking-widest">
                  {resumeFile ? resumeFile.name : "Choose file or drag and drop"}
                </p>
                <p className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">
                  Maximum file size: 3MB
                </p>
              </div>
            </div>
            {resumeError && <p className="text-[10px] font-bold text-destructive uppercase tracking-widest mt-2">{resumeError}</p>}
          </div>
        </div>

        {/* Self Description Part */}
        <div className="space-y-4">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/80 block">
            Self Description
          </label>
          <Textarea
            {...form.register("selfDescription")}
            placeholder="Describe your current expertise and core strengths..."
            className="w-full h-32 bg-secondary/5 border-border rounded-none p-6 text-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-primary transition-all placeholder:text-muted-foreground/30 resize-none font-medium"
          />
          {form.formState.errors.selfDescription && (
            <p className="text-[10px] font-bold text-destructive uppercase tracking-widest">{form.formState.errors.selfDescription.message}</p>
          )}
        </div>

        {/* Target Job Part */}
        <div className="space-y-4">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/80 block">
            Target Job Description
          </label>
          <Textarea
            {...form.register("jobDescription")}
            placeholder="Paste the description of the role you are targeting..."
            className="w-full h-48 bg-secondary/5 border-border rounded-none p-6 text-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-primary transition-all placeholder:text-muted-foreground/30 resize-none font-medium"
          />
          {form.formState.errors.jobDescription && (
            <p className="text-[10px] font-bold text-destructive uppercase tracking-widest">{form.formState.errors.jobDescription.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 py-7 uppercase tracking-[0.2em] text-xs font-bold rounded-none"
          >
            {loading ? "Synthesizing Roadmap..." : "Generate Roadmap"}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset();
              setResumeFile(null);
              setResumeError(null);
            }}
            className="flex-1 py-7 uppercase tracking-[0.2em] text-xs font-bold rounded-none"
          >
            Reset Form
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
