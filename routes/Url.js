const express = require('express');
const router = express.Router();
const {handleNewUrl,handleGetUrl,handleAnalytics} = require('../controllers/Url')

router.post('/',handleNewUrl)
router.get("/:shortid",handleGetUrl)
router.get("/analytics/:shortid",handleAnalytics)


module.exports = router;