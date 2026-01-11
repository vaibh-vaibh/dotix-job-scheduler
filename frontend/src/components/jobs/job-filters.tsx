"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type StatusFilter = "all" | "pending" | "running" | "completed"
type PriorityFilter = "all" | "low" | "medium" | "high"

export interface JobFiltersValue {
  status: StatusFilter
  priority: PriorityFilter
}

interface JobFiltersProps {
  value: JobFiltersValue
  onChange: (value: JobFiltersValue) => void
}

export function JobFilters({ value, onChange }: JobFiltersProps) {
  const [local, setLocal] = useState<JobFiltersValue>(value)

  const update = (patch: Partial<JobFiltersValue>) => {
    const next = { ...local, ...patch }
    setLocal(next)
    onChange(next)
  }

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">Status</span>
        <Select
          value={local.status}
          onValueChange={(v) =>
            update({ status: v as JobFiltersValue["status"] })
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="running">Running</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">Priority</span>
        <Select
          value={local.priority}
          onValueChange={(v) =>
            update({ priority: v as JobFiltersValue["priority"] })
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}