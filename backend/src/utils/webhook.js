const axios = require("axios")
require("dotenv").config()

const WEBHOOK_URL = process.env.WEBHOOK_URL 

exports.triggerWebhook = async (job) => {
  if (!WEBHOOK_URL) {
    console.warn("WEBHOOK_URL not set, skipping webhook")
    return
  }
  const payload = {
    jobId: job.id,
    taskName: job.taskName,
    priority: job.priority,
    payload: job.payload,
    completedAt: job.updatedAt,
  }
  try {
    const res = await axios.post(WEBHOOK_URL, payload)
    console.log("Webhook sent:", res.status)
  } catch (err) {
    console.error("Webhook error:", err.message)
  }
}