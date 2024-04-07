import { Router } from "express";
import logger from "../logger/winston.js";
import UserService from "../applications/userService.js";
import JWTService from "../common/jwtUtils.js";
import flightService from "../applications/flightService.js";
import authenticationMiddleware from "../middlewares/authentication.js";
import cookie from "cookie";
import redis from "../db/redis.js";
import ticketService from "../applications/ticketService.js";
import bookingService from "../applications/bookingService.js";

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
    const user = await UserService.signIn(req.body.email, req.body.password);
    // Create a JWT token
    const token = JWTService.encrypt({ email: user.email });
    // Set the token in the cookies
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 3600,
      }),
    );
    // Save token into redis
    await redis.set(user.email, token);
    res.status(200).send("User signed in");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// get list of flights
router.get("/flights", async (req, res) => {
  try {
    logger.info("Get flights route called");
    const flight = await flightService.getFlights(req.body);
    res.status(200).send({ flight });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/user", authenticationMiddleware, async (req, res) => {
  try {
    logger.info("Get user route called");
    res.status(200).send({ user: req.user });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/bookings", authenticationMiddleware, async (req, res) => {
  try {
    logger.info("Create booking route called");
    await bookingService.createBooking(req.body.tickets, req.user.id);
    res.status(201).send("Booking created");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/tickets", authenticationMiddleware, async (req, res) => {
  try {
    logger.info("Get tickets route called");
    const tickets = await ticketService.getTicketsByUserId(req.user.id);
    res.status(200).send({ tickets });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete(
  "/tickets/:ticketId",
  authenticationMiddleware,
  async (req, res) => {
    try {
      logger.info("Delete ticket route called");
      await ticketService.deleteTicket(req.params.ticketId, req.user.id);
      res.status(204).send("Ticket deleted");
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
);

router.get("/flights/:flightNumber", async (req, res) => {
  try {
    logger.info("Get flight by id route called");
    const flight = await flightService.getFlightsByFlightNumber(
      req.params.flightNumber,
    );
    res.status(200).send({ flight });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
