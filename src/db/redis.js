import { createClient } from "redis";
import logger from "../logger/winston.js";

class Redis {
  redis;
  constructor() {}

  async getConnection() {
    if (this.redis) {
      return this.redis;
    }
    // Implement Redis connection here
    this.redis = await createClient()
      .on("error", (err) => logger.error("Redis Client Error", err))
      .connect();
    logger.info("Redis connected");
    return this.redis;
  }

  async get(key) {
    const client = await this.getConnection();
    return await client.get(key);
  }

  async set(key, value) {
    const client = await this.getConnection();
    await client.set(key, value);
  }

  async del(key) {
    const client = await this.getConnection();
    await client.del(key);
  }
  // Add more methods as needed
}

export default new Redis();
