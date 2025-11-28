import User from "../modules/User.js";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {Otp} from "../modules/Otp.js";


function signToken(user) {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// 1) Request signup -> send OTP to email (OTP stored in DB with TTL)
async function requestSignupOtp(req, res) {
  try {
    const { email, name, password } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email required" });

    // If user exists and provider != local -> allow? we will still allow OTP but check later
    // generate OTP 6-digit
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const ttlMinutes = 10;
    const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);

    // upsert OTP for email
    await Otp.findOneAndUpdate(
      { email: email.toLowerCase() },
      { otp: otpCode, expiresAt },
      { upsert: true, new: true }
    );

    // send email
    await sendMail({
      to: email,
      subject: "Your OTP for BookStore",
      html: `<p>Your OTP for BookStore signup/login is <b>${otpCode}</b>. It expires in ${ttlMinutes} minutes.</p>`
    });

    // optionally store password temporarily? Better: include password in verify call -- but we'll accept password in verify step
    return res.json({ success: true, message: "OTP sent to email" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

// 2) Verify OTP -> create user if not exists + return JWT
async function verifySignupOtp(req, res) {
  try {
    const { email, otp, name, password } = req.body;
    if (!email || !otp) return res.status(400).json({ success: false, message: "Email and OTP required" });

    const record = await Otp.findOne({ email: email.toLowerCase(), otp });
    if (!record) return res.status(400).json({ success: false, message: "Invalid or expired OTP" });

    // OTP valid -> remove it
    await Otp.deleteOne({ _id: record._id });

    // find or create user
    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      const hash = password ? await bcrypt.hash(password, 10) : undefined;
      user = await User.create({
        name,
        email: email.toLowerCase(),
        passwordHash: hash,
        provider: "local"
      });
    } else if (!user.passwordHash && password) {
      // set password if provided and none exists
      user.passwordHash = await bcrypt.hash(password, 10);
      await user.save();
    }

    const token = signToken(user);
    return res.json({ success: true, token, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

// 3) Local login (email + password)
async function localLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: "Email and password required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !user.passwordHash) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = signToken(user);
    return res.json({ success: true, token, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}


export function oauthSuccessRedirect(req,res){
    try{
        const user=req.user;
    // console.log(user);
    const jwt=jsonwebtoken.sign({
        id:user._id,
        email:user.email
    },process.env.JWT_SECRET,{expiresIn:"1h"});
    console.log(jwt)
    res.cookie("token", jwt, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
    
    res.redirect(`${process.env.FRONTEND_URL}/lobby`);
    }catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

async function getUserFromToken(token) {
  try {
    // console.log(token)
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    console.log("decoded",decoded)
    // const user = await User.findById(decoded.id).select("-password").lean();
    // console.log("sherr user",user)
    return null;
  } catch (err) {
    return null;
  }

  
}

export const verifyUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    // console.log("token",token)
    if (!token) return res.status(401).json({ message: "No token found" });
    //  console.log("🟢 Secret key:", process.env.JWT_SECRET);

    // const user=await getUserFromToken(token);
    // console.log("user",user)
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    // console.log("user",decoded)
    const user = await User.findById(decoded.id).select("-password").lean();
    // console.log("user",user)
    res.json({ user });
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};

export { requestSignupOtp, verifySignupOtp, localLogin, getUserFromToken };