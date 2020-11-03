const {exec,beginTransaction } = require("../util/mysqlConnect")

//用户登录
function userLogin(username,session_key,openid,avatarUrl){
    let sql1=`select * from wxuser where openid='${openid}'`
    return new Promise(async (resolve,reject)=>{
        try {
            let result=await exec(sql1)
            if(!result.length){
                let sql2=`insert into wxuser(username,session_key,openid,avatarUrl) 
                        values('${username}','${session_key}','${openid}','${avatarUrl}')`
                await beginTransaction(sql2)
            }
            return resolve(true)
        } catch (error) {
            reject(false)
        }
    })
}

module.exports={
    userLogin
}
