import User from "../models/users.model.js";
import logger from "../logger/winston.js";
import bcrypt from "bcrypt";

class UserRepository {
  async createUser({
    username,
    email,
    password,
    phoneNumber,
    citizenIdNumber,
  }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        phoneNumber,
        citizenIdNumber,
      });
      return user;
    } catch (error) {
      logger.error("Failed to create user:", error);
      throw new Error("Failed to create user");
    }
  }

  async findUser(email) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Failed to find user");
    }
  }
}

export default new UserRepository();
