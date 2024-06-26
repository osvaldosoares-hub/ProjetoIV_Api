require("dotenv").config();
const express = require('express')
const cors = require('cors');
const app = express()
const routerUser = require('./routes/useRoutes')
const mongoose = require('mongoose');
app.use(cors());
const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl, {
    retryWrites: true,
    w: 'majority',
    appName: 'Cluster0'
});

app.use(express.json())


app.use('/v0',routerUser)

app.listen(3000)