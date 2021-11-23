// checks if the route parameter is a valid ObjectId type value
exports.validateId = (req, res, next) => {
    let id = req.params.id;
    //The objectId is 24-bit Hex string
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
};