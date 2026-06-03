const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "replace-this-secret-in-env";

const getToken = (req) => {
  const bearerToken = req.header("authorization");

  if (bearerToken && bearerToken.startsWith("Bearer ")) {
    return bearerToken.slice(7);
  }

  return req.header("auth-token");
};

const fetchUser = (req, res, next) => {
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ error: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchUser;
