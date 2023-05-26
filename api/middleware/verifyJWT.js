const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401); // unauthorized
  const token = authHeader.split(" ")[1]; // Bearer token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res
        .status(403)
        .json({ error: err.message, message: "ERROR COMING FROM HERE" }); // which forbidden or invalid token
    req.userId = decoded.UserInfo.userId;
    // console.log(req.userId);
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = verifyJWT;
