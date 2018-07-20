const express = require('express');
const hbs = require('hbs');
const fs  = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
	var now =  new Date().toString();
	var log =`${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n' , (err) => {
		if(err) {
			console.log('Unable to sppend to server .log');
		}
	});
	next();
});

// since there is no next.. none on the handles will execute
// app.use((req, res, next) => {
// 	res.render('maintainence.hbs');
// });

// we moved this from top to here so that this is not rendered when the maintance.hbs is
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	// res.send('Hello Express');
	// res.send({
	// 	name: 'Andrew',
	// 	likes: [
	// 	'food',
	// 	'sleep']
	// });
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		name: 'Welcome to Udemy Node Course',
		currentYear: new Date().getFullYear()
	});
});


app.get('/about', (req, res) => {
	// res.send('About page');
	res.render('about.hbs', {
		pageTitle: 'About Page',
		currentYear: new Date().getFullYear()
	});
});

app.get('/portfolio', (req, res) => {
	res.render('portfolio.hbs', {
		pageTitle: 'Portfolio Page',
		currentYear: new Date().getFullYear()
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'error'
	});
});

app.listen(port, () => {
	console.log(`Sever is up and running at ${port}`);
});