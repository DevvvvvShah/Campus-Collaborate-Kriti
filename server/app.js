require('dotenv').config();
import session from 'express-session';
import flash from 'connect-flash';
import { LogLevel, ConfidentialClientApplication } from '@azure/msal-node';

import createError from 'http-errors';
import express, { json, urlencoded} from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { join } from 'path';
import { fileURLToPath } from 'url';

import indexRouter from './auth/routes/index';
import usersRouter from './auth/routes/users';
import authRouter from './auth/routes/auth';

var app = express();

// In-memory storage of logged-in users
// For demo purposes only, production apps should store
// this in a reliable storage
app.locals.users = {};

// MSAL config
const msalConfig = {
  auth: {
    clientId: process.env.OAUTH_CLIENT_ID,
    authority: process.env.OAUTH_AUTHORITY,
    clientSecret: process.env.OAUTH_CLIENT_SECRET
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: LogLevel.Verbose,
    }
  }
};

// Create msal application object
app.locals.msalClient = new ConfidentialClientApplication(msalConfig);

// Session middleware
// NOTE: Uses default in-memory session store, which is not
// suitable for production
app.use(session({
  secret: 'your_secret_value_here',
  resave: false,
  saveUninitialized: false,
  unset: 'destroy'
}));

// Flash middleware
app.use(flash());

// Set up local vars for template layout
app.use(function(req, res, next) {
  // Read any flashed errors and save
  // in the response locals
  res.locals.error = req.flash('error_msg');

  // Check for simple error string and
  // convert to layout's expected format
  var errs = req.flash('error');
  for (var i in errs){
    res.locals.error.push({message: 'An error occurred', debug: errs[i]});
  }

  // Check for an authenticated user and load
  // into response locals
  if (req.session.userId) {
    res.locals.user = app.locals.users[req.session.userId];
  }

  next();
});

// view engine setup
app.set('views', join(__dirname, 'auth/views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

// If using ES6 modules

import express from 'express';

// Use import.meta.url to get the current file's URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

app.use(express.static(join(__dirname, 'auth/public')));

// app.use(express.static(join(__dirname, 'auth/public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
