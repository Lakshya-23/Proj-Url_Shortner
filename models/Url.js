const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true,
    },
    redirectedURL:{
        type:String,
        required:true
    },
    visitedHistory:[{timestamp:{type:Number}}]
},
{timestamps:true});

const Url = mongoose.model('url',urlSchema);

module.exports=Url;