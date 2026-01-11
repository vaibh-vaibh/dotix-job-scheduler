"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getJobByIdApi, runJobApi, type Job } from "@/lib/api"

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params?.id)
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!id) return
    const load = async () => {
      try {
        const data = await getJobByIdApi(id)
        setJob(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const handleRun = async () => {
    if (!id) return
    setRunning(true)
    try {
      const updated = await runJobApi(id)
      setJob((prev) => (prev ? { ...prev, status: updated.status } : prev))
      setTimeout(async () => {
        const refreshed = await getJobByIdApi(id)
        setJob(refreshed)
      }, 3500)
    } catch (e) {
      console.error(e)
      alert("Failed to run job")
    } finally {
      setRunning(false)
    }
  }

  if (!id) {
    return (
      <div>
        <p className="mb-4 text-sm text-red-500">
          Invalid job id.
        </p>
        <Button variant="outline" onClick={() => router.push("/")}>
          Back to dashboard
        </Button>
      </div>
    )
  }

  if (loading) {
    return <div>Loading job...</div>
  }

  if (!job) {
    return (
      <div>
        <p className="mb-4 text-sm text-red-500">
          Job not found.
        </p>
        <Button variant="outline" onClick={() => router.push("/")}>
          Back to dashboard
        </Button>
      </div>
    )
  }

  let parsedPayload: unknown = null
  try {
    parsedPayload = job.payload
  } catch {
    parsedPayload = job.payload
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Job #{job.id}
          </h2>
          <p className="text-sm text-muted-foreground">
            {job.taskName}
          </p>
        </div>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => router.push("/")}>
            Back
          </Button>
          <Button onClick={handleRun} disabled={running || job.status === "running"}>
            {running ? "Running..." : "Run Job"}
          </Button>
        </div>
      </div>

      <Card className="p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Status</div>
            <div className="font-medium">{job.status}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Priority</div>
            <div className="font-medium">{job.priority}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Created At</div>
            <div className="font-medium">
              {new Date(job.createdAt).toLocaleString()}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Payload</div>
          <pre className="text-xs font-mono bg-muted rounded-md p-3 overflow-auto max-h-80">
            {JSON.stringify(parsedPayload, null, 2)}
          </pre>
        </div>
      </Card>
    </div>
  )
}