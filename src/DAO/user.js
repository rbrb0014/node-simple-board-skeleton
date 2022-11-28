const { runQuery } = require("../lib/database");

const getByUsername = async (username) => {
    const sql = 'select id, password, display_name as displayName, is_active as isActive, is_staff as isStaff from users where username = ?';
    const results = await runQuery(sql, [username]);
    return results;
}

//회원 가입
const create = async (username, password, displayName) => {
    const sql = 'insert into `users` (username, password, display_name) values (?,?,?)';
    const results = await runQuery(sql, [username, password, displayName]);
    return results;
}

module.exports = {
    getByUsername,
    create,
}