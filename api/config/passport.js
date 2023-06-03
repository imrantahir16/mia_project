const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
        testMode: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        // console.log(profile);
        // console.log("i am here ", accessToken);
        const newUser = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          profileImage: profile.photos[0].value,
          status: "Active",
        };
        try {
          let user = await User.findOne({ googleId: profile.id });
          if (user) return done(null, user);

          user = await User.create(newUser);
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
