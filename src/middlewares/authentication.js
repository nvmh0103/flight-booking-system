import JWTService from "../common/jwtUtils.js";
import logger from "../logger/winston.js";
import userRepository from "../repository/userRepository.js";
import cookie from "cookie";
import redis from "../db/redis.js";

const authenticationMiddleware = async (req, res, next) => {
  // Get the JWT token from the cookies

  const { token } = cookie.parse(req.headers.cookie);

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    //   Verify and decode the token
    const decoded = JWTService.verify(token);

    logger.info("Decoded token: ", decoded);
    const user = await userRepository.findUser(decoded.email);
    const tokenInRedis = await redis.get(decoded.email);

    if (!user || tokenInRedis != token) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = user;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default authenticationMiddleware;
