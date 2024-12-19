const ShortUniqueId = require('short-unique-id');
const {randomUUID}  = new ShortUniqueId({length:8});
const Url = require('../models/Url')

async function handleNewUrl(req,res){
    const shortid = randomUUID();
    const body = req.body;
    console.log(body);
    console.log(shortid,typeof(shortid));

   if(!body.url) return res.status(400).json({msg:"url needed"});
    await Url.create({
        shortId: shortid,
        redirectedURL:body.url,
        visitedHistory:[],
    })
    return res.json({
        msg:"ShortId created",
        id:shortid
    })
}

async function handleGetUrl(req,res){
    const TempshortId = req.params.shortid;
    console.log(TempshortId);
    const entry  = await Url.findOneAndUpdate(
        {shortId:TempshortId},
        {$push:{
            visitedHistory:{
                timestamp: Date.now(),
            },
        },
    },
    { new: true }               //ensures that new document is returned after update
    );
    return res.redirect('https://'+entry.redirectedURL);
}

async function handleAnalytics(req,res){
    const shortId = req.params.shortid;
    const document = await Url.findOne({shortId});
    return res.json({
        clicks:document.visitedHistory.length,
        History:document.visitedHistory,
    })
}


/*
findOneAndUpdate(filter, update, options, callback);
filter: The condition to find the document (like where in SQL).
update: The changes you want to apply to the found document.
options: Optional settings for the operation (e.g., new, upsert, etc.).
callback (optional): A callback function for handling results (use promises/async-await instead of callbacks for modern code).
*/

module.exports={
    handleNewUrl,
    handleGetUrl,
    handleAnalytics,
}