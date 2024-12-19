const checkUserId = (req, res, next) => {
  if (!req.headers["user-id"]) {
    return res.status(400).json({
      ok: false,
      message: "User ID is required",
    });
  }

  next();
};

module.exports = {
  checkUserId,
};
