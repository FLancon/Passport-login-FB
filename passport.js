const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config()

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
passport.use(new FacebookStrategy({
  clientID: process.env.CLIENT_ID_FB,
  clientSecret: process.env.CLIENT_SECRET_FB,
  callbackURL: "http://localhost:8000/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}
));