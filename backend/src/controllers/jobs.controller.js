const jobsService = require("../services/jobs.service")

exports.createJob = async (req, res) => {
  try {
    const { taskName, priority, payload } = req.body
    const job = await jobsService.createJob({ taskName, priority, payload })
    res.status(201).json(job)
  } catch (err) {
    console.error(err)
    res.status(400).json({ message: "Failed to create job" })
  }
}

exports.listJobs = async (_req, res) => {
  try {
    const jobs = await jobsService.listJobs()
    res.json(jobs)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to list jobs" })
  }
}

exports.getJobById = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const job = await jobsService.getJobById(id)
    if (!job) return res.status(404).json({ message: "Job not found" })
    res.json(job)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to get job" })
  }
}

exports.runJob = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const job = await jobsService.runJob(id)
    res.json(job)
  } catch (err) {
    console.error(err)
    res.status(400).json({ message: err.message || "Failed to run job" })
  }
}