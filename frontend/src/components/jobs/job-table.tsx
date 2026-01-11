"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type JobStatus = "pending" | "running" | "completed"
export type JobPriority = "low" | "medium" | "high"

export interface Job {
  id: number
  taskName: string
  priority: JobPriority
  status: JobStatus
  createdAt: string
}

interface JobTableProps {
  jobs: Job[]
  onRunJob: (jobId: number) => void
  isRunningId?: number | null
}

function statusColor(status: JobStatus) {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "running":
      return "bg-blue-100 text-blue-800"
    case "completed":
      return "bg-green-100 text-green-800"
  }
}

function priorityColor(priority: JobPriority) {
  switch (priority) {
    case "low":
      return "bg-slate-100 text-slate-800"
    case "medium":
      return "bg-orange-100 text-orange-800"
    case "high":
      return "bg-red-100 text-red-800"
  }
}

export function JobTable({ jobs, onRunJob, isRunningId }: JobTableProps) {
  return (
    <Table>
      <TableCaption>List of scheduled jobs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-20">ID</TableHead>
          <TableHead>Task Name</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="w-45 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
              No jobs found.
            </TableCell>
          </TableRow>
        )}
        {jobs.map((job) => (
          <TableRow key={job.id}>
            <TableCell className="font-mono text-xs">#{job.id}</TableCell>
            <TableCell className="font-medium">{job.taskName}</TableCell>
            <TableCell>
              <span
                className={
                  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium " +
                  priorityColor(job.priority)
                }
              >
                {job.priority.toUpperCase()}
              </span>
            </TableCell>
            <TableCell>
              <span
                className={
                  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium " +
                  statusColor(job.status)
                }
              >
                {job.status.toUpperCase()}
              </span>
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {new Date(job.createdAt).toLocaleString()}
            </TableCell>
            <TableCell className="text-right space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={job.status === "running" || isRunningId === job.id}
                onClick={() => onRunJob(job.id)}
              >
                {isRunningId === job.id ? "Running..." : "Run Job"}
              </Button>
              <Link href={`/jobs/${job.id}`}>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}