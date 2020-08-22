const jwt = require("jsonwebtoken");

function checkAuthenticated(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // The code before && means if it exists
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JSON_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = { checkAuthenticated };
