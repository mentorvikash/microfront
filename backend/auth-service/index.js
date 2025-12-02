const express = require('express')
const cors = require('cors')
const app = express
const port = 4000

app.use(cors())
app.use(express.json())

app.post('/login', (req, res) => {
    const { email } = req.body
    if (!email) return res.status(400).json({ error: "email required" })
    return res.status(200).json({ id: Date.now().toString(), email })
})

app.get('/health', (req, res) => res.json({ ok: true }))
app.listen(port, () => {
    console.log("app is runnning at: " + port)
})
