const db=require('./db.js');
//设计集合的骨架
const adminSchema=new db.mongoose.Schema({
    username:{type:String},
    password:{type:String},
    time:{type:String}
});
//创建集合并将骨架添加到集合内
module.exports=db.mongoose.model("staffs",adminSchema)

