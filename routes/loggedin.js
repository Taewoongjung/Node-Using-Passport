const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try{
        const {id, passwd} = req.body;
        console.log(id, passwd);

        const data = await User.findOne({ where: { name: id, }, },);
        //해당 ID의 자료가 없는 경우
        if( data === null || data === undefined) {
            console.log('로그인 자료가 없습니다. ID: ' + id);
            const data = {success:false, msg:'로그인 정보가 정확하지 않습니다.'};
            res.json(data);
            return;
        }

        if(data.password !== passwd){
            console.log('로그인 암호가 틀립니다. ID: ' + id);
            const data = {success:false, msg:'로그인 정보가 정확하지 않습니다.'};
            res.json(data);

        } else{
            console.log("로그인 성공했습니다. ID: " + id);
            res.render('loggedin', {me: id});
            console.log('cookie >>');
            console.log(req.cookies);
            // 세션에 필요한 정보 설정
        }
    }
    catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/home', async (req, res, next) => {
    try{
        if(req.session && req.session.user) {
            console.log('로그아웃 처리');
            req.session.destroy(
                function (err) {
                    if (err){
                        console.log('세션 삭제시 에러');
                        return;
                    }
                res.clearCookie('cookie-session');
                console.log(req.session);
                console.log(req.cookies);
                console.log('세션, 쿠키 삭제 성공');
                res.redirect('/');
                }
            )
        }
    } catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;