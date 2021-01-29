const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/', async (req, res, next) => {
    const {id, passwd} = req.body;
    const paramID = id;
    const psw = passwd;
    console.log(paramID, psw);
    req.session.user = {
        name: paramID,
        password: psw,
        authorized: true
    };
    console.log(req.session);
    // res.cookie('tae', process.env.COOKIE_SECRET, {
    //     maxAge: 30000,   // 30000밀리초 → 30초
    //     httpOnly: true
    // });
    res.redirect(307, '/loggedin');
});

module.exports = router;