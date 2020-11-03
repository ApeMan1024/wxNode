const { default: Axios } = require('axios');
const wxjson=require("../public/file/wx/wx.json")
const {
  userLoginModel
}=require("../model/modelogin")
var express = require('express');
var router = express.Router();

const { getAboutModel,getUserInfoModel } = require("../model/modeluser")

//获取博客简介信息
router.post('/about', function (req, res, next) {
  try {
    let md=getAboutModel()
    res.json({
      data:md,
      code:200
    })
  } catch (error) {
    res.json({
      data:"",
      code:404
    })
  }
});

//获取博主信息
router.post("/userinfo",(req,res,next)=>{
  try {
    let md=getUserInfoModel()
    res.json({
      data:md,
      code:200
    })
  } catch (error) {
    res.json({
      data:"",
      code:404
    })
  }
})

//博客浏览者登录
router.post("/wxlogin",async (req,res,next)=>{
  let {code,avatarUrl,nickName}=req.body
  let {data:result}=await Axios.get("https://api.weixin.qq.com/sns/jscode2session",{
    params:{
      js_code:code,
      appid:wxjson.appid,
      secret:wxjson.appSecret,
      grant_type:"authorization_code"
    }
  })
  let uuid=await userLoginModel(nickName,result.session_key,result.openid,avatarUrl)
  if(uuid){
    return res.json({
      data:uuid,
      code:200
    })
  }
  return res.json({
    data:uuid,
    code:404
  })  
})

module.exports = router;
