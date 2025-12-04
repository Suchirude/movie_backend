import { user } from "../models/user.js";
import { generateToken } from "../middlewares/auth.js";


export const login = async (req, res) => {
  try {
    const newUser = await user.authenticate(req.body);
    const token = generateToken(newUser);
    return res.json({ newUser, token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

export const signup = async (req, res) => {
  try {
    const newUser = await user.create(req.body);
    const token = generateToken(newUser);
    return res.status(201).json({ newUser, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}