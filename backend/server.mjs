import express from "express"

const PORT = 3000;
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello worldQWD")
})

app.listen(PORT)