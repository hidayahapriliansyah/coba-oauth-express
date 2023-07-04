const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('./models/userModel');
// const JwtStrategy = require("passport-jwt").Strategy;
// const { ExtractJwt } = require("passport-jwt");
require('dotenv').config();

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback',
    passReqToCallback: true,
  }, async (request, accessToken, refreshToken, profile, done) => {
    console.log('passport config working');
    try {
      let existingUser = await User.findOne({ 'google.id': profile.id });
      // if user exists
      if (existingUser) {
        return done(null, existingUser);
      }
      // if user not exists, create new user
      console.log('Creating new User ...');
      const newUser = new User({
        method: 'google',
        google: {
          id: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        }
      });
      await newUser.save();
      return done(null, newUser);
    } catch (error) {
      return done(error, false);
    }
  }));
  // passport.use(
  //   new JwtStrategy(
  //     {
  //       jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  //       secretOrKey: "secretKey",
  //     },
  //     async (jwtPayload, done) => {
  //       try {
  //         // <em>// Extract user</em> 
  //         const user = jwtPayload.user;
  //         done(null, user); 
  //       } catch (error) {
  //         done(error, false);
  //       }
  //     }
  //   )
  // );
};
