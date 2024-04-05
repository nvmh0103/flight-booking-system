import jwt from "jsonwebtoken";
class JWT {
  constructor(secretKey) {
    this.secretKey = secretKey;
  }

  encrypt(payload) {
    // Generate the JWT token using the payload and secret key
    const token = jwt.sign(payload, this.secretKey, {
      expiresIn: "15m",
    });
    return token;
  }

  verify(token) {
    // Verify the JWT token using the secret key
    const payload = jwt.verify(token, this.secretKey);
    return payload;
  }
}

export default new JWT(process.env.JWT_SECRET);
