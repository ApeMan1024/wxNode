let express=require("express")
let router=express.Router()
let path=require("path")
let fs=require("fs")


router.get("/img",(req,res)=>{
    //读取轮播图文件夹中的内容
    let lunImgs=fs.readdirSync(path.resolve(__dirname,"../public/images/lun"))

    lunImgs=lunImgs.map(item=>{
        return "images/lun/"+item
    })
    res.json({
        data:lunImgs,
        "code":200
    })
})

module.exports=router