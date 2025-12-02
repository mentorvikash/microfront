import React, { useEffect, useState } from 'react'

function TeacherApp() {
  const [classes, setClasses] = useState([])
  useEffect(() => {
    fetch("http://localhost:4001/classes")
      .then(res => res.json())
      .then(setClasses)
      .catch(() => setClasses([{ name: "No backend" }]))


  }, [])

  return (
    <div>
      <h1>
        Teacher Micro Service
      </h1>
      <p>Classes from backend: </p>
      <ul>
        {classes.map((c, i) => <li key={i} >{c.name}</li>)}
      </ul>
    </div>
  )
}

export default TeacherApp