const { runQuery } =require("../lib/database");

const formatDate = date => {
    const yr = date.getFullYear();
    const mon = date.getMonth() + 1;
    const dt = date.getDate();
    const hrs = date.getHours();
    const mins = date.getMinutes();
    const secs = date.getSeconds();
    return `${yr}. ${mon}. ${dt} ${hrs}:${mins}:${secs}`;
};

const replaceDate = article => {
    if (article) {
        article.createdAt = formatDate(article.createdAt);
        article.lastUpdated = formatDate(article.lastUpdated);
    }
    return article;
};

const getList = async (start, count) => {
    const sql = "select articles.id, title, created_at as createdAt, last_updated as lastUpdated, users.display_name as displayName from articles inner join users on users.id = articles.author and articles.is_active = 1 and articles.is_deleted = 0 order by articles.id desc limit ?, ?";
    const results = await runQuery(sql, [start, count]);
    return results[0];
}

const getTotalCount = async () => {
    const sql = "select count(*) as articleCount from articles where is_active = 1 and is_deleted = 0";
    const results = await runQuery(sql, []);
    return results[0]['articleCount'];
}

const getById = async (id) => {
    const sql = "select articles.id, title, content, created_at as createdAt, last_updated as lastUpdated, author, display_name as displayName from articles inner join users on users.id = articles.author and articles.id = ? and articles.is_active = 1 and articles.is_deleted = 0";
    const results = await runQuery(sql, [id]);
    return results[0];
}

const getByIdAndAuthor = async (id, author) => {
    const sql = "select title, content, author, created_at as createAt, last_updated as lastUpdated from articles where id = ?, is_active = 1, is_deleted = 0";
    const results = await runQuery(sql, [id, author]);
    return results[0];
}

const create = async (title, content, author) => {
    const sql = 'insert into "articles" (title, content, author) values (?,?,?)';
    const results = await runQuery(sql, [title, content, author]);
    return results[0]['id'];
}

const update = async (id, title, content) => {
    const sql = 'update articles set title = ?,content = ? where id = ?';
    const results = await runQuery(sql, [title, content, id]);
    return results[0];
}

const remove = async (id) => {
    const sql = 'update articles set is_deleted = 1 where id = ?';
    const results = await runQuery(sql, [id]);
    return results[0];
}

module.exports = {
    getList,
    getTotalCount,
    getById,
    getByIdAndAuthor,
    create,
    update,
    remove,
};