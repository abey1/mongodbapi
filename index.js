require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const routes = require('./routes/routes')

// **Begin** mongoose database connection

const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString);

const database = mongoose.connection
database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})
// **End** mongoose database connection


const app = express();



app.use(cors())
app.use(express.json());

app.use('/api', routes)


app.listen(3000, () => {
  console.log(`Server Started at ${3000}`)
})