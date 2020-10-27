const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const db = require('./source/database');
const handlebarsConfig = require('./source/handlebars-config');
const session = require('express-session');
const uuid = require('uuid');

const app = express();
const port = process.env.PORT || 3000;

const env = process.env.ENV || 'dev';
const secret = env != 'dev' ? uuid.v4() : 'development';

app.use(session({
  key: 'user_id',
  secret: secret,
  rolling: true,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: env != 'dev'},
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/public', express.static('public'));
app.engine('handlebars', handlebars(handlebarsConfig));
app.set('view engine', 'handlebars');

// Utils
const isLoggedIn = (req) => req.session.user;

const authenticate = (req, res, next) => {
  if(isLoggedIn(req)) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Redirrects
app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/logout', async (req, res) => {
  if (isLoggedIn(req)) {
    res.clearCookie('user_id');
    await new Promise(resolve => req.session.destroy(() => resolve()));
  } 
  res.redirect('/login');
});

// Pages
app.get('/login', (req, res) => {
  if (isLoggedIn(req)) {
    res.redirect('/results');
  } else {
    const showError = req.query.showError === 'true';
    res.render('login', {pageName: "login", showError});
  }
})

app.get('/results', authenticate, async (req, res) => {
    let personnel = await db.getPersonnel(req.query);
    const departments = await db.getAllDepartments();
    const locations = await db.getAllLocations();
    const jobTitles = await db.getJobTitles();

    const addAdditionalFields = (departments, locations, employee) => {
      const department = departments.find(d => d.id === employee.departmentId);
      const location = locations.find(l => l.id === department.locationId)
      employee.departmentName = department.name;
      employee.locationName = location.name;
      return employee;
    };

    personnel = personnel.map(x => addAdditionalFields(departments, locations, x));
    // sort personell here:

    res.render('results', {
      pageName: "results", 
      personnel: personnel, 
      departments: departments, 
      locations: locations, 
      jobTitles: jobTitles,
    })
});

// API
app.get('/get-employee/:id', authenticate, async (req, res) => {
  const id = req.params.id;
  const result = await db.getPersonnel({id});
  res.send(result[0]);
});

// Form Posts

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if(username === 'hello' && password === 'hello') {
    //success - setting user cookies
    req.session.user = {id: 1, userName: 'admin'};
    res.redirect('/results');
  } else {
    res.redirect('/login?showError=true');
  }
});

app.post('/add-employee', authenticate, async (req, res) => {
  await db.addPersonnel(req.body);
  res.redirect('results')
});

app.post('/update-employee', authenticate, async (req, res) => {
  await db.editPersonnel(req.body);
  res.redirect('results')
});

app.post('/delete-employee/:id', authenticate, async (req, res) => {
  const id = req.params.id;
  db.deletePersonnel(id);
  res.redirect('/results');
});

app.listen(port, () => {
  console.log(`company directory listening at http://localhost:${port}`)
});