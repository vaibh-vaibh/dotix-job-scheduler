# 🚀 Dotix Job Scheduler

A full-stack job scheduler automation system that allows users to create background tasks, run them, track their status, and trigger webhooks when tasks complete.

**Built with:** Next.js • Express.js • MySQL • Tailwind CSS

**Status:** ✅ Fully Functional (Local Deployment)

**GitHub:** [dotix-job-scheduler](https://github.com/vaibh-vaibh/dotix-job-scheduler)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Database Schema](#database-schema)
- [Architecture](#architecture)
- [API Documentation](#api-documentation)
- [Webhook Integration](#webhook-integration)
- [Running the Application](#running-the-application)
- [Testing Guide](#testing-guide)
- [AI Usage Log](#ai-usage-log)
- [Deployment Status](#deployment-status)

---

## 🎯 Overview

Dotix Job Scheduler is a mini automation engine built to demonstrate full-stack web development. It allows users to create background tasks, execute them, and receive webhook notifications upon completion.

The application simulates background job processing (like sending emails, generating reports, syncing data) with a user-friendly dashboard.

---

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 15 with TypeScript
- **Styling:** Tailwind CSS 3
- **UI Components:** shadcn/ui
- **HTTP Client:** Fetch API
- **State Management:** React Hooks

### Backend
- **Runtime:** Node.js 16+
- **Framework:** Express.js
- **Database:** MySQL 8.0
- **Database Client:** mysql2/promise
- **Webhook Client:** Axios
- **Environment:** dotenv

### Database
- **Type:** MySQL 8.0
- **Hosting:** Local

---

## 📁 Project Structure

```
dotix-job-scheduler/
│
├── .git/                              # Git version control
├── .gitignore                         # Git ignore rules
│
├── frontend/                          # Next.js Frontend
│   ├── .gitignore
│   ├── .next/                         # Build output
│   ├── node_modules/                  # Dependencies
│   ├── public/                        # Static assets
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx               # Dashboard
│   │   │   └── jobs/
│   │   │       └── [id]/
│   │   │           └── page.tsx       # Job Details
│   │   │
│   │   ├── components/
│   │   │   ├── jobs/
│   │   │   │   ├── job-table.tsx
│   │   │   │   ├── job-filters.tsx
│   │   │   │   └── job-create-dialog.tsx
│   │   │   │
│   │   │   └── ui/                    # shadcn/ui
│   │   │       ├── button.tsx
│   │   │       ├── dialog.tsx
│   │   │       ├── input.tsx
│   │   │       ├── textarea.tsx
│   │   │       ├── select.tsx
│   │   │       ├── table.tsx
│   │   │       ├── card.tsx
│   │   │       └── separator.tsx
│   │   │
│   │   └── lib/
│   │       └── api.ts                 # API Client
│   │
│   ├── components.json                # shadcn config
│   ├── eslint.config.mjs
│   ├── next.config.ts
│   ├── next-env.d.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.mjs
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── backend/                           # Express Backend
│   ├── .env                           # Environment variables
│   ├── node_modules/                  # Dependencies
│   ├── src/
│   │   ├── app.js                     # Express setup
│   │   ├── server.js                  # Entry point
│   │   │
│   │   ├── routes/
│   │   │   └── jobs.routes.js
│   │   │
│   │   ├── controllers/
│   │   │   └── jobs.controller.js
│   │   │
│   │   ├── services/
│   │   │   └── jobs.service.js
│   │   │
│   │   ├── db/
│   │   │   ├── pool.js
│   │   │   └── migrations/
│   │   │       └── 001_create_jobs_table.sql
│   │   │
│   │   ├── utils/
│   │   │   └── webhook.js
│   │   │
│   │   └── types/
│   │       └── job.ts
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── .gitignore
│
└── README.md                          # This file
```

---

## ✨ Features

✅ **Create Jobs** - Add background tasks with name, priority, and JSON payload  
✅ **List & Filter Jobs** - Filter by status (pending, running, completed) and priority  
✅ **Job Details** - View complete job information with formatted JSON payload  
✅ **Run Jobs** - Execute jobs with automatic status transitions  
✅ **Status Tracking** - Real-time job status updates (pending → running → completed)  
✅ **Webhook Integration** - Automatic webhook trigger on job completion  
✅ **Modern UI** - Responsive dashboard with Tailwind CSS  
✅ **Type Safety** - Full TypeScript support  

---

## 📋 Prerequisites

### Required Software

**Node.js & npm**
```bash
# Download from: https://nodejs.org (LTS version)
node --version    # Check installation
npm --version
```

**MySQL 8.0**
```bash
# Download from: https://dev.mysql.com/downloads/mysql
mysql --version   # Check installation
```

**Git**
```bash
# Download from: https://git-scm.com
git --version
```

**Code Editor** (VS Code recommended)
- https://code.visualstudio.com

---

## 🚀 Installation & Setup

### Step 1: Clone Repository

```bash
git clone https://github.com/vaibh-vaibh/dotix-job-scheduler.git
cd dotix-job-scheduler
```

### Step 2: MySQL Database Setup

**Open MySQL Command Line:**

```bash
mysql -u root -p
# Enter your MySQL password
```

**Create Database and Table:**

```sql
CREATE DATABASE dotix_scheduler;
USE dotix_scheduler;

CREATE TABLE IF NOT EXISTS jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  taskName VARCHAR(255) NOT NULL,
  payload JSON NOT NULL,
  priority ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'medium',
  status ENUM('pending', 'running', 'completed') NOT NULL DEFAULT 'pending',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Verify:**

```sql
SHOW DATABASES;
USE dotix_scheduler;
DESC jobs;
```

### Step 3: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
echo PORT=4000 > .env
echo DB_HOST=localhost >> .env
echo DB_USER=root >> .env
echo DB_PASSWORD=your_password >> .env
echo DB_NAME=dotix_scheduler >> .env
echo WEBHOOK_URL=https://webhook.site/your-unique-id >> .env
```

**Edit `.env` with your values:**
- Replace `your_password` with MySQL root password
- Replace `your-unique-id` with webhook.site URL (visit https://webhook.site to get one)

**Verify `package.json` has:**

```json
"scripts": {
  "dev": "nodemon src/server.js",
  "start": "node src/server.js"
}
```

**Start backend:**

```bash
npm run dev
```

You should see:
```
[nodemon] starting `node src/server.js`
Backend listening on port 4000
```

**Keep this terminal open!**

### Step 4: Frontend Setup

**Open new terminal in project root:**

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

You should see:
```
▲ Next.js 15.x.x
- Local: http://localhost:3000
```

**Open in browser:** http://localhost:3000

---

## 📊 Database Schema

### Jobs Table

```sql
CREATE TABLE jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  taskName VARCHAR(255) NOT NULL,
  payload JSON NOT NULL,
  priority ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'medium',
  status ENUM('pending', 'running', 'completed') NOT NULL DEFAULT 'pending',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Column Descriptions

| Column | Type | Purpose |
|--------|------|---------|
| `id` | INT (PK) | Unique job identifier |
| `taskName` | VARCHAR(255) | Job name/title |
| `payload` | JSON | Custom data for job |
| `priority` | ENUM | Task importance level |
| `status` | ENUM | Current execution state |
| `createdAt` | TIMESTAMP | Creation datetime |
| `updatedAt` | TIMESTAMP | Last update datetime |

### Sample Data

```sql
INSERT INTO jobs (taskName, payload, priority, status) VALUES
('Interview Tomorrow', '{"type":"reminder","time":"10:00"}', 'high', 'pending'),
('Daily Report', '{"type":"report","format":"pdf"}', 'medium', 'completed'),
('Data Sync', '{"type":"sync","source":"api"}', 'low', 'running');
```

---

## 🏗 Architecture

### System Flow

```
┌─────────────────┐
│   Next.js UI    │
└────────┬────────┘
         │ HTTP Request
         ↓
┌─────────────────────┐
│ Express.js API      │
├─────────────────────┤
│ -  routes            │
│ -  controllers       │
│ -  services          │
└────────┬────────────┘
         │ Query
         ↓
┌──────────────────────┐
│  MySQL Database      │
│  (jobs table)        │
└──────────────────────┘
```

### Component Flow

1. **Frontend (Next.js)**
   - User creates/manages jobs via UI
   - Sends API requests to backend
   - Displays job status and details

2. **Backend (Express.js)**
   - Handles REST API endpoints
   - Manages database operations
   - Processes job execution
   - Triggers webhooks

3. **Database (MySQL)**
   - Stores job data
   - Tracks status changes
   - Maintains audit timestamps

4. **Webhook**
   - Triggered on job completion
   - Sends POST request with job data
   - Integrates with external services

---

## 📡 API Documentation

### Base URL

```
http://localhost:4000/api
```

### 1. Create Job

```
POST /api/jobs
Content-Type: application/json

Request:
{
  "taskName": "Interview Tomorrow",
  "priority": "high",
  "payload": {
    "type": "email_reminder",
    "subject": "Interview Tomorrow",
    "time": "2026-01-12T10:00:00Z",
    "notes": "Prepare for full-stack interview"
  }
}

Response (201):
{
  "id": 1,
  "taskName": "Interview Tomorrow",
  "payload": {...},
  "priority": "high",
  "status": "pending",
  "createdAt": "2026-01-12T01:00:00.000Z",
  "updatedAt": "2026-01-12T01:00:00.000Z"
}
```

### 2. List Jobs

```
GET /api/jobs

Response (200):
[
  {
    "id": 1,
    "taskName": "Interview Tomorrow",
    "payload": {...},
    "priority": "high",
    "status": "pending",
    "createdAt": "2026-01-12T01:00:00.000Z",
    "updatedAt": "2026-01-12T01:00:00.000Z"
  }
]
```

### 3. Get Job by ID

```
GET /api/jobs/:id

Response (200):
{
  "id": 1,
  "taskName": "Interview Tomorrow",
  "payload": {...},
  "priority": "high",
  "status": "pending",
  "createdAt": "2026-01-12T01:00:00.000Z",
  "updatedAt": "2026-01-12T01:00:00.000Z"
}

Response (404):
{
  "message": "Job not found"
}
```

### 4. Run Job

```
POST /api/jobs/run/:id

Response (200):
{
  "id": 1,
  "taskName": "Interview Tomorrow",
  "payload": {...},
  "priority": "high",
  "status": "running",
  "createdAt": "2026-01-12T01:00:00.000Z",
  "updatedAt": "2026-01-12T01:00:00.000Z"
}

Timeline:
- T+0s: Status = "running"
- T+3s: Status = "completed"
- T+3s: Webhook triggered
```

## 🔗 Webhook Integration

### How Webhooks Work

1. **Job Completion** - Job finishes execution after 3 seconds
2. **Status Update** - Status changed to `completed`
3. **Webhook Trigger** - Backend sends POST request to webhook URL
4. **Payload Delivery** - Job details sent as JSON

### Webhook Payload

```json
{
  "jobId": 1,
  "taskName": "Interview Tomorrow",
  "priority": "high",
  "payload": {
    "type": "email_reminder",
    "subject": "Interview Tomorrow",
    "time": "2026-01-12T10:00:00Z",
    "notes": "Prepare for full-stack interview"
  },
  "completedAt": "2026-01-12T01:00:05.123Z"
}
```

###Testing with webhook.site
1. Visit https://webhook.site
2. Copy your unique webhook URL (shown at top of page)
3. Add to backend/.env:
WEBHOOK_URL=https://webhook.site/abc123def456

4. Restart backend: npm run dev
5. Create a job in the dashboard
6. Click "Run Job"
7. Wait 3-4 seconds for job to complete
8. Check webhook.site dashboard - you should see incoming POST request
9. Click the request to view headers and payload
