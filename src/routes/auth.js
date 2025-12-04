import { Router } from "express";
import { user } from "../models/user.js";
import { generateToken } from "../middlewares/auth.js";

const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const newUser = await user.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ newUser, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const newUser = await user.authenticate(req.body);
    const token = generateToken(newUser);
    res.json({ newUser, token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

export default authRouter;
