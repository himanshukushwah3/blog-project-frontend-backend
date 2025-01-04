import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Modules
import User from "../models/user.js";
import Token from "../models/token.js";

dotenv.config();

export const signUpUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10); //
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
    });

    await user.save();
    return res.status(200).json({ msg: "Successfully signed up" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const loginUser = async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).json({ msg: "Username Does Not Match" });
  }
  try {
    let match = await bcrypt.compare(req.body.password, user.password);

    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_JWT_KEY,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_JWT_KEY
      );

      const token = new Token({ token: refreshToken });
      await token.save();

      res.status(200).json({
        accessToken,
        refreshToken,
        name: user.name,
        username: user.username,
      });
    } else {
      res.status(400).json({ msg: "Password Does Not Match" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


