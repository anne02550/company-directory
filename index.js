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
    const departments = await db.getAllDepartments();
    const locations = await db.getAllLocations();

    res.render('results', {pageName: "results", personnel: personnel, departments: departments, locations: locations})
})

app.get('/get-employee/:id', async (req, res) => {
  const id = req.params.id;
  const result = await db.getPersonnel({id});
  res.send(result[0]);
})

app.post('/add-employee', async (req, res) => {
  // TODO validate 
  await db.addPersonnel(req.body);
  res.redirect('results')
})

app.post('/update-employee', async (req, res) => {
  // TODO validate 
  await db.editPersonnel(req.body);

  res.redirect('results')
})

app.post('/delete-employee/:id', async (req, res) => {
  const id = req.params.id;
  db.deletePersonnel(id);
  res.redirect('/results');
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})