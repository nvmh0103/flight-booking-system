import { Router } from "express";
import logger from "../logger/winston.js";
import UserService from "../applications/userService.js";

const router = Router();

// Sign in route
router.post("/register", async (req, res) => {
  try {
    logger.info("Sign in route called");
    await UserService.register(req.body);
    res.status(201).send("User created");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Register route
router.post("/signin", async (req, res) => {
  try {
    logger.info("Sign in route called");
    await UserService.signIn(req.body.email, req.body.password);
    res.status(200).send("User signed in");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
