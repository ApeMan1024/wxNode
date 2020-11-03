const { exec, beginTransaction } = require("../util/mysqlConnect")
const { editModl } = require("../sql/sqladmin")
const getPassword = require("../util/md5")
//删除文章
async function delWenSql(wen) {
    let sql = `delete from essay where id=${wen.id}`
    let sql1 = `delete from ping where id=${wen.id}`
    try {
        await beginTransaction(sql1)
        await beginTransaction(sql)
        await editModl(wen.mold)
        return true
    } catch (error) {
        return false
    }
}


//搜索文章的数据
function selectWen(currentPage, pageSize, mode, id) {
    let sql = "select * from essay where 1=1 "
    if (mode) {
        sql += `and title like '%${mode}%' `
    }
    if (id) {
        sql += `and id like '%${id}%' `
    }
    if (currentPage) {
        sql += 'order by id desc  '
        sql += `limit ${(Number(currentPage) - 1) * pageSize},${pageSize} `
    } else {
        sql += 'order by id desc  '
    }
    return new Promise(async (resolve, reject) => {
        try {
            let result = await exec(sql)
            res = result.map(item => {
                return { ...item }
            })
            resolve(res)
        } catch (err) {
            reject(err)
        }
    })
}

function selectWenTotal(mode, id) {
    let sql = "select count(*) as num from essay where 1=1 "
    if (mode) {
        sql += `and title like '%${mode}%' `
    }
    if (id) {
        sql += `and id like '%${id}%' `
    }
    return new Promise(async (resolve, reject) => {
        try {
            let result = await exec(sql)
            resolve(result[0].num)
        } catch (err) {
            reject(err)
        }
    })
}

//获取用户信息
function getUserInfo(currentPage, pageSize, id, username) {
    let sql = "select * from wxuser where 1=1 "
    if (id) {
        sql += `and id=${id} `
    }
    if (username) {
        sql += `and username='${username}' `
    }
    if (currentPage) {
        sql += "order by id desc "
        sql += `limit ${(Number(currentPage) - 1) * pageSize},${pageSize} `
    } else {
        sql += "order by id desc "
    }
    return new Promise(async (resolve, reject) => {
        try {
            let result = await exec(sql)
            result=result.map(item => {
                item.private = getPassword(item.session_key + "_" + item.openid)
                delete item.session_key
                delete item.openid
                return { ...item }
            })
            resolve(result)
        } catch (error) {
            reject(false)
        }
    })
}

//获取读者信息的总量
function getUserInfoTotal(){
    let sql="select count(*) as num from wxuser where 1=1 "
    return new Promise(async (resolve,reject)=>{
        try {
            let result = await exec(sql)
            resolve(result[0].num)
        } catch (error) {
            reject(false)
        }
    })
}

//模糊查询读者信息
function getUserInfoSelect(currentPage, pageSize, id, username){
    let sql = "select * from wxuser where 1=1 "
    if (id) {
        sql += `and id like '%${id}%' `
    }
    if (username) {
        sql += `and username like '%${username}%' `
    }
    if (currentPage) {
        sql += "order by id desc "
        sql += `limit ${(Number(currentPage) - 1) * pageSize},${pageSize} `
    } else {
        sql += "order by id desc "
    }
    return new Promise(async (resolve, reject) => {
        try {
            let result = await exec(sql)
            result=result.map(item => {
                item.private = getPassword(item.session_key + "_" + item.openid)
                delete item.session_key
                delete item.openid
                return { ...item }
            })
            resolve(result)
        } catch (error) {
            reject(false)
        }
    })
}

//模糊查询读者信息的总量
function getUserInfoTotalSelect(id,username){
    let sql="select count(*) as num from wxuser where 1=1 "
    if (id) {
        sql += `and id like '%${id}%' `
    }
    if (username) {
        sql += `and username like '%${username}%' `
    }
    return new Promise(async (resolve,reject)=>{
        try {
            let result = await exec(sql)
            resolve(result[0].num)
        } catch (error) {
            reject(false)
        }
    })
}

//编辑读者信息
function editUserInfo(userinfo){
    let sql=`update wxuser set username='${userinfo.username}' where id=${userinfo.id}`
    return new Promise(async (resolve,reject)=>{
        try {
            await beginTransaction(sql)
            resolve(true)
        } catch (error) {
            reject(false)
        }
    })
}

//删除读者登录信息
function deleteUserInfo(userinfo){
    let sql=`delete from wxuser where id=${userinfo.id}`;
    return new Promise(async (resolve,reject)=>{
        try {
            await beginTransaction(sql)
            resolve(true)
        } catch (error) {
            reject(false)
        }
    })
}

module.exports = {
    delWenSql, selectWen, selectWenTotal, 
    getUserInfo,getUserInfoTotal,
    getUserInfoSelect,getUserInfoTotalSelect,editUserInfo,deleteUserInfo
}