const mongoose = require('mongoose');

const dotenv = require('dotenv');

const postRoutes = require('./routes/postRoutes')

const imageRoutes = require('./routes/imageRoutes')

const userRoutes = require('./routes/userRoutes')

dotenv.config({ path: './config.env' });
const express = require('express');

const fs = require('fs');

const path = require('path')

const download = require('image-downloader')

const sharp = require('sharp');

const resizer = require('node-image-resizer')

const glob = require("glob")

const bodyParser = require('body-parser')

let file = './images';
const app = express();

app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))

// Using routes
app.use(postRoutes);
app.use(imageRoutes)
app.use(userRoutes)

// Home route

app.get('/', (req, res) => {
    res.send("Hello World!")
})

//Database Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    // console.log(result.connections);
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.log(err);
  });

//Defining port no

app.listen(process.env.PORT || 8000, () => {
  console.log('App is running on port 8000');
});
