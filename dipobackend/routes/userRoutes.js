import express from "express";
import { signInWithEmail, signInWithGoogle } from "../controllers/user.js";

const userRouter = express.Router();


userRouter.post("/signin", (req, res) => {
  if (req.body.idToken) {
    return signInWithGoogle(req, res);
  } else {
    return signInWithEmail(req, res);
  }
});



export default userRouter;