const mysql = require('mysql2/promise');
const {logger} = require('./winston');

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
    host: 'flower.cfeyrpadoh9b.ap-northeast-2.rds.amazonaws.com',
    user: 'admin',
    port: '3306',
    password: 'flower123',
    database: 'flower'
});

module.exports = {
    pool: pool
};