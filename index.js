const express = require('express')
var cors = require('cors')


const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello gfhfjh!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})