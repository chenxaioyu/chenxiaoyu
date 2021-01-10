const  express=require('express');
var  router=express.Router();
//引入user数据库框架
const user =require('../sql/user');
//注册操作
router.get('/',(req,res,next)=>{
    console.log('进入注册');
    // 跳到渲染页面
    res.render('register')
})
router.post('/in',(req,res,next)=>{
    console.log('进入到login/in 里面了');
    //保存req.body 携带的数据
    let obj=req.body;
    user.findOne({username:obj.username},(err,data)=>{
        if(err){
            console.log(err);
        }
        if(data){
            // res.send('用户已存在');
            res.redirect('/register')
        }else{
            user.insertMany(obj,(err,data)=>{
                if(err){
                    console.log(err)
                }
                console.log(data)
                res.redirect('/login')
            })  
        }
    })
})


module.exports=router;