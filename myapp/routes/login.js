
const express = require('express')

var router = express.Router()
// 要引入 user的数据库架构完成的状态
const user = require('../sql/user')


router.get('/',function(req,res,next){
    console.log('login/')
    res.render('login')
})


router.post('/in',function(req,res,next){
    console.log('我进入 login  in里面了')
    let obj = req.body

    user.findOne(obj,(err,data)=>{
        console.log(obj);
        if(err){
            console.log('err',err)
        }
        console.log(data);
        if(data) {
            //如果进入到这里，意味着这测过，是我们的用户
            //所以在用户身上种cookie
            // res.cookie('obj.username','obj.password');
            // res.cookie('isLogin','ok')
            req.session.isLogin="ok";

            console.log('登录成功')
            res.redirect('/pro')
        }else {
            res.redirect('/register')
        }
    })

})


module.exports = router;
