const jwt = require("jsonwebtoken");
const logger = require("./logger");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    logger.info("verifyToken: Unauthorized " + req.url + " - " + req.method);
    return res.status(401).json({ message: "Unauthorized", status: 0 });
  }
  try {
    const verified = jwt.verify(
      token.replace("Bearer ", ""),
      req.body.serviceKey
    );
    req.user = verified;
    next();
  } catch (err) {
    logger.warn(
      "verifyToken: Invalid token " + req.url + " - " + req.method
    );
    res.status(403).json({ message: "Invalid token", status: 0 });
  }
};


module.exports = {
  verifyToken,
};
