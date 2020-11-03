const {userLogin}=require("../sql/sqluser")
const uuid=require("node-uuid")

//用户登录
async function userLoginModel(username,session_key,openid,avatarUrl){
    let bool=await userLogin(username,session_key,openid,avatarUrl).catch(err=>err)
    if(bool){
        return uuid.v4()
    }
    return false
}

module.exports={
    userLoginModel
}