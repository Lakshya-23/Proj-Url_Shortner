const express = require('express');
const app = express();
const {connectMongoDB} = require('./connection')
const urlRouter = require('./routes/Url')

connectMongoDB('mongodb://127.0.0.1:27017/Prj-shortUrl');
app.use(express.json());
    
app.use('/url',urlRouter);

app.listen(8000,()=>console.log("Server Started"));

