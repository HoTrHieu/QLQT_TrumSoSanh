const express = require('express');
const validate = require('../middlewares/validate.mdw');
const router = express.Router();
const CrawSearchSchema = require('../schemas/crawlSearch.json');
const crawlModal = require('../models/crawl.model');

router.get('/search', validate(CrawSearchSchema, 'query') , (req, res) => {
    const keyWord = req.query.keyWord;
    const listData = crawlModal.search(keyWord);
    res.json(listData);
})

module.exports = router;