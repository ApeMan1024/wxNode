var express = require('express');
var router = express.Router();

const {
    getWenModel, getWenTotalModel, setWenBrowseNumModel,startNumBlogModel,getBlogNumModel
} = require("../model/model")

const pdLogin=require("../util/pdLogin")

//获取文章数据
router.post('/wen', async function (req, res, next) {
    let body = req.body
    //获取当前的分页的页数
    let currentPage = body.currentPage
    //获取每页显示的数据条数
    let pageSize = body.pageSize

    try {
        let id=body.id
        let mode=body.mode
        
        let data=null
         //获取文章信息
        if(id){
            
            data = await getWenModel(null,null,null,id) 
        }
        else if(mode){
            data = await getWenModel(null,null,mode,null) 
            
        }
        else{
            data = await getWenModel(currentPage, pageSize)
        }
        
        let total = await getWenTotalModel()
        data.forEach(item => {
            item.src1 = "images/wen/" + item.src1
        })
        res.json({
            data: {
                wen: data,
                total
            },
            code: 200
        })
    } catch (err) {
        res.json({
            data: false,
            code: 404
        })
    }
});

//设置文章的浏览次数
router.post("/browse_num", async (req, res, next) => {
    let id=req.body.id
    console.log(id)
    let bool=await setWenBrowseNumModel(id).catch(err=>err)
    if(bool){
        res.json({
            data:bool,
            code:200
        })
        return
    }
    res.json({
        data:bool,
        code:404
    })  
})


router.post("/blognum",async (req,res,next)=>{
    let bool=await startNumBlogModel().catch(err=>err)
    if(bool){
        res.json({
            data:bool,
            code:200
        })
        return 
    }
    res.json({
        data:bool,
        code:404
    })
})

//获取博客的访问量
router.post("/getblognum",async (req,res,next)=>{
    let bool=pdLogin(req,res);
    if(!bool){
        return 
    }
    let bool1=await getBlogNumModel().catch(err=>err);
    if(bool1){
        return res.json({
            data:bool1,
            code:200
        })
    }
    res.json({
        data:false,
        code:404
    })
})

module.exports = router;
