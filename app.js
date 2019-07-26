//Setting up express
const express = require('express');
const data = require('./data.json');
const bodyParser = require('body-parser');
const app = express();

//Setting up middleware
app.use(bodyParser.urlencoded({ extended: false}));

//Setting up pug
//Update code in app to use Pug
app.set('view engine', 'pug');

//Using a static route and the express.static method to serve the static files located in the public and images folder.
app.use('/static', express.static('public'));
// app.use('/images', express.static('images'));


//Adding routes and sending strings to the client.
//Merges the data with the templates to surf dynamic pages.
//What will appear in the home section.
app.get('/', (req, res) => {
    res.render('index', {projects: data.projects});
});

//What will appear in the about section.
app.get('/about', (req, res) => {
    res.render('about');
});

//Dynamic routes
app.get('/projects/:id', (req, res) => {
    if (req.params.id > data.projects.length || req.params.id <  1) {
        const err = new Error('This page cannot be found.');
        err.status = 404;
        throw err;
    } 
    res.render('project', {
        project: data.projects[req.params.id - 1],
        id: req.params.id  
    });
});

//Setting error: 404
app.use((req, res, next) => {
    console.log('This page does not exist.');
    const err = new Error('This page cannot be found.');
    err.status = 404;
    next(err);
});

//Handling errors
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

//When nodemon restarts the server there’s a message.
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});

