// @ts-nocheck
import UserModel from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Registering a New User
export const registerUser = async (req, res) => {
  // const {username, password, firstname, lastname} = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  req.body.password = hashedPassword;

  const newUser = new UserModel(req.body);

  const { username } = req.body;

  try {
    const oldUser = await UserModel.findOne({ username });

    if (oldUser) {
      return res.status(400).json({ message: "Username is already registered!" });
    }

    const user = await newUser.save();

    // Jwt Auth
    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "1hr" }
    );

    res.status(201).json({ user, token }); // This gets stored inside local storage and redux store
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username });

    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      if (!validity) {
        res.status(400).json({ message: "Wrong password!" });
      } else {
        const token = jwt.sign(
          {
            username: user.username,
            id: user._id,
          },
          process.env.JWT_KEY,
          { expiresIn: "1hr" }
        );
        res.status(200).json({ user, token });
      }
    } else {
      res.status(404).json("User does not exist.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
