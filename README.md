# Microfrontend Architecture - High School Application

A modern microfrontend application built with React, Webpack Module Federation, and Express.js. This project demonstrates a distributed frontend architecture where multiple independent applications (shell, student, teacher) work together seamlessly.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Port Configuration](#port-configuration)
- [Technology Stack](#technology-stack)
- [Module Federation](#module-federation)
- [API Endpoints](#api-endpoints)
- [Development](#development)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This project implements a microfrontend architecture for a High School management system with four main frontend applications:

- **Shell**: The host application that orchestrates and loads remote microfrontends
- **Student**: A microfrontend for student-related features
- **Teacher**: A microfrontend for teacher-related features
- **Shared UI**: A shared component library that provides reusable UI components (Button, Card)

The backend consists of two microservices:
- **Auth Service**: Handles authentication
- **Data Service**: Provides data for notices and classes

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Shell (Host)                         │
│                  Port: 3000                             │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Dynamically loads remote microfrontends:        │  │
│  │  - student@localhost:3001                        │  │
│  │  - teacher@localhost:3002                        │  │
│  │  - shared_ui@localhost:3003                      │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  Student App    │  │  Teacher App    │  │  Shared UI      │
│  Port: 3001     │  │  Port: 3002     │  │  Port: 3003     │
│  Exposes:       │  │  Exposes:       │  │  Exposes:       │
│  StudentApp     │  │  TeacherApp     │  │  Button, Card   │
│  Uses:          │  │  Uses:          │  │                 │
│  shared_ui      │  │  shared_ui      │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘
         │                    │                    │
         └──────────┬──────────┴────────────────────┘
                    ▼
         ┌─────────────────────┐
         │   Backend Services  │
         │  Auth: Port 4000    │
         │  Data: Port 4001    │
         └─────────────────────┘
```

## 📁 Project Structure

```
microfront/
├── shell/                    # Host application (Container)
│   ├── src/
│   │   ├── bootstrap.jsx     # Main app component
│   │   ├── index.jsx         # Entry point
│   │   └── style.css         # Styles
│   ├── public/
│   │   └── index.html
│   ├── webpack.config.js     # Module Federation config
│   ├── .babelrc              # Babel configuration
│   └── package.json
│
├── student/                  # Student microfrontend (Remote)
│   ├── scr/                  # Note: folder name is 'scr' (not 'src')
│   │   ├── bootstrap.jsx     # Standalone app entry
│   │   ├── index.jsx
│   │   └── StudentApp.jsx    # Exposed component
│   ├── index.jsx             # Entry point (imports bootstrap)
│   ├── public/
│   │   └── index.html
│   ├── webpack.config.js
│   ├── .babelrc              # Babel configuration
│   └── package.json
│
├── teacher/                  # Teacher microfrontend (Remote)
│   ├── src/
│   │   ├── bootstrap.jsx
│   │   ├── index.jsx
│   │   └── TeacherApp.jsx   # Exposed component
│   ├── public/
│   │   └── index.html
│   ├── webpack.config.js
│   ├── .babelrc             # Babel configuration
│   └── package.json
│
├── shared-ui/               # Shared UI component library (Remote)
│   ├── components/
│   │   ├── Button.jsx       # Shared Button component
│   │   └── Card.jsx         # Shared Card component
│   ├── src/
│   │   ├── bootstrap.jsx
│   │   └── index.jsx
│   ├── public/
│   │   └── index.html
│   ├── webpack.config.js
│   ├── .babelrc             # Babel configuration
│   └── package.json
│
└── backend/
    ├── auth-service/         # Authentication service
    │   ├── index.js
    │   └── package.json
    └── data-service/         # Data service (notices & classes)
        ├── index.js
        └── package.json
```

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher) or **yarn**
- A modern web browser

## 📦 Installation

1. **Clone the repository** (if applicable) or navigate to the project directory

2. **Install dependencies for each application:**

   ```bash
   # Install shell dependencies
   cd shell
   npm install
   cd ..

   # Install student dependencies
   cd student
   npm install
   cd ..

   # Install teacher dependencies
   cd teacher
   npm install
   cd ..

   # Install shared-ui dependencies
   cd shared-ui
   npm install
   cd ..

   # Install backend services dependencies
   cd backend/auth-service
   npm install
   cd ../data-service
   npm install
   cd ../..
   ```

## 🚀 Running the Application

The application consists of 6 services that need to run simultaneously. You'll need to open **6 separate terminal windows/tabs**.

### Terminal 1: Shell (Host Application)
```bash
cd shell
npm start
```
Shell will be available at: **http://localhost:3000**

### Terminal 2: Student Microfrontend
```bash
cd student
npm start
```
Student app will be available at: **http://localhost:3001**

### Terminal 3: Teacher Microfrontend
```bash
cd teacher
npm start
```
Teacher app will be available at: **http://localhost:3002**

### Terminal 4: Shared UI Component Library
```bash
cd shared-ui
npm start
```
Shared UI will be available at: **http://localhost:3003**

### Terminal 5: Auth Service
```bash
cd backend/auth-service
npm start
```
Auth service will be available at: **http://localhost:4000**

### Terminal 6: Data Service
```bash
cd backend/data-service
npm start
```
Data service will be available at: **http://localhost:4001**

### Access the Application

Once all services are running, open your browser and navigate to:
```
http://localhost:3000
```

The shell application will automatically load the Student and Teacher microfrontends.

## 🔌 Port Configuration

| Service | Port | Description |
|---------|------|-------------|
| Shell | 3000 | Host application |
| Student | 3001 | Student microfrontend |
| Teacher | 3002 | Teacher microfrontend |
| Shared UI | 3003 | Shared component library (Button, Card) |
| Auth Service | 4000 | Authentication API |
| Data Service | 4001 | Data API (notices & classes) |

## 🛠️ Technology Stack

### Frontend
- **React** ^19.2.0
- **React DOM** ^19.2.0
- **Webpack** ^5.103.0
- **Webpack Module Federation** (built into Webpack 5)
- **Babel** (for JSX/ES6+ transpilation)
- **Webpack Dev Server** ^5.2.2

### Backend
- **Express.js** ^5.2.1
- **CORS** ^2.8.5
- **Nodemon** ^3.1.11 (for development)

## 🔗 Module Federation

This project uses **Webpack Module Federation** to enable runtime integration of independently deployed applications.

### Shell Configuration (Host)
- **Name**: `shell`
- **Remotes**: 
  - `student@http://localhost:3001/remoteEntry.js`
  - `teacher@http://localhost:3002/remoteEntry.js`
  - `shared_ui@http://localhost:3003/remoteEntry.js`
- **Shared**: React and React-DOM (singleton mode)

### Student Configuration (Remote)
- **Name**: `student`
- **Exposes**: `./StudentApp` → `./scr/StudentApp`
- **Filename**: `remoteEntry.js`
- **Remotes**: `shared_ui@http://localhost:3003/remoteEntry.js`
- **Shared**: React and React-DOM

### Teacher Configuration (Remote)
- **Name**: `teacher`
- **Exposes**: `./TeacherApp` → `./src/TeacherApp.jsx`
- **Filename**: `remoteEntry.js`
- **Remotes**: `shared_ui@http://localhost:3003/remoteEntry.js`
- **Shared**: React and React-DOM

### Shared UI Configuration (Remote)
- **Name**: `shared_ui`
- **Exposes**: 
  - `./Button` → `./components/Button.jsx`
  - `./Card` → `./components/Card.jsx`
- **Filename**: `remoteEntry.js`
- **Shared**: React and React-DOM (singleton mode)

### How It Works

1. The **shell** application loads at runtime
2. It dynamically imports remote modules from student, teacher, and shared-ui apps
3. **Student** and **Teacher** apps consume shared UI components (Button, Card) from the shared-ui remote
4. React components are shared as singletons to avoid version conflicts
5. Each microfrontend can be developed, built, and deployed independently

## 📡 API Endpoints

### Auth Service (Port 4000)

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/login` | User login | `{ "email": "user@example.com" }` |
| GET | `/health` | Health check | - |

**Example Login Request:**
```bash
curl -X POST http://localhost:4000/login \
  -H "Content-Type: application/json" \
  -d '{"email": "student@school.com"}'
```

### Data Service (Port 4001)

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| GET | `/notices` | Get all notices | Array of notice objects |
| GET | `/classes` | Get all classes | Array of class objects |
| POST | `/notices` | Create a notice | `{ "title": "Notice title" }` |

**Example Responses:**

```json
// GET /notices
[
  { "title": "Exam on friday" },
  { "title": "PTM next saturday" }
]

// GET /classes
[
  { "name": "Math -Grade 8" },
  { "name": "Science - Grade 10" }
]
```

## 💻 Development

### Building for Production

To build each application for production:

```bash
# Build shell
cd shell
npm run build

# Build student
cd student
npm run build

# Build teacher
cd teacher
npm run build

# Build shared-ui
cd shared-ui
npm run build
```

### Development Workflow

1. **Independent Development**: Each microfrontend can be developed independently
2. **Hot Module Replacement**: Webpack Dev Server provides HMR for fast development
3. **Shared Dependencies**: React is shared to avoid duplicate loading
4. **Standalone Mode**: Each microfrontend can run standalone for testing

### Key Files

- **webpack.config.js**: Module Federation configuration
- **.babelrc**: Babel configuration for JSX/ES6+ transpilation (required for all React apps)
- **bootstrap.jsx**: Application initialization
- **index.jsx**: Entry point that loads bootstrap
- **package.json**: Dependencies and scripts

### Babel Configuration

All React applications (shell, student, teacher, and shared-ui) require a `.babelrc` file with the following configuration:

```json
{
    "presets": ["@babel/preset-react", "@babel/preset-env"]
}
```

This enables Babel to transform JSX syntax and modern JavaScript features. Each application has its own `.babelrc` file in the root directory.

## 🐛 Troubleshooting

### Common Issues

1. **Module not found errors**
   - Ensure all services are running
   - Check that ports match the configuration
   - Verify webpack.config.js remote URLs

2. **CORS errors**
   - Ensure backend services have CORS enabled (already configured)
   - Check that backend services are running

3. **RemoteEntry.js not found**
   - Verify the remote microfrontend is running
   - Check the port number in webpack.config.js
   - Ensure the remote app has built successfully

4. **React version conflicts**
   - All apps should use the same React version (currently ^19.2.0)
   - Module Federation shared config ensures singleton React instance

5. **Port already in use**
   - Stop any services using the ports (3000, 3001, 3002, 3003, 4000, 4001)
   - Or change port numbers in respective config files

6. **JSX syntax errors**
   - Ensure `.babelrc` file exists in each React application (shell, student, teacher, shared-ui)
   - Verify `@babel/preset-react` is installed and configured
   - Check that babel-loader is properly configured in webpack.config.js

7. **Shared UI components not loading**
   - Ensure shared-ui service is running on port 3003
   - Verify remote configuration in webpack.config.js points to correct URL
   - Check browser console for CORS or network errors

### Student App Note

⚠️ **Important**: The student app uses a folder named `scr` instead of `src`. This is reflected in the webpack configuration entry point.

## 📝 Notes

- Each microfrontend can be deployed independently
- The shell application acts as the orchestrator
- Shared dependencies (React) are loaded once and reused across all apps
- The shared-ui library provides reusable components consumed by student and teacher apps
- All services must be running for the full application to work
- The application uses lazy loading for better performance
- Babel configuration (`.babelrc`) is required for all React applications (shell, student, teacher, shared-ui) to handle JSX syntax
- The student app has an `index.jsx` file at the root level that imports the bootstrap file from the `scr` folder

## 🔄 Future Enhancements

Potential improvements:
- Add routing (React Router)
- Implement authentication flow
- Add state management (Redux/Zustand)
- Add unit and integration tests
- Add CI/CD pipeline
- Implement error boundaries
- Add loading states and error handling
- Expand shared component library with more reusable components
- Add TypeScript support
- Implement shared state management across microfrontends

## 📄 License

ISC

## 👥 Author

Microfrontend Architecture Project

---

**Happy Coding! 🚀**

