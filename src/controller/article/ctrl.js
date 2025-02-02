const { ArticleDAO } = require("../../DAO");

const readArticle = async (req, res, next) => {
    try {// views/auth/sign-in.pug
        const { articleId } = req.params;
        const { user } = req.session;
        const article = await ArticleDAO.getById(articleId);
        if (!article) throw new Error("NOT_EXIST");

        return res.render('articles/details.pug', { user, article });
    } catch (err) {
        return next(err);
    }
};

const writeArticleForm = async (req, res, next) => {
    try {
        const { user } = req.session;
        return res.render("articles/editor.pug", { user });
    } catch (err) {
        return next(err);
    }
};

const writeArticle = async (req, res, next) => {
    try {
        const { user } = req.session;
        const { title, content } = req.body;

        const trimmedTitle = title.trim();
        const trimmedContent = content.trim();

        if (!trimmedTitle ||
            trimmedTitle.length > 50 ||
            !trimmedContent ||
            trimmedContent.length > 65535) throw new Error('BAD_REQUEST');

        const newArticleId = await ArticleDAO.create(trimmedTitle, trimmedContent, user);

        return res.redirect(`/article/${newArticleId}`);
    } catch (err) {
        return next(err);
    }
};

const editArticleForm = async (req, res, next) => {
    try {
        const { user } = req.session;
        const { articleId } = req.params;

        const article = await ArticleDAO.getByIdAndAuthor(articleId, user);
        if (!article) throw new Error("NOT_EXIST");

        return res.render("articles/editor.pug", { user, article });
    } catch (err) {
        return next(err);
    }
};

const editArticle = async (req, res, next) => {
    try {
        const { user } = req.session;
        const { title, content } = req.body;
        const { articleId } = req.params;

        const trimmedTitle = title.trim();
        const trimmedContent = content.trim();

        if (!trimmedTitle ||
            trimmedTitle.length > 50 ||
            !trimmedContent ||
            trimmedContent.length > 65535) throw new Error('BAD_REQUEST');

        const article = await ArticleDAO.getByIdAndAuthor(articleId, user);
        if (!article) throw new Error("NOT_EXIST");

        await ArticleDAO.update(articleId, trimmedTitle, trimmedContent);

        return res.redirect(`/article/${articleId}`);
    } catch (err) {
        return next(err);
    }
};

const deleteArticle = async (req, res, next) => {
    try {
        const { user } = req.session;
        const { articleId } = req.params;

        const article = await ArticleDAO.getByIdAndAuthor(articleId, user);
        if (!article) throw new Error("NOT_EXIST");

        await ArticleDAO.remove(articleId);

        return res.redirect(`/articles`);
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    readArticle,
    writeArticleForm,
    writeArticle,
    editArticleForm,
    editArticle,
    deleteArticle,
}