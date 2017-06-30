const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cookieSession = require('cookie-session');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

// Routes setup
const usersRouter = require('./routes/users');
const tasksRouter = require('./routes/tasks');
const rewardsRouter = require('./routes/rewards');

dotenv.load();

// Setup for templating
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));

app.disable('x-powered-by');

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
}));

// Use routes
app.use(usersRouter);
app.use(tasksRouter);
app.use(rewardsRouter);

// Render index page
app.get('/', (req, res) => {
  const leftNavbar = req.session.id || -1;
  res.render('pages/index', {
    title: 'tinyhabits',
    leftNavbar,
  });
});

app.get('/login', (req, res) => {
  res.render('pages/login', {
    title: 'Login to tinyhabits',
  });
});

app.get('/register', (req, res) => {
  res.render('pages/register', {
    title: 'New User Registration',
  });
});

app.get('/help', (req, res) => {
  const leftNavbar = req.session.id || -1;
  res.render('pages/help', {
    title: 'How tinyhabits Works',
    leftNavbar,
  });
});

// Error handling for 404
app.use((_req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handling for everything else
app.use((err, _req, res, next) => {
  res.status(err.status || 500);
  res.render('pages/error', {
    message: err.message,
    error: err,
    title: 'Error!',
    leftNavbar: _req.session.id || -1,
  });
});

// Listener middleware
app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
