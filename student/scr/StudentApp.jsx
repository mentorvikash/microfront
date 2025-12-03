import React, { useState, useEffect } from 'react'
import Card from "shared_ui/Card"
import Button from "shared_ui/Button"

export default function StudentApp() {
    const [notices, setNotices] = useState([])
    useEffect(() => {
        fetch('http://localhost:4001/notices')
            .then(res => res.json())
            .then(setNotices)
            .catch(() => setNotices([{ title: 'No notice found' }]))
    }, [])


    return (
        <Card>
            <h3>Student Micro Frontend</h3>
            <p>Notice from backend: </p>
            <ul>
                {
                    notices.map((notice, index) => (
                        <li key={index}>
                            {notice.title}
                        </li>
                    ))
                }
            </ul>
            <Button onClick={() => alert("student get clicked")}>
                click me
            </Button>
        </Card>
    )
}

