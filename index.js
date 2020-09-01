const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const db = require('./source/database');
const session = require('express-session');
const uuid = require('uuid');

const app = express();
const port = process.env.PORT || 3000;

const env = process.env.ENV || 'dev';
const secret = env != 'dev' ? uuid.v4() : 'development';

const addAdditionalFields = (departments, locations, employee) => {
  const department = departments.find(d => d.id === employee.departmentId);
  const location = locations.find(l => l.id === department.locationId)
  employee.departmentName = department.name;
  employee.locationName = location.name;
  return employee;
};

const groupedEach = (every, context, options) => {
  var out = "", subcontext = [], i;
  if (context && context.length > 0) {
      for (i = 0; i < context.length; i++) {
          if (i > 0 && i % every === 0) {
              out += options.fn(subcontext);
              subcontext = [];
          }
          subcontext.push(context[i]);
      }
      out += options.fn(subcontext);
  }
  return out;
};

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

app.use('/css', express.static('public/external/css'));
app.use('/js', express.static('public/external/js'));
app.use('/public', express.static('public'));
app.engine('handlebars', handlebars({
  helpers: { groupedEach }
}));
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
  res.sendFile(__dirname + '/main/index.html');
});

app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/main/index.html');
});

app.get('/about.html', (req, res) => {
  res.sendFile(__dirname + '/main/about.html');
});
app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/main/about.html');
});

app.get('/blog.html', (req, res) => {
  res.sendFile(__dirname + '/main/blog.html');
});
app.get('/blog', (req, res) => {
  res.sendFile(__dirname + '/main/blog.html');
});

app.get('/contact.html', (req, res) => {
  res.sendFile(__dirname + '/main/contact.html');
});
app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/main/contact.html');
});

app.get('/portfolio.html', (req, res) => {
  res.sendFile(__dirname + '/main/portfolio.html');
});
app.get('/portfolio', (req, res) => {
  res.sendFile(__dirname + '/main/portfolio.html');
});

app.get('/resume.html', (req, res) => {
  res.sendFile(__dirname + '/main/resume.html');
});
app.get('/resume', (req, res) => {
  res.sendFile(__dirname + '/main/resume.html');
});

app.get('/services.html', (req, res) => {
  res.sendFile(__dirname + '/main/services.html');
});
app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/main/services.html');
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
    //success
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