import React from 'react'

export default function StudentApp() {
    const [notices, setNotices] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/notice')
            .then(res => res.json())
            .then(setNotices)
            .catch(() => setNotice([{ title: 'No notice found' }]))
    }, [])


    return (
        <div>
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
        </div>
    )
}

