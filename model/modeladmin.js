const {
    adminLogin,editPing,
    delPing,getModl,
    addWenMold,submitWen,editWenInfo,editModl
}=require("../sql/sqladmin")

const {
    getWen
}=require("../sql/sql")

const {
    writeWenMd,delWenMd,delWenImg,xiuWen
}=require("../util/readFile")
//管理员登录
async function adminLoginModel(adminuser){
    let bool=await adminLogin(adminuser).catch(err=>err)
    return bool
}

async function editPingModel(pingForm){
    let bool=await editPing(pingForm)
    return bool
}

async function delPingModel(id_1){
    let bool=await delPing(id_1)
    return bool
}

//向文章中写入内容
function writeWenMdModel(nei){
    let filepath=`${nei.time}_${nei.title}_${nei.id}.md`
    let bool=writeWenMd(filepath,nei.content1)
    return bool
}

//获取文章的类型
async function getModlModel(){
    let bool=await getModl().catch(err=>err)
    if(bool){
        return bool
    }
    return bool
}

//添加文章的类型
async function addWenMoldModel(moldObj){
    let bool=await addWenMold(moldObj).catch(err=>err)
    if(bool){
        return bool
    }
    return bool
}

//删除文章
function delWenMdModel(filepath){
    let bool=delWenMd(filepath)
    return bool
}

//删除文章图片
function delWenImgModel(src1){
    let bool=delWenImg(src1)
    return bool
}

//添加文章信息
async function submitWenModel(newWenForm){
    let bool=await submitWen(newWenForm).catch(err=>err)
    if(!bool){
        return false
    }
    xiuWen(bool,newWenForm.title,newWenForm.time,newWenForm.filename)
    return true
}

async function editWenInfoModle(wen){
    let result=await getWen(null,null,null,wen.id)
    let wenObj=result[0]
    editModl(wenObj.mold)
    let bool=await editWenInfo(wen)
    if(bool){
        let filename=`${wenObj.time}_${wenObj.title}_${wenObj.id}.md`
        xiuWen(wen.id,wen.title,wen.time,filename)
        editModl(null,wen.mold)
        return true
    }
    return false
}

module.exports={
    adminLoginModel,editPingModel,
    delPingModel,writeWenMdModel,
    getModlModel,addWenMoldModel,
    delWenMdModel,delWenImgModel,
    submitWenModel,editWenInfoModle
}