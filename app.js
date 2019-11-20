'use strict'

const express = require('express')
const path = require('path');
const app = express();
// const indexRouter = require('./routes/index');
const IngredientRouter = require('./routes/ingredient')
const UserRouter = require('./routes/user')
const JuiceRouter = require('./routes/JuiceRouter')
const PORT = process.env.PORT || 3000;

const hash = require("./helpers/hashPassword");
app.locals.formatter = hash;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/', indexRouter);
app.use('/ingredient', IngredientRouter);
app.use('/juice', JuiceRouter);
app.use('/user', UserRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, ()=>{
  console.log(`App listening on port ${PORT}`);
})
