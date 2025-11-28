import express from "express";
import passport from "passport";
import  {oauthSuccessRedirect,requestSignupOtp,verifySignupOtp,localLogin,verifyUser,logout}  from "../controllers/authController.js";
import { getAllUsers } from "../controllers/userController.js";

const router=express.Router();

router.post("/signup/request-otp", requestSignupOtp);

// signup - verify otp & create user
router.post("/signup/verify-otp", verifySignupOtp);

// local login
router.post("/login", localLogin);

router.get(
  "/google",
  (req, res, next) => {
    console.log("Google SignIn request received");
    console.log("✅ GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
    next(); // let passport handle next
  },
  passport.authenticate("google", { scope: ["profile", "email"],session: false })
);

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/auth/fail",session: false }), oauthSuccessRedirect);

router.get("/github",(req,res)=>{
    console.log("GitHub SignIn request received")
});
router.get("/fail", (req, res) => res.status(401).send("OAuth failed"));

router.get("/me", verifyUser);
router.post("/logout", logout);
router.get("/allUser",getAllUsers);


export default router;