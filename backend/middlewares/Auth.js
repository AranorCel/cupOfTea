export default (req, res, next) => {
    // res.locals.isLogged = req.session?.userId ? true : false
    // res.locals.isAdmin = req.session?.isAdmin ? true : false
    next();
}