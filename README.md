# Student Management System (SMS)
> **Full-Stack CRUD Web Application**  
> *Developed in compliance with the College Practical Standard Operating Procedure (SOP)*

---

## 📌 1. Project Overview

The **Student Management System (SMS)** is a practical, beginner-friendly full-stack web application designed to manage student academic records. Built with **React** on the frontend, **Python & Django REST Framework (DRF)** on the backend, and **SQLite** for relational data persistence, it demonstrates end-to-end CRUD operations, dual-layer validation, RESTful API architecture, and responsive user experience.

---

## 🎯 2. Objectives & Problem Statement

### Problem Statement
In educational institutions, student records are frequently maintained in paper registers or unstructured spreadsheets. This leads to duplicate roll numbers, typographical errors, slow searching, and potential data corruption.

### Project Objectives
1. **Centralize Records:** Provide a single repository for student details (roll number, name, email, course, age).
2. **Enforce Integrity:** Prevent duplicate roll numbers and invalid emails using dual-layer (client + server) validation.
3. **Streamline CRUD:** Provide instantaneous Create, Read, Update, and Delete actions with immediate UI feedback.
4. **RESTful Architecture:** Decouple the frontend and backend using standardized HTTP methods and JSON data interchange.

---

## 🛠️ 3. Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React 19, JavaScript (ES6+), HTML5 | Component-driven reactive UI with local state and conditional rendering. |
| **Styling** | Tailwind CSS | Modern, responsive utility-first CSS layout. |
| **Backend** | Python 3, Django 5.x, Django REST Framework | Robust web framework providing Model-View-Set routing, serializers, and CORS support. |
| **Database** | SQLite 3 | Serverless, zero-configuration relational database engine bundled with Python. |
| **API Testing** | Postman | Testing tool for asserting HTTP status codes and JSON payloads. |
| **Version Control**| Git + GitHub | Tracking commit history and versioned development. |

---

## 🏗️ 4. System Architecture & Workflow

```text
[ React Frontend ]  <--- HTTP JSON (fetch / Axios) --->  [ Django REST API ]  <--- ORM --->  [ SQLite DB ]
  - Add/Edit Form                                            - urls.py (Router)              (db.sqlite3)
  - Student Table                                            - views.py (ModelViewSet)
  - Search & Filter                                          - serializers.py (Validation)
  - Notifications                                            - models.py (Schema)
```

### Complete CRUD Flow
* **CREATE:** User fills form $\rightarrow$ React performs frontend validation $\rightarrow$ sends `POST /api/students/` $\rightarrow$ Django serializer validates constraints $\rightarrow$ SQLite inserts row $\rightarrow$ returns `201 Created` $\rightarrow$ React updates state.
* **READ:** Component mounts $\rightarrow$ sends `GET /api/students/` $\rightarrow$ Django queries `Student.objects.all()` $\rightarrow$ returns `200 OK` $\rightarrow$ React displays table.
* **UPDATE:** User clicks Edit $\rightarrow$ record pre-populates form $\rightarrow$ user modifies fields $\rightarrow$ sends `PUT /api/students/{id}/` $\rightarrow$ Django updates SQLite row $\rightarrow$ returns `200 OK` $\rightarrow$ React updates table.
* **DELETE:** User clicks Delete $\rightarrow$ confirmation dialog appears $\rightarrow$ sends `DELETE /api/students/{id}/` $\rightarrow$ Django deletes record $\rightarrow$ returns `204 No Content` $\rightarrow$ React removes record from view.

---

## 🗄️ 5. Database Design (SQLite)

### Table: `students_student`

| Column | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | `PRIMARY KEY`, `AUTOINCREMENT` | Unique database identifier. |
| `roll_number` | `VARCHAR(20)` | `NOT NULL`, `UNIQUE` | Student institutional ID (e.g., `CS202601`). |
| `name` | `VARCHAR(100)` | `NOT NULL` | Student full legal name. |
| `email` | `VARCHAR(100)` | `NOT NULL`, `UNIQUE` | Student institutional email. |
| `course` | `VARCHAR(50)` | `NOT NULL` | Branch/Program of study. |
| `age` | `INTEGER` | `NOT NULL` | Positive integer (16 to 99). |

### Text-Based Entity-Relationship Diagram (ERD)
```text
+--------------------------------------------------------+
|                     STUDENTS_STUDENT                   |
+--------------------------------------------------------+
| PK | id          : INTEGER (Auto-increment)            |
| UQ | roll_number : VARCHAR(20) (Required, Unique)      |
|    | name        : VARCHAR(100) (Required)             |
| UQ | email       : VARCHAR(100) (Required, Unique)     |
|    | course      : VARCHAR(50) (Required)              |
|    | age         : INTEGER (Required, 16-99)           |
+--------------------------------------------------------+
```

---

## 🌐 6. REST API Endpoints

