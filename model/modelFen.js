const {
    wenFen,getWenFen
}=require("../sql/sqlFen")

//获取文章的分类
async function wenFenModel(){
    try{
        let result=await wenFen()
        return result
    }catch(err){
        return error
    }
}

//获取文章信息
async function getWenFenModel(id,title){
    try {
        let result=await getWenFen(id,title)
        return result
    } catch (error) {
        return error
    }
}

module.exports={
    wenFenModel,getWenFenModel
}