# 👔 Employee Management System

A full-stack web application designed to manage employee records efficiently. Built using **Angular** for the frontend and **Java Spring Boot** for the backend, with **MySQL** as the database.

## 🛠️ Tech Stack

* **Frontend:** Angular (TypeScript, HTML, CSS)
* **Backend:** Java Spring Boot (REST API)
* **Database:** MySQL
* **Build Tools:** Maven (Backend), NPM (Frontend)

## ✨ Features

* **Add Employee:** Create new employee records.
* **View Employees:** List all employees with details.
* **Update Employee:** Edit existing employee information.
* **Delete Employee:** Remove employee records from the system.
* **View Details:** Access specific details for individual employees.

## 🚀 Getting Started

### 1. Database Setup
1.  Open MySQL Workbench or your terminal.
2.  Create a database (e.g., `employee_db`).
3.  Open `employee-backend/src/main/resources/application.properties` and update your MySQL username and password:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
    spring.datasource.username=your_username
    spring.datasource.password=your_password
    ```

### 2. Backend Setup (Spring Boot)
1.  Navigate to the backend folder:
    ```bash
    cd employee-backend
    ```
2.  Run the application:
    ```bash
    mvn spring-boot:run
    ```
   *The backend will start on `http://localhost:8080`.*

### 3. Frontend Setup (Angular)
1.  Open a new terminal and navigate to the frontend folder:
    ```bash
    cd employee-frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    ng serve
    ```
   *The application will be available at `http://localhost:4200`.*
