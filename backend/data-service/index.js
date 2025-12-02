const express = require('express')
const cors = require('cors')

const app = express()
const port = 4001

app.use(cors());
app.use(express.json())

const notices = [{ title: 'Exam on friday' }, { title: "PTM next saturday" }]
const classes = [{ name: 'Math -Grade 8' }, { name: 'Science - Grade 10' }]


app.get('/notices', (req, res) => { res.json(notices) })
app.get('/classes', (req, res) => { res.json(classes) })
app.post('/notices', (req, res) => {
    const n = req.body;
    if (n && n.title) { notices.push(n); return res.json(n) }
    return res.status(400).json({ error: 'title requried' })
})


app.listen(port, () => {
    console.log("app is running at: " + port)
})