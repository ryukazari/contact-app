import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
import User from '../models/user.model';

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    const ususario = await User.findById(id);
    done(null, ususario);
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const user = new User();
    user.userName = username,
    user.password = password;
    await user.save();
    done(null, user);
}));