import React, { Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

const StudentApp = lazy(() => import('student/StudentApp'))
const TeacherApp = lazy(() => import('teacher/TeacherApp'))


function App() {
    return (
        <div>
            <h1>High School App</h1>
            <div>
                <div>
                    <h2>Student</h2>
                    <Suspense fallback={<div>Loading Student...</div>}><StudentApp /></Suspense>
                </div>
                <div>
                    <h2>Teacher</h2>
                    <Suspense fallback={<div>Loading Teacher...</div>}><TeacherApp /></Suspense>
                </div>

            </div>
        </div >
    )
}

export default App

createRoot(document.getElementById('root')).render(<App />)