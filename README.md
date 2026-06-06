Task Manager Application 🚀

A full-stack Task Management application built using **Django REST Framework (DRF)** for the backend API and **React (Vite)** for the frontend interface. The application features user authentication, protected API endpoints, and full CRUD operations for managing tasks.

---

## 🌐 Live Deployment Links

- **Frontend App:** [https://task-manager-frontend-2mn2.onrender.com/](https://task-manager-frontend-2mn2.onrender.com/)
- **Backend API:** [https://task-manager-backend-41j6.onrender.com](https://task-manager-backend-41j6.onrender.com)

---

## 🛠️ Project Structure

```text
task-manager/
│
├── backend/               # Django REST Framework Backend
│   ├── backend/           # Project Configuration (settings.py, urls.py)
│   ├── tasks/             # Task Management App (models, views, urls)
│   ├── manage.py
│   └── requirements.txt   # Backend dependencies
│
└── frontend/              # React + Vite Frontend
    ├── src/               # React Source Code (components, assets, API config)
    ├── index.html
    ├── package.json       # Frontend dependencies
    └── vite.config.js

```

---

## 💻 Local Setup Instructions

### 1. Prerequisites

Ensure you have the following installed on your machine:

* Python (v3.10 or higher)
* Node.js (v18 or higher) & npm

---

### 2. Backend Setup (Django)

Navigate to the `backend` folder and set up a virtual environment:

```bash
# Navigate to backend directory
cd backend

# Create a virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install required dependencies
pip install -r requirements.txt

# Run database migrations
python manage.py migrate

# Start the local development server
python manage.py runserver

```

The backend API will now be running locally at `http://127.0.0.1:8000/`.

---

### 3. Frontend Setup (React + Vite)

Open a new terminal window, navigate to the `frontend` folder, and configure the system:


# Navigate to frontend directory
cd frontend

# Install Node modules/dependencies
npm install

# Start the local frontend development server
npm run dev

```

The frontend interface will now be accessible locally at `http://localhost:5173/`.

---

🔐 Environment Variables Configuration

To toggle smoothly between local development and production environments, the frontend utilizes an environment variable interface in `frontend/src/api.js`:

```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "[http://127.0.0.1:8000/api/](http://127.0.0.1:8000/api/)",
});

```

* Local Development: If no environment variable is found, Axios automatically falls back to your local server (`http://127.0.0.1:8000/api/`).
* Production Environment: Define `VITE_API_URL` inside your hosting dashboard settings pointing to your live backend domain ending with `/api/`.

