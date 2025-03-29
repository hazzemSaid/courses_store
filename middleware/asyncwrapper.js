
module.exports = (fun) => {
    return async(req, res, next) => {
        fun(req, res, next).catch((err) => {
            // Forward the error to the next middleware (error handler)
            next(err);
        });
    }
}
