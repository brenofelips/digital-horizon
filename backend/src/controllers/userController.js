import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { isValidEmail, validateRequestBody, checkUserLogin } from "../utils/validations.js";

export const register = async (req, res) => {
  try {
    const { isValid, errors } = validateRequestBody(
      ["username", "email", "password"],
      req.body,
    );
    const { username, email, password } = req.body;

    if (!isValidEmail(req.body.email)) {
      return res.status(400).json({ error: "Invalid Email" });
    }

    if (!isValid) {
      return res.status(400).json({ errors });
    }

    const newUser = await User.create({ username, email, password });
    return res.status(201).json({ newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (checkUserLogin(user, password)) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor");
  }
};

export const getIdUserByEmail = async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email });
    return res.status(200).json(user._id)
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error });
  }
}
