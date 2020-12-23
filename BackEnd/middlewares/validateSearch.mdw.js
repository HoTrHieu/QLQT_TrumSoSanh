const ajv = require('ajv');

module.exports = schema => (req, res, next) => {
    const validator = new ajv({ allErrors: true });
    const fn_validate = validator.compile(schema);
    console.log('log req', req.query)
    const is_valid = fn_validate(req.query);
    if(!is_valid){
        return res.status(400).json(fn_validate.errors);
    }

    next();
}