import userRepository from "../repository/userRepository.js";
import bcrypt from "bcrypt";

class UserService {
  async register(userObject) {
    await userRepository.createUser(userObject);
  }

  async signIn(email, password) {
    const user = await userRepository.findUser(email);
    if (!user) {
      throw new Error("User not found");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }
    return user;
  }
}

export default new UserService();
