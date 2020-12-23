const express = require('express');
const validateSearch = require('../middlewares/validateSearch.mdw');
const router = express.Router();
const CrawSearchSchema = require('../schemas/crawlSearch.json');
const crawlModal = require('../models/crawl.model');

router.get('/search', validateSearch(CrawSearchSchema) , (req, res) => {
    const keyWord = req.query.keyWord;
    const listData = crawlModal.search(keyWord);
    res.json(listData);
})

module.exports = router;