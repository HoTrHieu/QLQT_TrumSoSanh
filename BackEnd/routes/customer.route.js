const express = require('express');
const customerModel = require('../models/customer.model');
const validate = require('../middlewares/validate.mdw');

const router = express.Router();
const customerSchema = require('../schemas/customer.json');

router.get('/', async(req, res)=>{
    console.log('show req. ', req.accessTokenPayload)
    const list = await customerModel.all();
    res.json(list);
});

router.get('/:id', async(req, res)=>{
    const id = req.params.id || 0;
    const customer = await customerModel.byId(id);
    return customer? res.json(customer) : res.status(204).end();
})

//add
router.post('/', validate(customerSchema) ,async(req, res) => {
    const customer = req.body;
    const customer_id = await customerModel.add(customer);
    console.log('show id: ', customer_id);
    customer.customer_id = customer_id[0];
    res.status(201).json(customer);
})

router.get('/delete/:id', async(req, res)=>{
    const id = +req.params.id || 0;
    if(id === 0) {
        return res.status(304).end();
    }

    await customerModel.del(id);
    res.json({
        message: `deleted ${id}`
    })
})
module.exports = router;