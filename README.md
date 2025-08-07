# 🧠 Real-Time Collaborative Task Board

Real-Time Collaborative Task Board is a modern, interactive web application designed for teams to plan, organize, and collaborate on tasks in real time. Built using React, Vite, Redux Toolkit, Socket.IO, and React-Beautiful-DnD, it brings the Trello-like experience with real-time multi-user synchronization.

---

## 🚀 Features

- 🔄 Real-time sync between clients via Socket.IO
- 🧲 Drag and drop tasks & columns
- 👥 User presence indicator

---

##  Setup & Run Instructions

###  Prerequisites

- Node.js `>=18.x`
- npm `>=9.x`

---

### Run Backend (Socket.IO server)
- cd server
- npm install
- node index.js
  
---

### Run Frontend (React + Vite)
- npm run dev

---
## Real-Time Architecture & Data Flow
### State Flow
- Redux Toolkit holds the board state
- Socket.IO syncs state changes across clients
- React-Beautiful-DnD manages drag interactions

## Deployments
- Frontend: https://real-time-task-board-stvl.vercel.app/ (Vercel)
- Backend: https://realtime-taskboard-backend.onrender.com/ (Render)
