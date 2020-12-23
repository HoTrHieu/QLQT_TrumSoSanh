const db = require('../utils/db');

module.exports = {
    all() {
        return db('customer')
    },

    async byId(id) {
        const customer = await db('customer').where('customer_id', id);
        
        return customer.length === 0 ? null : customer[0];
    },

    add(customer) {
        return db('customer').insert(customer);
    },

    del(id) {
        return db('customer').where('customer_id', id).del();
    }
}