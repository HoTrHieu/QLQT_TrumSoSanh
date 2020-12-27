const express = require('express');
const router = express.Router();
const categoriesModal = require('./../models/category.model');

router.get('/all' , (req, res) => {
    // const listData = categoriesModal.all();
    const listData = [
        {
            "id": 0,
            "name": "TTTT",
            "slug": "sss",
            "exHref": "ddd",
            "exPath": "aaaa",
            "status": 0,
            "updatedDate": "2020-12-26T17:24:16.929Z",
            "createdDate": "2020-12-26T17:24:16.929Z",
        },
        {
            "id": 0,
            "name": "TTTT",
            "slug": "sss",
            "exHref": "ddd",
            "exPath": "aaaa",
            "status": 0,
            "updatedDate": "2020-12-26T17:24:16.929Z",
            "createdDate": "2020-12-26T17:24:16.929Z",
        },
        {
            "id": 0,
            "name": "TTTT",
            "slug": "sss",
            "exHref": "ddd",
            "exPath": "aaaa",
            "status": 0,
            "updatedDate": "2020-12-26T17:24:16.929Z",
            "createdDate": "2020-12-26T17:24:16.929Z",
        }
    ]

    res.json(listData);
})

module.exports = router;