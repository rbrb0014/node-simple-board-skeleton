const indexPage = async (req, res, next) => {
    try {// views/index.pug
        const { user } = req.session;
        return res.render("index.pug", {user});
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    indexPage,
}