const express = require('express');
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONDO_IP, MONGO_PORT } = require('./config/config');
const posts = require('./routes/post');

const app = express()

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONDO_IP}:${MONGO_PORT}/?authSource=admin`;

mongoose
    .connect(mongoUrl)
    .then(() => console.log('DB connected ggg'))
    .catch((e) => console.log(e));

const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use('/api/v1/posts', posts);

app.get("/", (req, res) => {
    res.send("Test")
})

app.use('*', (req, res) => {
    res.status(404).json({message: `${req.originalUrl} Route Not found`})
})


app.listen(port, () => console.log(`listening on port ${port}`))



