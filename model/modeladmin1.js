const {
    delWenSql,selectWen,
    selectWenTotal,getUserInfo,
    getUserInfoTotal,getUserInfoTotalSelect,
    getUserInfoSelect,editUserInfo,deleteUserInfo
}=require("../sql/sqladmin1")

const {delWenMd,delWenImg}=require("../util/readFile")
//删除文章
async function delWenSqlModel(wen){
    let bool=delWenSql(wen)
    if(bool){
        let filepath=`${wen.time}_${wen.title}_${wen.id}.md`
        await delWenMd(filepath)
        let src1=wen.src1.replace("images/wen/","")
        await delWenImg(src1)
        return true
    }
    return false
}

//查询文章
async function selectWenModel(currentPage, pageSize, mode, id){
    let res=await selectWen(currentPage, pageSize, mode, id).catch(err=>err)
    if(res){
        return res
    }
    return false
}

async function selectWenTotalModel(mode, id){
    let res=await selectWenTotal(mode, id).catch(err=>err)
    if(res){
        return res
    }
    return 0
}

//获取读者信息
async function getUserInfoModel(currentPage,pageSize,id,username){
    let result=await getUserInfo(currentPage,pageSize,id,username).catch(err=>err)
    if(result){
        return result
    }
    return false
}

//获取读者信息的总数据量
async function getUserInfoTotalModel(){
    let result=await getUserInfoTotal().catch(err=>err)
    if(result){
        return result
    }
    return 0
}

//模糊查询读者信息
async function getUserInfoSelectModel(currentPage, pageSize, id, username){
    let result=await getUserInfoSelect(currentPage, pageSize, id, username).catch(err=>err)
    if(result){
        return result
    }
    return false
}

async function getUserInfoTotalSelectModel(id, username){
    let result=await getUserInfoTotalSelect(id, username).catch(err=>err)
    if(result){
        return result
    }
    return 0
}

//编辑读者信息
async function editUserInfoModel(userInfo){
    let bool=await editUserInfo(userInfo).catch(err=>err)
    return bool
}

//删除读者信息
function deleteUserInfoModel(userinfo){
    let bool=deleteUserInfo(userinfo).catch(err=>err);
    return bool;
}

module.exports={
    delWenSqlModel,selectWenModel,
    selectWenTotalModel,getUserInfoModel,
    getUserInfoTotalModel,getUserInfoSelectModel,
    getUserInfoTotalSelectModel,editUserInfoModel,deleteUserInfoModel
}
