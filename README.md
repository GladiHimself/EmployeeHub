# EmployeeHub

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Java](https://img.shields.io/badge/Java_21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

A full-stack Employee Management System built as a portfolio project to demonstrate production-grade development practices — including Docker containerisation, multi-stage builds, environment-based secrets management, and REST API design.

> 🚀 **Entire stack runs with a single command:** `docker-compose up`

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)

---

## ✨ Features

- View, create, update, and delete employees
- RESTful API with Spring Boot and JPA/Hibernate
- Responsive Angular frontend served via Nginx
- Fully containerised with Docker and Docker Compose
- Secrets managed via environment variables — no hardcoded credentials
- MySQL data persisted across container restarts via Docker volumes
- CORS configured for cross-container communication

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular, TypeScript, HTML, CSS |
| Backend | Java 21, Spring Boot 3, Spring Data JPA |
| Database | MySQL 8 |
| Containerisation | Docker, Docker Compose |
| Web Server | Nginx (serves Angular in production) |
| Build Tools | Maven (backend), NPM (frontend) |

---

## 🏗️ Architecture

```
Browser
   │
   ▼
┌─────────────────────────────────────────┐
│           Docker Network                │
│                                         │
│  ┌──────────────┐   ┌────────────────┐  │
│  │   Frontend   │   │    Backend     │  │
│  │  Angular +   │──▶│  Spring Boot   │  │
│  │    Nginx     │   │   Port 8080    │  │
│  │   Port 80    │   └───────┬────────┘  │
│  └──────────────┘           │           │
│                             ▼           │
│                    ┌────────────────┐   │
│                    │   Database     │   │
│                    │   MySQL 8      │   │
│                    │   Port 3306    │   │
│                    └────────────────┘   │
└─────────────────────────────────────────┘
```

Each service runs in its own container. Docker Compose orchestrates startup order — MySQL starts and passes a health check before the backend connects, preventing race conditions.

The database is never exposed to the host machine directly. Only the frontend (port 80) and backend (port 8080) are accessible from your browser.

---

## 🚀 Getting Started

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

That's it. No Java, Node, or MySQL installation required.

### Setup

**1. Clone the repository**
```bash
git clone https://github.com/GladiHimself/EmployeeHub.git
cd EmployeeHub
```

**2. Create your environment file**
```bash
cp .env.example .env
```

Edit `.env` with your preferred credentials:
```
MYSQL_ROOT_PASSWORD=your_password
MYSQL_DATABASE=employeedb
DB_USERNAME=root
DB_PASSWORD=your_password
DB_URL=jdbc:mysql://db:3306/employeedb
```

**3. Start the entire stack**
```bash
docker-compose up --build
```

**4. Open the app**

| Service | URL |
|---|---|
| Frontend | http://localhost |
| Backend API | http://localhost:8080/api/v1/employees |

To stop everything:
```bash
docker-compose down
```

---

## 📁 Project Structure

```
EmployeeHub/
├── docker-compose.yml          # Orchestrates all 3 services
├── .env.example                # Environment variable template
├── .gitignore                  # Excludes .env and build artifacts
│
├── employee-backend/           # Spring Boot REST API
│   ├── Dockerfile              # Multi-stage build (Maven → JRE Alpine)
│   ├── pom.xml
│   └── src/
│       └── main/
│           ├── java/com/employee/project/
│           │   ├── EmployeeBackendApplication.java
│           │   ├── CorsConfig.java     # CORS configuration
│           │   ├── controller/
│           │   ├── model/
│           │   ├── repository/
│           │   └── service/
│           └── resources/
│               └── application.properties
│
└── employee-frontend/          # Angular SPA
    ├── Dockerfile              # Multi-stage build (Node → Nginx)
    ├── .dockerignore           # Excludes node_modules from build context
    └── src/
        └── app/
            ├── employee.service.ts
            ├── employee.ts
            └── components/
```

---

## 🗺️ Roadmap

- [x] **Phase 1 — Docker** — Containerise full stack with Docker Compose
- [ ] **Phase 2 — Security** — Spring Security + JWT authentication + Role-Based Access Control
- [ ] **Phase 3 — Features** — Search, pagination, departments, file upload, audit log, dashboard
- [ ] **Phase 4 — Hosting** — Deploy to Railway (backend/DB) + Vercel (frontend)
- [ ] **Phase 5 — CI/CD** — GitHub Actions pipeline for automated builds and deployments

---

## 🔑 Environment Variables

| Variable | Description | Example |
|---|---|---|
| `MYSQL_ROOT_PASSWORD` | MySQL root password | `secret` |
| `MYSQL_DATABASE` | Database name to create | `employeedb` |
| `DB_USERNAME` | Backend DB username | `root` |
| `DB_PASSWORD` | Backend DB password | `secret` |
| `DB_URL` | Full JDBC connection URL | `jdbc:mysql://db:3306/employeedb` |

> ⚠️ Never commit your `.env` file. It is excluded via `.gitignore`.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).