const express = require('express');
const path = require('path');
const User = require('../models/user');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try{
        res.sendFile(path.join(__dirname, '../views/signup.html'));
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.post('/check-signup',async (req, res, next) => {
    try {
        const {id, passwd, check_psw} = req.body;
        const user = await User.findOne({
            where: {name: id},
        });
        if(user){
            return res.redirect('/signup/?error=same is exist');
        }
        else if(passwd !== check_psw){
            return res.redirect('/signup/?error=password not matched');
        }
        await User.create({
            name: id,
            password: passwd,
        });
        return res.redirect('/?success=signup success');
    } catch(err){
        console.error(err);
        next(err);
    }
});
    
module.exports = router;