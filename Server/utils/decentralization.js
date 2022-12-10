const { createError } = require("./error");
const { verifyToken } = require("./verifyToken");

exports.verifyUser = (req, res, next) => {
  if (req?.user?.id === req.params.id || req?.user?.isAdmin) {
    next();
  } else {
    return next(createError(403, "You are not authorized!"));
  }
};

exports.verifyAdmin = (req, res, next) => {
  if (req?.user?.isAdmin) {
    next();
  } else {
    return next(createError(403, "You are not authorized!"));
  }
};
