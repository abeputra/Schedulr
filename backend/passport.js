import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from './models/UserModel.js'; // pastikan path-nya benar

passport.use(new GoogleStrategy({
  clientID: '431279004243-c1mb1n14398p43tata5dgaa01i0aidn0.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:5000/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({
        full_name: profile.displayName,
        email,
        username: profile.id, // kamu bisa ubah logikanya
        password: 'google_oauth',
        phone_number: '-',
        country: '-',
        address: '-',
        gender: 'other',
        dob: '2000-01-01',
      });
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id);
  done(null, user);
});
