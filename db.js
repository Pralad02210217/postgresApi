const { Pool } = require('pg'); // Import the Pool class

const pool = new Pool({
    user: '02210217.cst',
    host: 'ep-green-resonance-78022097.ap-southeast-1.aws.neon.tech',
    database: 'PIMS',
    password: 'kaNvYSH7P6tz',
    port: 5432,
    ssl: require
});

module.exports = pool;
