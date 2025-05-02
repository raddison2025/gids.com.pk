const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { db } = require('./db');

const indexRouter = require('./routes/index');
const loadRouter = require('./routes/load');
const loginRouter = require('./routes/login');
const submitRouter = require('./routes/submit');
const dataRouter = require('./routes/data');
const tableRouter = require('./routes/table');

const app = express();
const port = process.env.PORT || 3000;

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route handlers
app.use('/', indexRouter);
app.use('/load', loadRouter);
app.use('/login', loginRouter);
app.use('/submit', submitRouter);
app.use('/data', dataRouter);
app.use('/table', tableRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

module.exports = app;
