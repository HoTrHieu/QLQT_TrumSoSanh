const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '123456789',
        database: 'trumsosanhdb',
        port: 3306
    },
    pool: {
        min: 0,
        max: 500
    }
})

module.exports = knex;