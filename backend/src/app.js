const express = require("express")
const cors = require("cors")
require("dotenv").config()

const jobsRouter = require("./routes/jobs.routes")

const app = express()

app.use(cors({ origin: "http://localhost:3000" }))
app.use(express.json())

app.use("/api/jobs", jobsRouter)

app.get("/health", (_req, res) => {
  res.json({ status: "ok" })
})

module.exports = { app }