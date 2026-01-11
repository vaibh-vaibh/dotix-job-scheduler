const express = require("express")
const router = express.Router()
const jobsController = require("../controllers/jobs.controller")

// POST /api/jobs
router.post("/", jobsController.createJob)

// GET /api/jobs
router.get("/", jobsController.listJobs)

// GET /api/jobs/:id
router.get("/:id", jobsController.getJobById)

// POST /api/jobs/run/:id
router.post("/run/:id", jobsController.runJob)

module.exports = router