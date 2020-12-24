const ajv = require('ajv');

module.exports = (schema, type = 'body') => (req, res, next) => {
    const validator = new ajv({ allErrors: true });
    const fn_validate = validator.compile(schema);

    // type[body, query]
    const is_valid = type === 'body' ? fn_validate(req.body) : fn_validate(req.query);
    if(!is_valid){
        return res.status(400).json(fn_validate.errors);
    }

    next();
}