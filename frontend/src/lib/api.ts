const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";

export type JobStatus = "pending" | "running" | "completed"
export type JobPriority = "low" | "medium" | "high"

export interface Job {
  id: number
  taskName: string
  priority: JobPriority
  status: JobStatus
  payload: any
  createdAt: string
  updatedAt: string
}

// Create job
export async function createJobApi(input: {
  taskName: string
  priority: JobPriority
  payload: string
}): Promise<Job> {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      taskName: input.taskName,
      priority: input.priority,
      payload: input.payload,
    }),
  })

  if (!res.ok) {
    throw new Error("Failed to create job")
  }

  return res.json()
}

// List jobs
export async function listJobsApi(): Promise<Job[]> {
  const res = await fetch(`${BASE_URL}/jobs`, { cache: "no-store" })
  if (!res.ok) throw new Error("Failed to fetch jobs")
  return res.json()
}

// Get job by id
export async function getJobByIdApi(id: number): Promise<Job> {
  const res = await fetch(`${BASE_URL}/jobs/${id}`, { cache: "no-store" })
  if (!res.ok) throw new Error("Failed to fetch job")
  return res.json()
}

// Run job
export async function runJobApi(id: number): Promise<Job> {
  const res = await fetch(`${BASE_URL}/jobs/run/${id}`, {
    method: "POST",
  })
  if (!res.ok) throw new Error("Failed to run job")
  return res.json()
}