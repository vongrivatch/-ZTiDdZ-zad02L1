// Requiring module
const express = require("express");
var path = require('path');

const app = express();

// funkja odpowiedzialna za wyswietlanie info o poprawnym logowaniu lub niepoprawnym
function authentication(req, res, next) {
	var authheader = req.headers.authorization;
	console.log(req.headers);
	//niepoprawne logowanie
	if (!authheader) {
		var err = new Error('You are not authenticated!');
		res.setHeader('WWW-Authenticate', 'Basic');
		err.status = 401;
		return next(err)
	}
	var auth = new Buffer.from(authheader.split(' ')[1],
	'base64').toString().split(':');
	var user = auth[0];
	var pass = auth[1];
	// prawidlowy login i haslo uzytkownika
	if (user == 'user' && pass == 'password') {
		// poprawne logowanie
		next();
	} else {
		var err = new Error('You are not authenticated!');
		res.setHeader('WWW-Authenticate', 'Basic');
		err.status = 401;
		return next(err);
	}

}

// Pierwszy krok to uwierzytelnianie klienta
app.use(authentication)
app.use(express.static(path.join(__dirname, 'public')));

// Server setup tutaj podany adres lokalny
app.listen((3000), () => {
	console.log("Server is Running");
})
