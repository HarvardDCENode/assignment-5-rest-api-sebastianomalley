/**
 * app.js
 *
 * This is the main Express app for Family Wisdom.
 * It sets up middleware, connects to MongoDB Atlas,
 * mounts all HTML and API routes, and handles errors.
 */

const createError = require('http-errors');
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const familyRouter = require('./routes/family');

require('dotenv').config(); // Load environment variables from .env.
const mongoose = require('mongoose'); // MongoDB ORM.

app.use(cors());

// Enable Mongoose strict query mode.
mongoose.set('strictQuery', true);

// Construct MongoDB URI using environment variables.
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.i4usv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&authSource=admin&appName=Cluster0`;

const tipsRouter = require('./routes/tips');
const indexRouter = require('./routes/index');

// Connect to MongoDB.
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error(`Database connection error: ${err}`);
    process.exit();
  });

// Enable EJS layouts.
app.use(expressLayouts);
app.set('layout', 'layout'); // Default layout is views/layout.ejs.

// View engine setup.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware for logging, parsing JSON, URL-encoded data, cookies, and serving static files.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route mounting.
app.use('/family', familyRouter);
app.use('/', indexRouter);
app.use('/tips', tipsRouter);

// Mount all the REST API routes from the /routes/api folder.
// Since that folder has an index.js, requiring './routes/api' automatically loads that file.
const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

// Catch 404 and forward to error handler.
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler.
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
