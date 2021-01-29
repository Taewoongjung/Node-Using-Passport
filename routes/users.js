const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        try{
            const users = await User.findAll();
            res.json(users);
        } catch (err) {
            console.log(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
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
        res.cookie('tae', process.env.COOKIE_SECRET, {
            maxAge: 30000,   // 30000밀리초 → 30초
            httpOnly: true
        });
        res.redirect(307, '/loggedin');
    });

// const url = require('url');    
// app.get('/category', function(req, res) {
//     res.redirect(url.format({
//        pathname:"/",
//        query: {
//           "a": 1,
//           "b": 2,
//           "valid":"your string here"
//         }
//      }));
//  });


module.exports = router;