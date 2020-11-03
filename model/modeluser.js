const {readWenMd,getUserInfo}=require("../util/readFile")
//获取博客简介信息
function getAboutModel(){
    try {
        let md=readWenMd(true,"猿人博客.md")
        return md
    } catch (error) {
        throw error
    }   
}

function getUserInfoModel(){
    try {
        let md=getUserInfo()
        return md
    } catch (error) {
        throw error
    }   
}

module.exports={
    getAboutModel,getUserInfoModel
}