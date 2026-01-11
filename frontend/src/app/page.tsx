"use client"

import { useEffect, useState } from "react"
import { JobTable } from "@/components/jobs/job-table"
import { JobFilters, type JobFiltersValue } from "@/components/jobs/job-filters"
import { JobCreateDialog, type CreateJobFormValues } from "@/components/jobs/job-create-dialog"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  listJobsApi,
  createJobApi,
  runJobApi,
  type Job,
} from "@/lib/api"

export default function DashboardPage() {
  const [filters, setFilters] = useState<JobFiltersValue>({
    status: "all",
    priority: "all",
  })
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [runningId, setRunningId] = useState<number | null>(null)

  // Jobs fetch
  const fetchJobs = async () => {
    setLoading(true)
    try {
      const data = await listJobsApi()
      setJobs(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const filteredJobs = jobs.filter((job) => {
    if (filters.status !== "all" && job.status !== filters.status) return false
    if (filters.priority !== "all" && job.priority !== filters.priority)
      return false
    return true
  })

  const handleCreateJob = async (values: CreateJobFormValues) => {
    try {
      const newJob = await createJobApi({
        taskName: values.taskName,
        priority: values.priority,
        payload: values.payload,
      })
      setJobs((prev) => [newJob, ...prev])
    } catch (e) {
      console.error(e)
      alert("Failed to create job")
    }
  }

  const handleRunJob = async (jobId: number) => {
    setRunningId(jobId)
    try {
      const updated = await runJobApi(jobId)
      setJobs((prev) =>
        prev.map((job) =>
          job.id === updated.id ? { ...job, status: updated.status } : job
        )
      )
      // 3 sec baad completed status fetch karne ke liye re-fetch
      setTimeout(fetchJobs, 3500)
    } catch (e) {
      console.error(e)
      alert("Failed to run job")
    } finally {
      setRunningId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Dotix Job Scheduler
          </h2>
          <p className="text-sm text-muted-foreground">
            Create, run, and monitor background jobs.
          </p>
        </div>
        <JobCreateDialog onCreate={handleCreateJob} />
      </div>

      <Card className="p-4 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <JobFilters value={filters} onChange={setFilters} />
        </div>
        <Separator />
        {loading ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            Loading jobs...
          </div>
        ) : (
          <JobTable
            jobs={filteredJobs}
            onRunJob={handleRunJob}
            isRunningId={runningId}
          />
        )}
      </Card>
    </div>
  )
}