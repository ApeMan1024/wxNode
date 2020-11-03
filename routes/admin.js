const express = require("express")
const router = express.Router()
const path = require("path")
const formidable=require("formidable")
const fs=require("fs")
const {
    adminLoginModel, editPingModel, 
    delPingModel, writeWenMdModel,getModlModel,
    addWenMoldModel,delWenMdModel,delWenImgModel,
    submitWenModel,editWenInfoModle
} = require("../model/modeladmin")

const {
    getToken, parseToken
} = require("../util/getToken")


const {readWenMd,writeWenMd}=require("../util/readFile")

const pdLogin=require("../util/pdLogin")

//管理员登录
router.post("/adminlogin", async (req, res, next) => {
    let { useradmin } = req.body
    let bool = await adminLoginModel(useradmin).catch(err => err)
    if (bool) {
        let token = getToken(useradmin)
        res.setHeader("token", token)
        return res.json({
            data: true,
            token,
            code: 200
        })
    }
    res.json({
        data: false,
        code: 404
    })
})

//修改评论消息
router.post("/editping", async (req, res, next) => {
    let { pingForm } = req.body
    let token = req.headers.token
    let useradmin = parseToken(token)
    let bool = await adminLoginModel(useradmin).catch(err => err)
    if (bool) {
        let bool1 = await editPingModel(pingForm)
        if (bool1) {
            res.json({
                data: true,
                code: 200
            })
            return
        }
        res.json({
            data: false,
            code: 404
        })
        return
    }
    //管理员尚未登录，拒绝访问
    res.json({
        data: false,
        code: 403
    })
})

//删除评论信息
router.post("/delping", async (req, res, next) => {
    let { id_1 } = req.body
    let token = req.headers.token
    let useradmin = parseToken(token)
    let bool = await adminLoginModel(useradmin).catch(err => err)
    if (bool) {
        let bool1 = await delPingModel(id_1)
        if (bool1) {
            res.json({
                data: true,
                code: 200
            })
            return
        }
        res.json({
            data: false,
            code: 404
        })
        return
    }
    //管理员尚未登录，拒绝访问
    res.json({
        data: false,
        code: 403
    })
})

//修改文章的内容
router.post("/amendwen", async (req, res, next) => {
    let { nei } = req.body
    let token = req.headers.token
    let useradmin = parseToken(token)
    let bool = await adminLoginModel(useradmin).catch(err => err)
    if (bool) {
        let bool1 = writeWenMdModel(nei)
        if (bool1) {
            res.json({
                data: true,
                code: 200
            })
            return
        }
        res.json({
            data: false,
            code: 404
        })
        return
    }
    //管理员尚未登录，拒绝访问
    res.json({
        data: false,
        code: 403
    })
})

//图片上传
router.post("/imgupdate", async (req, res, next) => {
    let form = new formidable.IncomingForm()
    form.uploadDir = path.resolve(__dirname,"../public/images/wen")
    form.keepExtensions=true
    form.parse(req)
    form.on("file",(name,file)=>{
        let types=file.name.split(".")
        let suffix=types[types.length-1]
        let filename=types.splice(0,types.length-1).join(".")+"_"+new Date().getTime()+"."+suffix
        fs.renameSync(file.path,path.resolve(__dirname,"../public/images/wen")+"/"+filename);
        res.json({
            data:{
                filename
            },
            code:200
        })
    })
    form.on("error",()=>{
        res.json({
            data:false,
            code:200
        })
    })
})

//文件上传
router.post("/fileupdate", async (req, res, next) => {
    let form = new formidable.IncomingForm()
    form.uploadDir = path.resolve(__dirname,"../public/file")
    form.keepExtensions=true
    form.parse(req)
    form.on("file",(name,file)=>{
        let types=file.name.split(".")
        let suffix=types[types.length-1]
        let filename=types.splice(0,types.length-1).join(".")+"_"+new Date().getTime()+"."+suffix
        fs.renameSync(file.path,path.resolve(__dirname,"../public/file")+"/"+filename);
        res.json({
            data:{
                filename
            },
            code:200
        })
    })
    form.on("error",()=>{
        res.json({
            data:false,
            code:200
        })
    })
})

//获取文章类型
router.post("/getmold",async (req,res,next)=>{
    let token = req.headers.token
    let useradmin = parseToken(token)
    let bool = await adminLoginModel(useradmin).catch(err => err)
    if(!bool){
        res.json({
            data:false,
            code:403
        })
        return 
    }
    let result=await getModlModel()
    if(result){
        res.json({
            data:result,
            code:200
        })
        return
    }
    res.json({
        data:false,
        code:404
    })
})

//添加文章的类型
router.post("/addmold",async (req,res,next)=>{
    let token = req.headers.token
    let useradmin = parseToken(token)
    let bool = await adminLoginModel(useradmin).catch(err => err)
    if(!bool){
        res.json({
            data:false,
            code:403
        })
        return 
    }
    let {newWenMoldForm}=req.body
    let bool1=await addWenMoldModel(newWenMoldForm)
    if(bool1){
        res.json({
            data:bool1,
            code:200
        })
        return 
    }
    res.json({
        data:bool1,
        code:404
    })
})

//删除文章
router.post("/delfile",async (req,res,next)=>{
    let {filename}=req.body
    let bool=delWenMdModel(filename)
    if(bool){
        return res.json({
            data:bool,
            code:200
        })
    }
    return res.json({
        data:bool,
        code:404
    })
})

//删除图片
router.post("/delimg",async (req,res,next)=>{
    let {src1}=req.body
    let bool=delWenImgModel(src1)
    if(bool){
        return res.json({
            data:bool,
            code:200
        })
    }
    return res.json({
        data:bool,
        code:404
    })
})

//根据文章名字获取文章内容
router.post("/getwennei",async (req,res,next)=>{
    let {filename}=req.body
    let bool=pdLogin(req,res)
    if(!bool){
        return
    }
    try {
        let md=readWenMd(null,filename)
        return res.json({
            data:md,
            code:200
        })
    } catch (error) {
        return res.json({
            data:false,
            code:404
        })
    }
})

//修改尚未保存的文章内容
router.post("/xiugaiwen",async (req,res,next)=>{
    let bool=pdLogin(req,res)
    if(!bool){
        return
    }
    let {filename,md}=req.body
    let bool1=writeWenMd(filename,md)
    if(bool1){
        res.json({
            data:bool1,
            code:200
        })
        return
    }
    res.json({
        data:bool1,
        code:404
    })
})

//添加文章
router.post("/addwen",async (req,res,next)=>{
    let bool=pdLogin(req,res)
    if(!bool){
        return
    }
    let {newWenForm}=req.body
    let bool1=await submitWenModel(newWenForm)
    if(bool1){
        return res.json({
            data:true,
            code:200
        })
    }
    res.json({
        data:false,
        code:404
    })
})

//修改文章信息
router.post("/editwen",async (req,res,next)=>{
    let bool=pdLogin(req,res)
    if(!bool){
        return
    }
    let {wen}=req.body
    let bool1=editWenInfoModle(wen)
    if(bool1){
        return res.json({
            data:true,
            code:200
        })
    }
    res.json({
        data:false,
        code:404
    })
})

module.exports = router