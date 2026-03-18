import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getReportById } from "@/api/interview.api"
import ReportDisplay from "@/components/ReportDisplay"
import { toast } from "sonner"

export default function Report() {
  const { id } = useParams<{ id: string }>()
  const [report, setReport] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReport() {
      if (!id) return
      try {
        const data = await getReportById(id)
        if (data?.interviewReport) {
          setReport(data.interviewReport)
        } else {
          toast.error("Report not found.")
        }
      } catch (error) {
        console.error("Failed to fetch report:", error)
        toast.error("Error loading report.")
      } finally {
        setLoading(false)
      }
    }

    fetchReport()
  }, [id])

  if (loading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground animate-pulse">Loading Your Report...</p>
        </div>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <p className="text-xl font-medium">Report not found.</p>
      </div>
    )
  }

  return <ReportDisplay report={report} />
}
