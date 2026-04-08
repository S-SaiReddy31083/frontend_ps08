# 🌐 Frontend - Citizen–Politician Interaction System

## 📌 Project Overview

The frontend of the **Citizen–Politician Interaction System** is a web-based user interface that enables citizens, politicians, administrators, and moderators to interact with the system efficiently. It is designed to provide a clean, responsive, and user-friendly experience for reporting, tracking, and analyzing public issues.

---

## 🚀 Features

### 👤 Authentication

* User Signup and Login functionality
* Role-based access (Citizen, Politician, Admin, Moderator)
* Session handling using localStorage

### 🧑‍🤝‍🧑 Citizen Features

* Submit issues with:

  * Title and description
  * Category selection
  * Location (manual + geolocation)
  * Image and video upload
* View submitted issues
* Vote on issues

### 🏛️ Politician Features

* View all reported issues
* Analyze issues using charts
* Category-wise statistics

### 🛠️ Admin & Moderator Features

* Manage users and roles
* Monitor and control issues
* Update issue status

### 📊 UI/UX

* Responsive design using CSS
* Clean dashboard layouts
* Interactive alerts and loading indicators

---

## 🧱 Tech Stack

| Technology           | Purpose                    |
| -------------------- | -------------------------- |
| HTML5                | Structure of web pages     |
| CSS3                 | Styling and layout         |
| JavaScript (Vanilla) | Client-side logic          |
| Chart.js             | Data visualization         |
| Fetch API            | Communication with backend |
| LocalStorage         | Session management         |

---

## 📂 Project Structure

```
frontend/
│
├── css/
│   └── style.css
│
├── js/
│   ├── auth.js
│   ├── citizen.js
│   ├── politician.js
│   └── config.js
│
├── pages/
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── citizen.html
│   ├── politician.html
│   ├── admin.html
│   ├── moderator.html
│   └── contact.html
│
└── assets/
```

---

## 🔗 API Integration

The frontend communicates with the backend using REST APIs via the Fetch API.

### Base URL

```
http://localhost:9191
```

### Key Endpoints

* `POST /api/auth/signup` → Register user
* `POST /api/auth/login` → Login user
* `GET /api/issues` → Fetch all issues
* `POST /api/issues` → Create new issue
* `POST /api/issues/{id}/vote` → Vote on issue

---

## ⚙️ How It Works

1. User interacts with the UI (forms, buttons)
2. JavaScript captures input data
3. Fetch API sends request to backend
4. Backend processes request and returns JSON response
5. Frontend updates UI dynamically

---

## 🧪 Running the Frontend

1. Clone the repository
2. Open the project folder
3. Run using Live Server OR open `index.html` in browser
4. Ensure backend server is running at `http://localhost:9191`

---

## 🔐 Role-Based Navigation

After login:

* Citizen → `citizen.html`
* Politician → `politician.html`
* Admin → `admin.html`
* Moderator → `moderator.html`

---

## 📍 Key Functionalities Explained

### Authentication

Handles login and signup using API calls and stores session data in localStorage.

### Issue Submission

Uses `FormData` to send text and media files to backend.

### Data Fetching

Uses async/await with Fetch API to retrieve and display data dynamically.

### Analytics

Processes issue data and displays charts using Chart.js.

---

## ⚠️ Requirements

* Modern web browser
* Backend server running (Spring Boot)
* Internet connection (for CDN like Chart.js)

---

## 📈 Future Enhancements

* Real-time notifications
* Mobile responsive improvements
* Map integration for issue tracking
* Push notifications

---

## 👨‍💻 Author

Developed as part of academic project: **Citizen–Politician Interaction System**

---

## 📄 License

This project is for educational purposes only.