| HTTP Method | Endpoint | Description | Request Body | Success Code | Error Code |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/students/` | List all students | None | `200 OK` | `500 Server Error` |
| **POST** | `/api/students/` | Register student | `{ roll_number, name, email, course, age }` | `201 Created` | `400 Bad Request` |
| **GET** | `/api/students/{id}/` | Retrieve single student | None | `200 OK` | `404 Not Found` |
| **PUT** | `/api/students/{id}/` | Update full student record | `{ roll_number, name, email, course, age }` | `200 OK` | `400 / 404` |
| **PATCH** | `/api/students/{id}/` | Partial update | Any subset of fields | `200 OK` | `400 / 404` |
| **DELETE** | `/api/students/{id}/` | Delete student record | None | `204 No Content` | `404 Not Found` |

### Sample JSON Request (POST /api/students/)
```json
{
  "roll_number": "CS202605",
  "name": "Ananya Roy",
  "email": "ananya.roy@college.edu",
  "course": "Computer Science",
  "age": 20
}
```

### Sample JSON Response (201 Created)
```json
{
  "id": 5,
  "roll_number": "CS202605",
  "name": "Ananya Roy",
  "email": "ananya.roy@college.edu",
  "course": "Computer Science",
  "age": 20
}
```

---

## 💻 7. Installation & Setup Instructions

### Prerequisites
* Python 3.10+ installed (`python --version`)
* Node.js 18+ and npm installed (`node -v`, `npm -v`)
* Git installed (`git --version`)

---

### Step 1: Clone or Set Up Repository
```bash
git clone https://github.com/YOUR_USERNAME/student-management-system.git
cd student-management-system
```

---

### Step 2: Backend Setup (Django REST Framework)
```bash
# 1. Navigate to backend directory
cd backend

# 2. Create and activate a Python virtual environment
python -m venv venv

# On Linux/macOS:
source venv/bin/activate
# On Windows Command Prompt:
# venv\Scripts\activate

# 3. Install required packages
pip install django djangorestframework django-cors-headers

# 4. Apply database migrations to generate SQLite schema
python manage.py makemigrations
python manage.py migrate

# 5. Start the backend development server
python manage.py runserver 8000
```
*Backend runs on:* `http://127.0.0.1:8000/`  
*API Root:* `http://127.0.0.1:8000/api/students/`

---

### Step 3: Frontend Setup (React)
Open a **new terminal tab/window**:
```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
```
*Frontend runs on:* `http://localhost:3000` (or `http://localhost:5173`)

---

## 🧪 8. Postman Testing Procedures

| Test Case # | Method | Endpoint | Description / Test Scenario | Expected Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC01** | `POST` | `/api/students/` | Create student with valid data | `201 Created` |
| **TC02** | `POST` | `/api/students/` | Create student with missing name/email | `400 Bad Request` |
| **TC03** | `POST` | `/api/students/` | Create student with invalid email format | `400 Bad Request` |
| **TC04** | `POST` | `/api/students/` | Create student with duplicate roll number | `400 Bad Request` |
| **TC05** | `GET` | `/api/students/` | Retrieve all student records | `200 OK` |
| **TC06** | `GET` | `/api/students/999/` | Retrieve non-existent student ID | `404 Not Found` |
| **TC07** | `PUT` | `/api/students/1/` | Update valid student record | `200 OK` |
| **TC08** | `PUT` | `/api/students/999/` | Update non-existent student ID | `404 Not Found` |
| **TC09** | `DELETE` | `/api/students/1/` | Delete valid student record | `204 No Content` |
| **TC10** | `DELETE` | `/api/students/999/` | Delete non-existent student ID | `404 Not Found` |

---

## 🔒 9. Security & Validation Practices

1. **Dual Validation:**
   - *Client-Side:* Fast immediate feedback for UX, checking empty fields, email regex, and age range.
   - *Server-Side:* Django serializers rigorously re-validate types and enforce database `UNIQUE` constraints to protect against bypass attacks.
2. **SQL Injection Prevention:** Uses Django's Object-Relational Mapper (ORM), which automatically sanitizes inputs and executes parameterized SQL queries.
3. **Environment Isolation:** Secrets and debug flags are loaded from environment variables rather than being hard-coded.
4. **CORS Whitelisting:** Restricted cross-origin resource sharing allowing only trusted frontend origins to communicate with `/api/*`.

---

## 📦 10. Recommended Git Workflow

### 1. Initialize and Add Files
```bash
git init
git add .
git commit -m "feat: initial commit for Student Management System"
```

### 2. Standard Commit Messages
* `feat: add Student model and serializers`
* `feat: configure Django REST Framework viewset and endpoints`
* `feat: implement student list and add modal in React`
* `fix: prevent duplicate roll number submissions in form`
* `docs: complete README and project report documentation`

### 3. Files Ignored via `.gitignore`
* `venv/` (Python virtual environment)
* `node_modules/` (Frontend packages)
* `*.pyc`, `__pycache__/` (Python bytecode)
* `db.sqlite3` (Optional: can be excluded from production repos)
* `.env` (Secret environment variables)

---

## 🎓 11. Viva Questions & Quick Answers

* **Q1: What is CRUD?**  
  *A:* CRUD stands for Create, Read, Update, and Delete — the four fundamental persistent storage operations.
* **Q2: Why is server-side validation necessary when frontend validation is already active?**  
  *A:* Frontend validation can easily be bypassed using tools like curl, Postman, or disabled browser JavaScript. Server validation ensures data integrity at the system boundary.
* **Q3: What is the purpose of a Serializer in Django REST Framework?**  
  *A:* It converts complex Django model instances into JSON for API responses, and validates incoming JSON to convert it back into model instances.
* **Q4: What is the difference between PUT and PATCH?**  
  *A:* `PUT` replaces the entire record with the new payload; `PATCH` updates only the specified attributes of an existing record.
* **Q5: What is CORS?**  
  *A:* Cross-Origin Resource Sharing is a browser security mechanism that blocks requests made from one domain/port (e.g., React on 3000) to another (e.g., Django on 8000) unless explicitly allowed by backend headers.

---

## 📄 12. License & Author
* **Project Name:** Student Management System (SMS)
* **Purpose:** Academic College Activity SOP Demonstration
* **License:** MIT
