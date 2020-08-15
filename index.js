const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const db = require('./source/database');

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/public', express.static('public'))

app.engine('handlebars', handlebars())
app.set('view engine', 'handlebars')

app.get('/login', (req, res) => {
  res.render('login', {pageName: "login"})
})

app.get('/results', async (req, res) => {
    const personnel = await db.getPersonnel(req.query);
    res.render('results', {pageName: "results", personnel: personnel})
})

app.post('/add-employee', async (req, res) => {
  // TODO validate 
  db.addPersonnel(req.body);
  res.redirect('results')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})