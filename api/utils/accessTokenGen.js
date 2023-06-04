const jwt = require("jsonwebtoken");

const accessTokenGen = (id, roles) => {
  const accessToken = jwt.sign(
    {
      UserInfo: {
        userId: id,
        roles: roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30d" }
  );
  return accessToken;
};

module.exports = accessTokenGen;
