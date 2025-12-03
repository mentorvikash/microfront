import React, { useEffect, useState } from 'react'
import Button from "shared_ui/Button"
import Card from "shared_ui/Card"


function TeacherApp() {
  const [classes, setClasses] = useState([])
  useEffect(() => {
    fetch("http://localhost:4001/classes")
      .then(res => res.json())
      .then(setClasses)
      .catch(() => setClasses([{ name: "No backend" }]))


  }, [])

  return (
    <Card>
      <h1>
        Teacher Micro Service
      </h1>
      <p>Classes from backend: </p>
      <ul>
        {classes.map((c, i) => <li key={i} >{c.name}</li>)}
      </ul>
      <Button onClick={() => alert("teacher clicked by")} >
        Press Me
      </Button>
    </Card>
  )
}

export default TeacherApp