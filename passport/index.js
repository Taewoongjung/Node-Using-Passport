const passport = require('passport');

const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, uaser.id);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({
            where: { id }
        })
    })
    .then(user => done(null, user))
    .catch(err => done(err));
};