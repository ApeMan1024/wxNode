const jwt=require("jsonwebtoken")
const secret = require("../public/file/token/token")

//获取token值
function getToken(obj){
    let token=jwt.sign(obj,secret)
    return token
}

//解析token
function parseToken(token){
    try {
        let obj=jwt.verify(token,secret)
        return obj
    } catch (error) {
        return ""
    } 
}

module.exports={
    getToken,parseToken
}