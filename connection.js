const mongoose = require('mongoose');

async function connectMongoDB(url){
    await mongoose.connect(url)
    .then(()=>{
        return console.log("MongoDB Connected");
    })
    .catch((err)=>{
        return console.log("Failed to connect",err);
    })
}

module.exports={
    connectMongoDB,
}
