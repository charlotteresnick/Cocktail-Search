const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const cocktailFetcher = require('./lib/cocktailFetcher');
const cf = new cocktailFetcher();

const authRouter = require('./routes/auth-router');
const userRouter = require('./routes/user-router');

const app = express();
require('dotenv').config();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.set('views', 'views');
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get('/', (req, res) => {
  const locals = {
    title: 'Main',
    pageName: 'main',
  };
  res.render('layouts/full-page', locals);
});

app.get('/login', (req, res) => {
  const locals = {
    title: 'Login',
    pageName: 'login',
  };
  res.render('layouts/full-page', locals);
});

app.get('/logout', (req, res) => {

});

app.get('/register', (req, res) => {
  const locals = {
    title: 'Register',
    pageName: 'register',
  };
  res.render('layouts/full-page', locals);
});

app.get('/recipe/:id', (req, res) => {
  cf.fetchCocktail(req.params.id).then((cocktail) => {
    if (!cocktail) {
      res.redirect('/')
    }
    console.log(cocktail);
    const locals = {
      title: 'Recipe',
      pageName: 'recipe',
      cocktail,
    };
    res.render('layouts/full-page', locals);
  })
});

app.get('/search', (req, res) => {
  const locals = {
    title: 'Search',
    pageName: 'search',
  };
  res.render('layouts/full-page', locals);
});

app.get('/results', (req, res) => {
  const locals = {
    title: 'Results',
    pageName: 'results',
  };
  res.render('layouts/full-page', locals);
});

app.get('/collection', (req, res) => {
  const locals = {
    title: 'Collection',
    pageName: 'collection',
  };
  res.render('layouts/full-page', locals);
});

app.get('/collections', (req, res) => {
  const locals = {
    title: 'All Collections',
    pageName: 'collections',
  };
  res.render('layouts/full-page', locals);
});

app.use('/auth', authRouter);
app.use('/user', userRouter);

app.use('*', (req, res) => {
  res.status(404).send('Not found');
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

// When the user clicks on the button,
// toggle between hiding and showing the dropdown content
// function myFunction() {
//   document.getElementById("myDropdown").classList.toggle("show");
// }

// Close the dropdown menu if the user clicks outside of it
// window.onclick = function(event) {
//   if (!event.target.matches('.dropbtn')) {
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// }