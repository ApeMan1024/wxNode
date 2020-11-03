const {parseToken}=require("../util/getToken")
const {adminLoginModel}=require("../model/modeladmin")
async function pdLogin(req){
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
    return true
}

module.exports=pdLogin