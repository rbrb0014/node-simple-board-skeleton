const express = require('express');
const morgan = require('morgan');
const session = require('express-session');

const { errorHandler } = require('./lib/error-handler');
const router = require("./controller");

const { MODE, SESSION_SECRET } = process.env;

const app = express();

app.set('views', `${__dirname}/../views`);
app.set('view engine', 'pug');

app.use('/', express.static(`${__dirname}/../public`));

app.use(morgan(MODE !== 'prod' ? 'dev' : 'combined'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
}));

app.use('/', router);

app.use(errorHandler);

module.exports = app;
