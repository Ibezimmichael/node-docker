const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const Redis = require('ioredis');
const RedisStore = require("connect-redis").default

const { MONGO_USER, MONGO_PASSWORD, MONDO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, REDIS_SESSION_SECRET } = require('./config/config');
const client = Redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
})


const posts = require('./routes/post');
const auth = require('./routes/auth');

const app = express()

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONDO_IP}:${MONGO_PORT}/?authSource=admin`;

mongoose
    .connect(mongoUrl)
    .then(() => console.log('DB connected ggg'))
    .catch((e) => console.log(e));

const port = process.env.PORT || 3000;


app.use(
    session({
        store: new RedisStore({client}),
        secret: REDIS_SESSION_SECRET,
        cookie: {
            secure: false,
            resave: false,
            saveUninitialized: false,
            httpOnly: true,
            maxAge: 30000
        }
}))

app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use('/api/v1/posts', posts);
app.use('/api/v1/users', auth);

app.get("/", (req, res) => {
    res.send("Test ebfw")
})

app.use('*', (req, res) => {
    res.status(404).json({message: `${req.originalUrl} Route Not found`})
})


app.listen(port, () => console.log(`listening on port ${port}`))



