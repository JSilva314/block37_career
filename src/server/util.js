const jwt = require("jsonwebtoken");

async function verify(req, res, next) {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).send({ message: "No token provided, NOT AUTHORIZED!" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401).send({ message: "No token provided, NOT AUTHORIZED!" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    console.log("req", req);
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send({ message: "Invalid token" });
    return;
  }
}

module.exports = { verify };
