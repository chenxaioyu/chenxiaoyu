var express = require('express');
var router = express.Router();
var user=require('../sql/staff');
var moment=require('moment')
/* GET users listing. */
//初始查询数据并渲染
router.get('/', function(req, res, next) {
  //查询数据
  user.find({},(err,data)=>{
    if(err){
      console.log(err);
    }
    console.log(data);//打印数据查看
    //渲染页面
    res.render('user1',{
      index:2,
      data:data
    })
  })
});
// 添加数据操作
router.get('/zhazha',(req,res,next)=>{
  res.render('userAdd',{
    index:2,
  })
});
//添加数据
router.post('/userAction',(req,res,next)=>{
  console.log('进入/addAction里面了');
  let obj=req.body;
  moment.locale('zh-cn');
  obj.time = moment().format();
  user.insertMany(obj,(err,data)=>{
    if(err){
      console.log(err);
    }
    console.log(data);
    res.redirect('/user')
  })
});
//删除数据
router.get('/delete',(req,res,next)=>{
  user.deleteOne({'_id':req.query._id},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log(data)
    res.redirect("/user");
  })
})
//修改数据操作
router.get("/update", function (req, res, next) {
  //get来的数据在req.query.id    拿到宇宙唯一id
  console.log(req.query)

  const _id = req.query._id;
  console.log("_id", _id);

  user.findById({"_id":_id},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log('我现在到了/update修改数据路由')
    console.log(data)
    console.log(data._id)
    res.render('userUpdate',{
      index:2,
      data:data
    })
  })

 
});
//修改数据
router.post('/userUpdateAction',(req,res,next)=>{
  let obj=req.body
  console.log('obj',obj);
  // res.send(obj)
  user.findByIdAndUpdate(obj._id,obj,(err,data)=>{
    if(err){
      console.log(err);
    }
    console.log('data',data);
    res.redirect('/user')
  })
});
//排序

router.get("/sort1", (req, res, next) => {
  const obj = req.query;
  user.find({}).sort({time:1}).exec((err,data)=>{
     if(err){
       console.log(err)
     }
     console.log(data)
       res.render("user1", {
      index: 1,
      data,
    })
   })
  
});

router.get("/sort2", (req, res, next) => {
  const obj = req.query;
    user.find({}).sort({time:-1}).exec((err,data)=>{
     if(err){
       console.log(err)
     }
     console.log(data)
       res.render("user1", {
      index: 1,
      data,
    })
   })
});
router.get("/search", (req, res, next) => {
  console.log("商品搜索路由 搜索数据")
  const obj = req.query;
 
  let reg = new RegExp(obj.search);
  user.find({username:reg},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log(data)
       res.render("user", {
       index: 1,
       data,
    });
  })

 
});

module.exports = router;
