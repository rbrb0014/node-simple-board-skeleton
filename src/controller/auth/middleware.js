const authRequired = async (req, res, next) => {
    try {
        console.dir(req);
        if(req.session.user) return next();
        else throw new Error("NOT_EXIST");
    } catch (err) {
        throw next(err);
    }
};

module.exports = {
    authRequired,
};