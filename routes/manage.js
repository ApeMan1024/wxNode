const express = require("express")
const router = express.Router()
const { getManageInfoModel,addManageInfoModel,delManageInfoModel } = require("../model/modelmanage");
const pdLogin=require("../util/pdLogin");
const {parseToken}=require("../util/getToken");
router.post("/getmanageinfo", async (req, res, next) => {
    let bool=pdLogin(req);
    if(!bool){
        return
    }
    let { currentPage, pageSize,username=null } = req.body;
    try {
        let manageinfo = await getManageInfoModel(currentPage, pageSize,username);
        let manageinfosize = await getManageInfoModel(null,null,username);
        res.json({
            data:{
                list:manageinfo,
                total:manageinfosize.length
            },
            code:200
        });
    } catch (error) {
        res.json({
            data:false,
            code:404
        })
    }

})

//添加管理员信息
router.post("/addmanageinfo",async (req,res,next)=>{
    let bool=pdLogin(req);
    if(!bool){
        return
    }
    let {username,password,power}=req.body;
    try {
        let result = await addManageInfoModel(username,password,power);
        res.json({
            data:result,
            code:200
        })
    } catch (error) {
        res.json({
            data:false,
            code:404
        })    
    }
})

//判断当前登录的管理员是不是超级管理员
router.post("/pdrouter",async (req,res,next)=>{
    let token = req.headers.token;
    let obj=parseToken(token);
    if(obj.username==="root"){
        return res.end("true");
    }
    return res.end("false");
})

//删除管理员信息
router.post("/delmanageinfo",async (req,res,next)=>{
    let bool=pdLogin(req);
    if(!bool){
        return
    }
    let {username}=req.body;
    
    try {
        await delManageInfoModel(username);
        res.json({
            data:true,
            code:200
        });
    } catch (error) {
        res.json({
            data:false,
            code:404
        })
    }
})

//修改管理员权限
router.post("/editmanageinfo",async (req,res,next)=>{
    let bool=pdLogin(req);
    if(!bool){
        return
    }
    let {username,power}=req.body;
    try {
        await delManageInfoModel(username,power);
        res.json({
            data:true,
            code:200
        });
    } catch (error) {
        res.json({
            data:false,
            code:404
        })
    }
})

module.exports=router;