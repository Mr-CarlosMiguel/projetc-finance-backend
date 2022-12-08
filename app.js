const express = require('express')
const router = require('./router')
const cors = require('cors')

app = express()
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(router)

app.listen(8080, (req, res) => {
  console.log('Servidor rodando')
})
