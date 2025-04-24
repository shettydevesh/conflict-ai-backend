import jwt from "jsonwebtoken";
import config from "../config/configuration.js";

const secretKey = config.jwtSecret;

function verifyToken(req, res, next) {
  const authorizationHeader = req?.headers?.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ error: "You are not authorized" });
  }

  const token = authorizationHeader.split(" ")[1];

  jwt.verify(token, secretKey, (err, authData) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    req.authData = authData;
    next();
  });
}

export default verifyToken;
