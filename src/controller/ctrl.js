const { ArticleDAO } = require("../DAO");
const { getList } = require("../DAO/article");

const indexPage = async (req, res, next) => {
    try {// views/index.pug
        const { user } = req.session;
        return res.render("index.pug", { user });
    } catch (err) {
        return next(err);
    }
};

const listArticles = async (req, res, next) => {
    try {
        const { user } = req.session;
        const page = parseInt(req.params.page, 10);
        if (page <= 0) throw Error("BAD_REQUEST");

        const ARITCLES_PER_PAGE = 10;
        const articles = await ArticleDAO.getList((page - 1) * ARITCLES_PER_PAGE, ARITCLES_PER_PAGE);
        const articleCount = await ArticleDAO.getTotalCount();//article 총 갯수
        const pageCount = Math.ceil(articleCount / ARITCLES_PER_PAGE);

        return res.render('articles/index.pug', {
            user,
            articles,
            page,
            hasPrev: page > 1,
            hasNext: page < pageCount,
        })
    } catch (err) {
        return next(err);
    }
};

const latestArticles = async (req, res, next) => {
    try {
        return res.redirect('/articles/page/1');
    } catch (err) {
        return next(err);
    }
};



module.exports = {
    indexPage,
    listArticles,
    latestArticles,
}