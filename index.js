const express = require('express');
const handlebars = require('express-handlebars');
const db = require('./source/database')

const app = express()
const port = 3000

app.use('/public', express.static('public'))

app.engine('handlebars', handlebars())
app.set('view engine', 'handlebars')

app.get('/login', (req, res) => {
  res.render('login', {pageName: "login"})
})

app.get('/results', async (req, res) => {
    const personnel = await db.getPersonnel();
    res.render('results', {pageName: "results", personnel: personnel})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})