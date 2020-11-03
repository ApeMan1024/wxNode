const { exec, beginTransaction } = require("../util/mysqlConnect");

//获取管理员信息
function getmanageinfo(currentpage,pagesize,username) {
    let sql = "select * from blogger where 1=1 and sign!=0 ";
    if(username){
        sql+=`and username like '%${username}%' order by case when (username='root') then 0 else 1 end,username desc `
    } else {
        sql+="order by case when (username='root') then 0 else 1 end,username desc "
    }
    if (currentpage) {
        sql += `limit ${(Number(currentpage) - 1) * pagesize},${pagesize}`;
    }
    return new Promise(async (resolve, reject) => {
        try {
            let result=await exec(sql);
            result=result.map(item=>{
                return {...item};
            })
            resolve(result);
        } catch (error) {
            reject(error);
        }
        
    })
}

//添加管理员信息
function addmanageinfo(username,password,power){
    let sql=`insert into blogger(username,password,power) values('${username}','${password}',${power})`;
    return new Promise(async (resolve,reject)=>{
        try {
            await beginTransaction(sql);
            resolve(true)
        } catch (error) {
            reject(false)
        }
        
    })
}

function delmanageinfo(username,power){
    let sql=`update blogger set sign=0 where username='${username}'`;
    if(power){
        sql=`update blogger set power=${power} where username='${username}'`;
    }
    return new Promise(async (resolve,reject)=>{
        try {
            await beginTransaction(sql);
            resolve(true);
        } catch (error) {
            reject(false);
        }
    });
}

module.exports={
    getmanageinfo,addmanageinfo,delmanageinfo
}