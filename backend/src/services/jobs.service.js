const { pool } = require("../db/pool")
const { triggerWebhook } = require("../utils/webhook")

exports.createJob = async ({ taskName, priority, payload }) => {
  const conn = await pool.getConnection()
  try {
    const [result] = await conn.execute(
      "INSERT INTO jobs (taskName, payload, priority, status) VALUES (?, CAST(? AS JSON), ?, 'pending')",
      [taskName, payload, priority]
    )
    const [rows] = await conn.execute("SELECT * FROM jobs WHERE id = ?", [
      result.insertId,
    ])
    return rows[0]
  } finally {
    conn.release()
  }
}

exports.listJobs = async () => {
  const [rows] = await pool.execute("SELECT * FROM jobs ORDER BY id ASC")
  return rows
}

exports.getJobById = async (id) => {
  const [rows] = await pool.execute("SELECT * FROM jobs WHERE id = ?", [id])
  return rows[0] || null
}

exports.runJob = async (id) => {
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()

    const [rows] = await conn.execute("SELECT * FROM jobs WHERE id = ?", [id])
    const job = rows[0]
    if (!job) throw new Error("Job not found")

    // status -> running
    await conn.execute("UPDATE jobs SET status = 'running' WHERE id = ?", [id])

    await conn.commit()

    // simulate 3 sec job async
    setTimeout(async () => {
      const c = await pool.getConnection()
      try {
        await c.execute("UPDATE jobs SET status = 'completed' WHERE id = ?", [id])
        const [updatedRows] = await c.execute("SELECT * FROM jobs WHERE id = ?", [id])
        const updatedJob = updatedRows[0]
        await triggerWebhook(updatedJob)
      } catch (e) {
        console.error("Error in background job:", e)
      } finally {
        c.release()
      }
    }, 3000)

    return { ...job, status: "running" }
  } finally {
    conn.release()
  }
}