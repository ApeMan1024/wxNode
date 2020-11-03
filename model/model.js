const {
    getWen,getWenTotal,setWenBrowseNum,getWenMd,getNextbefore,getWenPing,setWenPing,startNumBlog,getBlogNum
}=require("../sql/sql")

//获取文章数据
function getWenModel(currentPage,pageSize,mode,id){
    
    return new Promise(async (resolve,reject)=>{
        try {
            let data=await getWen(currentPage,pageSize,mode,id)
            resolve(data)
        } catch (err) {
            reject(err)
        }
    })    
}

//获取文章的总数量
function getWenTotalModel(){
    return new Promise(async (resolve,reject)=>{
        try {
            let data=await getWenTotal()
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

//设置文章的浏览次数
function setWenBrowseNumModel(id){
    return new Promise(async (resolve,reject)=>{
        let bool=await setWenBrowseNum(id).catch(err=>err)
        if(bool){
            resolve(bool)
            return
        }
        reject(bool)
    })
}

//获取文章的内容
function getNextbeforeModel(id){
    return new Promise(async (resolve,reject)=>{
        let obj=await getNextbefore(id).catch(err=>err)
        if(Object.keys(obj).length){
            return resolve(obj)
        }
        reject(false)
    })
}

//获取当前文章的前后篇文章
function getWenMdModel(id){
    return new Promise(async (resolve,reject)=>{
        let md=await getWenMd(id).catch(err=>err)
        if(md){
            return resolve(md)
        }
        reject(false)
    })
}

//获取文章的评论数据
function getWenPingModel(id){
    return new Promise(async (resolve,reject)=>{
        let pings=await getWenPing(id).catch(err=>err)
        if(pings){
            return resolve(pings)
        }
        reject(false)
    })
}

//发表文章评论
function setWenPingModel(ping){
    return new Promise(async (resolve,reject)=>{
        let bool=await setWenPing(ping)
        if(bool){
            return resolve(bool)
        }
        return reject(bool)
    })
}

//博客访问量统计
async function startNumBlogModel(){
    let bool=await startNumBlog().catch(err=>err)
    return bool
}


//获取博客的访问量
async function getBlogNumModel(){
    try {
        let result=await getBlogNum();
        return result;  
    } catch (error) {
        return error;
    }
}

module.exports={
    getWenModel,getWenTotalModel,
    setWenBrowseNumModel,getWenMdModel,
    getNextbeforeModel,getWenPingModel,setWenPingModel,startNumBlogModel,getBlogNumModel
}