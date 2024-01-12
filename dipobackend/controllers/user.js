import User from "../models/User.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { generateToken, verifyGoogle } from "../utils.js";

export const signInWithGoogle = expressAsyncHandler(async (req, res) => {
  try {
    const result = await verifyGoogle(req.body.clientId, req.body.idToken);

    const { given_name, family_name, email } = result;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        firstname: given_name,
        lastname: family_name,
        isGoogleAccount: true,
      });
    }

    res.send({
      _id: user._id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      token: generateToken(user),
    });
  } catch (error) {
    console.error("Error signing in with Google:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export const signInWithEmail = expressAsyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      if (user.isGoogleAccount) {
        return res
          .status(401)
          .send({
            message:
              "This account is linked to Google. Please try to sign in with Google",
          });
      }

      if (bcrypt.compareSync(password, user.password)) {
        return res.send({
          _id: user._id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          token: generateToken(user),
        });
      }
    }

    res.status(401).send({ message: "Invalid email or password" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
