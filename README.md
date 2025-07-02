🗂️  Todo Task Management Web Application

> **A full‑stack, real‑time, collaborative Todo Manager built for the Katomaran Hackathon (July 2025).**  
> Users log in via Google OAuth, create & share tasks, and see updates instantly—anywhere, on any device.

---

## 🔥 Live Demo
Link: 


## 🧠 Key Features

| Category         | Details |
|------------------|---------|
| **Auth**         | Google OAuth 2.0 ➜ JWT session cookies (HttpOnly, Secure) |
| **Tasks**        | CRUD (title, desc, due, priority, status) |
| **Sharing**      | Share by email / username (role‑based read/write) |
| **Filters**      | Due today, overdue, priority, status, text search |
| **Real‑Time**    | Socket.io ⇒ instant task & status sync |
| **UX**           | Responsive Tailwind UI, dark‑mode, glassmorphism cards, Framer‑Motion anims |
| **Reliability**  | Rate‑limiting, Zod input validation, Helm chart for scaling (future) |
| **Offline**      | Workbox PWA + IndexedDB sync queue |
| **Tooling**      | ESLint, Prettier, Husky, CI tests (Vitest + Supertest) |

---

## ⚙️ Tech Stack

- **Frontend:** React 18 + Vite • Tailwind CSS • React Router • Framer Motion • @react‑oauth/google
- **Backend:** Node.js 20 • Express 5 • Socket.io • Mongoose 7 • JWT • Zod
- **Database:** MongoDB Atlas (M0 Free tier)
- **Deployment:**  
  - **Frontend →** Vercel  
  - **Backend →** Render (Docker)  
  - **Static assets** (Diagram, video thumb) → GitHub  
- **DevOps:** GitHub Actions CI/CD • Docker multi‑stage build

---

## 📐 Architecture Diagram

The following diagram illustrates client–server interactions, real‑time channels, and data flow:

![Architecture Diagram](./A_flowchart_diagram_of_a_todo_task_management_web_.png)

---

## 🚀 Getting Started Locally

### 1 · Prerequisites

| Tool | Version |
|------|---------|
| Node | 18 or 20 |
| npm  | ≥ 9 |
| MongoDB Atlas | Free tier cluster |
| Git | ≥ 2.40 |

### 2 · Clone & Install

```bash
git clone https://github.com/<your‑github‑username>/todo-collab-hackathon.git
cd todo-collab-hackathon
npm run setup          # boots both client & server installs via turbo / npm‑workspaces
````

### 3 · Environment Variables

Create the files below (examples provided):

`./apps/server/.env`

```env
PORT=5000
JWT_SECRET=super‑secret‑change‑me
MONGO_URI=mongodb+srv://20ees17hemaharsan:Harsan@2005@cluster0.raxadg4.mongodb.net/todo?retryWrites=true&w=majority
GOOGLE_CLIENT_ID=684694536627-ateve9dq2qlrhp4ju8h0887ct2fcn0aa.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
CLIENT_URL=http://localhost:5173
```

`./apps/client/.env`

```env
VITE_GOOGLE_CLIENT_ID=684694536627-ateve9dq2qlrhp4ju8h0887ct2fcn0aa.apps.googleusercontent.com
VITE_API_URL=http://localhost:5000/api
```

### 4 · Run Dev Mode

```bash
# in repo root
npm run dev          # concurrently runs client (5173) & server (5000)
```

Open **[http://localhost:5173](http://localhost:5173)** and sign in with Google.

---

## 📑 REST API (+ WS) Reference

| Method   | Endpoint                | Description                                     |
| -------- | ----------------------- | ----------------------------------------------- |
| `POST`   | `/api/auth/google`      | Exchange Google OAuth code ⇒ JWT                |
| `GET`    | `/api/tasks`            | List tasks (query ≈ `?status=&priority=&page=`) |
| `POST`   | `/api/tasks`            | Create task                                     |
| `PUT`    | `/api/tasks/:id`        | Update task                                     |
| `DELETE` | `/api/tasks/:id`        | Delete task                                     |
| `POST`   | `/api/tasks/:id/share`  | Share with another user                         |
| **WS**   | `ws://<api‑url>/socket` | Emits `taskUpdated`, `taskCreated`…             |

Full docs live at **`/docs`** swagger route.

---

## 📁 Folder Structure (Monorepo)

```
.
├─ apps/
│  ├─ client/    # React‑Vite source
│  └─ server/    # Express API + Socket.io
├─ packages/
│  └─ ui/        # Reusable tailwind component library
├─ .github/workflows/  # CI pipelines
└─ README.md
```

---

## 📹 Loom Demo

[![Watch the demo](https://img.shields.io/badge/Click‑to‑Watch‑Demo-purple?logo=loom)](https://www.loom.com/share/<video‑id>)

---

## 📄 Assumptions

* Only Google OAuth implemented for scope & time; GitHub/Facebook left as stretch goals.
* “Share task” permission model: **owner** (full) / **collaborator** (read‑write).
* Real‑time delivered via Socket.io; SSE fallback not implemented.

---

## 🔮 Roadmap / Future Work

* GitHub & Facebook OAuth
* Push‑notification reminders (Web Push + service worker)
* Kanban board view
* Unit‑test coverage ≥ 90 %
* Terraform infra‑as‑code for one‑click deploy

---

## 💬 Prompts Used with AI Tools

See [`PROMPTS.md`](./PROMPTS.md) for the complete list of ChatGPT prompts leveraged during development—including UI tweaks, OAuth troubleshooting, MongoDB setup, and this README.

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for details.

---

## 📌 Hackathon Note

> **This project is a part of a hackathon run by [https://www.katomaran.com](https://www.katomaran.com).**

---