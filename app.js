//Setting up express
const express = require('express');
const data = require('./data.json');
const app = express();

//Setting up middleware
// app.use(bodyParser.urlencoded({ extended: false}));

//Setting up pug
//Update code in app to use Pug
app.set('view engine', 'pug');

//Merges the data with the templates to surf dynamic pages.
app.get('/', (req, res) => {
    res.render('index', {projects: data.projects});
});

//Adding routes and sending strings to the client.
//What will appear in the home section.
// app.get('/home', (req, res) => {
//     res.render('<h1>Home</h1>');
// });

//What will appear in the about section.
app.get('/about', (req, res) => {
    res.render('about');
});

//When nodemon restarts the server there’s a message.
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});

