const express = require('express');
const morgan = require('morgan');
require('express-async-errors');
const cors = require('cors');
const auth = require('./middlewares/auth.mdw');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.json({
        message: 'hello'
    })
});

/////////////////use router///////////////////////
app.use('/api/crawl', require('./routes/crawl.route'));
app.use('/api/v1/category', require('./routes/category.route'));
//////develop sau
app.use('/api/customers', auth, require('./routes/customer.route'));
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/users', require('./routes/user.route'));

/////////////////handle error///////////////////////
app.use(function (req, res, next) {
    res.status(404).send({
      error_message: 'Endpoint not found!'
    })
  });
  
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send({
      error_message: 'Something broke!'
    });
});

/////////////////conection///////////////////////
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`my backend running at http://localhost:${PORT}`);
});