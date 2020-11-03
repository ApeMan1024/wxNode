const express=require("express")
const router=express.Router()
const {
    delWenSqlModel,selectWenModel,
    selectWenTotalModel,getUserInfoModel,
    getUserInfoTotalModel,getUserInfoSelectModel,
    getUserInfoTotalSelectModel,editUserInfoModel,deleteUserInfoModel}=require("../model/modeladmin1")
const pdLogin=require("../util/pdLogin")

//删除文章信息
router.post("/rootdelwen",async (req,res,next)=>{
    let bool1=await pdLogin(req,res)
    if(!bool1){
        return 
    }
    let {wen}=req.body
    let bool=await delWenSqlModel(wen)
    if(bool){
        res.json({
            data:true,
            code:200
        })
        return
    }
    res.json({
        data:false,
        code:404
    })
})

router.post("/selectwen",async (req,res,next)=>{
    let bool1=await pdLogin(req,res)
    if(!bool1){
        return 
    }
    let {currentPage, pageSize, mode, id}=req.body
    let result=await selectWenModel(currentPage, pageSize, mode, id)
    result.forEach(item => {
        item.src1 = "images/wen/" + item.src1
    })
    let total=await selectWenTotalModel(mode, id)
    if(result){
        res.json({
            data:{
                result,
                total
            },
            code:200
        })
        return 
    }
    res.json({
        data:false,
        code:404
    })
})

//获取读者信息
router.post("/getuserinfo",async (req,res,next)=>{
    let bool1=await pdLogin(req,res)
    if(!bool1){
        return 
    }
    let {currentPage,pageSize,id,username}=req.body
    let result=await getUserInfoModel(currentPage,pageSize,id,username).catch(err=>err)
    let total=await getUserInfoTotalModel().catch(err=>err)
    if(result){
        return res.json({
            data:{
                result,
                total
            },
            code:200
        })
    }
    return res.json({
        data:false,
        code:404
    })
})

//模糊查询读者信息
router.post("/getuserselect",async (req,res,next)=>{
    let bool1=await pdLogin(req,res)
    if(!bool1){
        return 
    }
    let {currentPage,pageSize,id,username}=req.body
    let result=await getUserInfoSelectModel(currentPage,pageSize,id,username).catch(err=>err)
    let total=await getUserInfoTotalSelectModel(id,username).catch(err=>err)
    if(result){
        return res.json({
            data:{
                result,
                total
            },
            code:200
        })
    }
    return res.json({
        data:false,
        code:404
    })
})

//编辑读者信息
router.post("/edituserinfo",async (req,res,next)=>{
    let bool1=await pdLogin(req,res)
    if(!bool1){
        return 
    }
    let {userinfo}=req.body
    let bool=await editUserInfoModel(userinfo)
    if(bool){
        return res.json({
            data:bool,
            code:200
        })
    }
    res.json({
        data:bool,
        code:404
    })
})

//删除读者信息
router.post("/deleteuserinfo",async (req,res,next)=>{
    let bool1=await pdLogin(req,res)
    if(!bool1){
        return 
    }
    let {userinfo}=req.body;
    let bool=await deleteUserInfoModel(userinfo);
    if(bool){
        return res.json({
            data:bool,
            code:200
        })
    }
    res.json({
        data:bool,
        code:404
    })
})

module.exports=router