let express=require("express")
let router=express.Router()

const {
    getWenMdModel,getNextbeforeModel,getWenPingModel,setWenPingModel
} = require("../model/model")

//获取文章的内容
router.post("/wenmd",async (req,res,next)=>{
    let {id}=req.body
    let md=await getWenMdModel(id).catch(err=>err)
    let obj=await getNextbeforeModel(id).catch(err=>err)
    let pings=await getWenPingModel(id).catch(err=>err)
    if(md&&obj&&pings){
        res.json({
            data:{
                md,obj,pings
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

// 发表评论
router.post("/ping",async (req,res,next)=>{
    let {ping}=req.body
    let bool=await setWenPingModel(ping).catch(err=>err)
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


module.exports=router