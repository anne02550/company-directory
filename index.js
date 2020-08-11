const express = require('express');
const handlebars = require('express-handlebars');

const app = express()
const port = 3000

app.use('/public', express.static('public'))

app.engine('handlebars', handlebars())
app.set('view engine', 'handlebars')

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/results', (req, res) => {
    res.render('results')
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})