let { getmanageinfo,addmanageinfo,delmanageinfo } = require("../sql/sqlmanage");

//获取管理员信息
function getManageInfoModel(currentpage,pagesize,username) {
    return new Promise(async (resolve,reject)=>{
        try {
            let result=await getmanageinfo(currentpage,pagesize,username);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    }) 
}

//添加管理员信息
async function addManageInfoModel(username,password,power){
    return new Promise(async (resolve,reject)=>{
        try {
            await addmanageinfo(username,password,power);
            resolve(true)
        } catch (error) {
            reject(false)
        }
    })
}

//删除管理员信息
function delManageInfoModel(username,power){
    return new Promise(async (resolve,reject)=>{
        try {
            await delmanageinfo(username,power);
            resolve(true);
        } catch (error) {
            reject(false);
        }
    });
}
module.exports={
    getManageInfoModel,addManageInfoModel,delManageInfoModel
}