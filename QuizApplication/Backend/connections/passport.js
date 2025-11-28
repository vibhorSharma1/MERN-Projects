import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import passportGithub from "passport-github2";
import User from "../modules/User.js";




const GoogleStrategy = passportGoogle.Strategy;

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.GOOGLE_CALLBACK_URL
},async (accessToken,refrenceToken,profile,done)=>{
    try{
        // console.log("Profile",profile)
        // console.log("done",done)
        // console.log("acessToken",accessToken)
        // console.log("refrenceToken",refrenceToken)
        const email=profile.emails[0].value;
        let user=await User.findOne({email:email});
        // console.log("user",user)
        if(!user){
            const name=profile.displayName   
                user=await User.create({
                firstName:name.split(" ")[0],
                lastName:name.split(" ")[1] || " ",
                email,
                imageUrl:profile.photos[0].value,
                password:"google_oauth",
            });
        }
        return done(null,user);
    }catch(error){
        console.log(error)
    }
}
));

passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser(async (id,done)=>{
    try{
        const user=await User.findById(id);
        done(null,user);
    }catch(error){
        done(error,null);
    }
});