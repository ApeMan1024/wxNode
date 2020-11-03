const crypto=require("crypto");

//密匙
const SECRET_KEY="123456"

function md5(content){
    let md5=crypto.createHash("md5")
    return md5.update(content).digest("hex")
}

//加密函数
function getPassword(content){
    let str=`password=${content}&key=${SECRET_KEY}`
    return md5(str)
}

module.exports=getPassword