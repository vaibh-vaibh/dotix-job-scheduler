"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

import type { JobPriority } from "./job-table"

export interface CreateJobFormValues {
  taskName: string
  priority: JobPriority
  payload: string // JSON string
}

interface JobCreateDialogProps {
  onCreate: (values: CreateJobFormValues) => Promise<void> | void
}

export function JobCreateDialog({ onCreate }: JobCreateDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [taskName, setTaskName] = useState("")
  const [priority, setPriority] = useState<JobPriority>("medium")
  const [payload, setPayload] = useState("{\n  \n}")

  const handleSubmit = async () => {
    if (!taskName.trim()) return
    setLoading(true)
    try {
      // basic JSON check
      JSON.parse(payload)
      await onCreate({ taskName, priority, payload })
      setOpen(false)
      setTaskName("")
      setPriority("medium")
      setPayload("{\n  \n}")
    } catch (e) {
      alert("Payload must be valid JSON.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !loading && setOpen(v)}>
      <DialogTrigger asChild>
        <Button>Create Job</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Job</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="taskName">Task Name</Label>
            <Input
              id="taskName"
              placeholder="Send daily report"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>
            <Select
              value={priority}
              onValueChange={(v) => setPriority(v as JobPriority)}
            >
              <SelectTrigger className="w-45">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payload">Payload (JSON)</Label>
            <Textarea
              id="payload"
              className="font-mono text-xs min-h-40"
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            disabled={loading}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create Job"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}