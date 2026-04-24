# EmployeeHub

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Java](https://img.shields.io/badge/Java_21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

A full-stack Employee Management System built as a portfolio project to demonstrate production-grade development practices — including Docker containerisation, JWT authentication, role-based access control, REST API design, and automated CI/CD pipelines.

> 🚀 **Live Demo:** [employee-hub-rho.vercel.app](https://employee-hub-rho.vercel.app)

> 💻 **Run locally with a single command:** `docker-compose up`

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Security](#security)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Roadmap](#roadmap)
- [License](#license)

---

## ✨ Features

- 🔐 JWT authentication with HttpOnly cookies
- 👥 Role-Based Access Control (ADMIN / VIEWER)
- 👨‍💼 Full Employee CRUD with department assignment
- 🏢 Department management with full CRUD
- 🔍 Live search across name and email fields
- 📄 Pagination with configurable page size
- 🐳 Fully containerised with Docker and Docker Compose
- 🚀 Deployed on Railway (backend) and Vercel (frontend)
- ⚙️ CI/CD pipeline via GitHub Actions
- 🔒 Secrets managed via environment variables

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular, TypeScript, HTML, CSS, Bootstrap |
| Backend | Java 21, Spring Boot 3, Spring Security, Spring Data JPA |
| Database | MySQL 8 |
| Authentication | JWT (JJWT), HttpOnly Cookies, RBAC |
| Containerisation | Docker, Docker Compose |
| Web Server | Nginx (serves Angular in production) |
| Hosting | Railway (backend + DB), Vercel (frontend) |
| CI/CD | GitHub Actions |
| Build Tools | Maven (backend), NPM (frontend) |

---

## 🏗️ Architecture

```
Browser
   │
   ▼
┌─────────────────────────────────────────────────┐
│              Production (Cloud)                  │
│                                                  │
│  ┌──────────────┐        ┌────────────────────┐  │
│  │    Vercel    │        │      Railway       │  │
│  │   Frontend   │───────▶│     Backend        │  │
│  │   Angular    │  HTTPS │   Spring Boot      │  │
│  │     CDN      │        │    Port 8080       │  │
│  └──────────────┘        └────────┬───────────┘  │
│                                   │              │
│                                   ▼              │
│                          ┌────────────────────┐  │
│                          │      Railway       │  │
│                          │     Database       │  │
│                          │     MySQL 8        │  │
│                          └────────────────────┘  │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│              Local (Docker Compose)              │
│                                                  │
│  ┌──────────────┐        ┌────────────────────┐  │
│  │   Frontend   │        │      Backend       │  │
│  │  Angular +   │───────▶│   Spring Boot      │  │
│  │    Nginx     │        │    Port 8080       │  │
│  │   Port 80    │        └────────┬───────────┘  │
│  └──────────────┘                 │              │
│                                   ▼              │
│                          ┌────────────────────┐  │
│                          │     Database       │  │
│                          │     MySQL 8        │  │
│                          │    Port 3306       │  │
│                          └────────────────────┘  │
└─────────────────────────────────────────────────┘
```

---

## 🔐 Security

- **JWT tokens** stored in HttpOnly cookies — not accessible by JavaScript
- **BCrypt** password hashing — passwords never stored in plain text
- **RBAC** — ADMIN can create/update/delete, VIEWER can only read
- **Spring Security** filter chain validates JWT on every request
- **CORS** configured for production and local origins
- **SameSite=None; Secure** cookies for cross-domain production auth

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
JWT_SECRET=yourSecretKeyThatIsLongEnough
JWT_EXPIRATION=86400000
```

**3. Start the entire stack**
```bash
docker-compose up --build
```

**4. Register a user**
```
POST http://localhost:8080/api/auth/register
{
  "username": "admin",
  "password": "admin123",
  "role": "ADMIN"
}
```

**5. Open the app**

| Service | URL |
|---|---|
| Frontend | http://localhost |
| Backend API | http://localhost:8080/api/v1/employees |

To stop everything:
```bash
docker-compose down
```

---

## 📡 API Documentation

### Auth Endpoints
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | /api/auth/register | Public | Register new user |
| POST | /api/auth/login | Public | Login and receive JWT cookie |
| POST | /api/auth/logout | Public | Clear JWT cookie |

### Employee Endpoints
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | /api/v1/employees | ADMIN, VIEWER | Get paginated employee list |
| GET | /api/v1/employees/{id} | ADMIN, VIEWER | Get employee by ID |
| GET | /api/v1/employees/search?keyword= | ADMIN, VIEWER | Search employees |
| POST | /api/v1/employees | ADMIN | Create employee |
| PUT | /api/v1/employees/{id} | ADMIN | Update employee |
| DELETE | /api/v1/employees/{id} | ADMIN | Delete employee |

### Department Endpoints
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | /api/v1/departments | ADMIN, VIEWER | Get all departments |
| GET | /api/v1/departments/{id} | ADMIN, VIEWER | Get department by ID |
| POST | /api/v1/departments | ADMIN | Create department |
| PUT | /api/v1/departments/{id} | ADMIN | Update department |
| DELETE | /api/v1/departments/{id} | ADMIN | Delete department |

---

## 📁 Project Structure

```
EmployeeHub/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD pipeline
├── docker-compose.yml          # Orchestrates all 3 services
├── .env.example                # Environment variable template
├── .gitignore
│
├── employee-backend/           # Spring Boot REST API
│   ├── Dockerfile              # Multi-stage build (Maven → JRE Alpine)
│   ├── pom.xml
│   └── src/main/java/com/employee/project/
│       ├── controller/         # HTTP layer (AuthController, EmployeeController, DepartmentController)
│       ├── service/            # Business logic (EmployeeService, DepartmentService, AuthService)
│       ├── repository/         # Data access (EmployeeRepository, DepartmentRepository)
│       ├── model/              # JPA entities (Employee, Department, User)
│       ├── security/           # JWT filter, SecurityConfig, JwtUtil
│       └── dto/                # Data transfer objects (PageResponse)
│
└── employee-frontend/          # Angular SPA
    ├── Dockerfile              # Multi-stage build (Node → Nginx)
    ├── nginx.conf              # Angular routing support
    └── src/app/
        ├── auth.service.ts     # Login/logout/role management
        ├── auth.guard.ts       # Route protection
        ├── auth.interceptor.ts # Adds withCredentials to all requests
        ├── employee/           # Employee components
        └── department/         # Department components
```

---

## 🗺️ Roadmap

- [x] **Phase 1 — Docker** — Containerise full stack with Docker Compose
- [x] **Phase 2 — Security** — Spring Security + JWT + RBAC
- [x] **Phase 3 — Features** — Search, pagination, departments, service layer
- [x] **Phase 4 — Hosting** — Railway (backend/DB) + Vercel (frontend)
- [x] **Phase 5 — CI/CD** — GitHub Actions pipeline

---

## 🔑 Environment Variables

| Variable | Description | Example |
|---|---|---|
| `MYSQL_ROOT_PASSWORD` | MySQL root password | `secret` |
| `MYSQL_DATABASE` | Database name | `employeedb` |
| `DB_USERNAME` | Backend DB username | `root` |
| `DB_PASSWORD` | Backend DB password | `secret` |
| `DB_URL` | Full JDBC connection URL | `jdbc:mysql://db:3306/employeedb` |
| `JWT_SECRET` | Secret key for JWT signing | `mySecretKey...` |
| `JWT_EXPIRATION` | Token expiry in milliseconds | `86400000` |
| `ALLOWED_ORIGINS` | Allowed CORS origins (production) | `https://app.vercel.app` |
| `ENVIRONMENT` | Environment name | `production` |

> ⚠️ Never commit your `.env` file. It is excluded via `.gitignore`.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).