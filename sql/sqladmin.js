const  {exec,beginTransaction}=require("../util/mysqlConnect")
//管理员登录
function adminLogin(adminuser){
    let sql=`select count(username) as num from blogger where username='${adminuser.username}' and password='${adminuser.password}'`
    return new Promise(async (resolve,reject)=>{
        try {
            let result=await exec(sql)
            if(result[0].num>0){
                resolve(true)
                return
            }
            resolve(false)
        } catch (error) {
            reject(false)
        }
    })
}

//修改评论消息
function editPing(pingForm){
    let sql=`update ping set nei='${pingForm.nei}' , name='${pingForm.name}' , time='${pingForm.time}' where id_1=${pingForm.id_1}`
    return new Promise(async (resolve,reject)=>{
        try {
            await beginTransaction(sql)
            resolve(true)
        } catch (error) {
            reject(false)
        }
    })
}

//删除评论信息
function delPing(id_1){
    let sql=`delete from ping where id_1=${id_1}`
    return new Promise(async (resolve,reject)=>{
        try {
            await beginTransaction(sql)
            resolve(true)
        } catch (error) {
            reject(false)
        }
    })
}

//获取文章的类型
function getModl(){
    let sql="select * from classify"
    return new Promise(async (resolve,reject)=>{
        try {
            let result=await exec(sql)
            result=result.map(item=>{
                return {...item}
            })
            resolve(result)
        } catch (error) {
            reject(false)
        }
    })
}

//添加文章类型
function addWenMold(moldObj){
    let sql=`insert into classify(name,num) values('${moldObj.name}',${moldObj.num})`
    return new Promise(async (resolve,reject)=>{
        try {
            let result=await beginTransaction(sql)
            if(result.affectedRows>0){
                return resolve(true)
            }
        } catch (error) {
            return reject(false)
        }
        reject(false)
    })
}

//保存文章信息
async function submitWen(newWenForm){
    //添加文章信息
    let sql=`insert into essay(src1,time,author,mold,title) 
    values('${newWenForm.src1}','${newWenForm.time}','${newWenForm.author}','${newWenForm.mold}','${newWenForm.title}')`
    //设置文章类型数据
    let sql1=`update classify set num=num+1 where name='${newWenForm.mold}'`
    //获取添加文章的标题
    let sql2="select id from essay where id in (select LAST_INSERT_ID() as id)"

    try {
        await beginTransaction(sql)
        await beginTransaction(sql1)
        let result=await exec(sql2)
        return result[0].id
    } catch (error) {
        return false        
    }
}

//修改文章信息
async function editWenInfo(wen){
    let sql=`update essay set author='${wen.author}' , mold='${wen.mold}' , 
    num='${wen.num}' , title='${wen.title}' where id='${wen.id}'`
    try {
        await beginTransaction(sql)
        return true
    } catch (error) {
        return false        
    }
}

//计数文章类型
async function editModl(oldname,newname){
    let sql=""
    if(oldname){
        sql=`update classify set num=num-1 where name='${oldname}'`
    }
    if(newname){
        sql=`update classify set num=num+1 where name='${newname}'`
    }
    try {
        await beginTransaction(sql)
        return true
    } catch (error) {
        return false        
    }
}

module.exports={
    adminLogin,editPing,
    delPing,getModl,
    addWenMold,submitWen,editWenInfo,editModl
}