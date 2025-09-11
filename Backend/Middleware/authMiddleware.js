const jwt = require("jsonwebtoken");

// authorisation

const organiserAuth = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const token = authorization.split(" ")[1];

    if (!token) return res.status(400).json({ message: "USER_NOT_AUTHORIZED" });
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        console.log(err);

        if (err) {
          return res.status(403).json({ message: "Invalid Token" });
        }
        console.log(user);

        if (req.headers.role.toLowerCase() != "Organizer".toLowerCase())
          return res.status(403).json({ message: "Invalid User" });
        req.user = user;
        next();
      });
    }
  } catch (err) {
    console.log("error for midlleware", err);

    return res.status(500).json({ message: err.message });
  }
};

const attendeAuth = (req, res, next) => {
  const { authorization } = req.config.headers;
  try {
    const token = authorization.split(" ")[1];
    if (!token) return res.status(400).json({ message: "USER_NOT_AUTHORIZED" });
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          res.status(403).json({ message: "Invalid Token" });
        }
        if (user.role != "Attende")
          return res.status(403).json({ message: "Invalid User" });
        req.user = user;
        next();
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { organiserAuth, attendeAuth };
