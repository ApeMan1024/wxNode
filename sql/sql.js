const { exec, beginTransaction } = require("../util/mysqlConnect")

const { readWenMd } = require("../util/readFile")

//获取文章的数据
function getWen(currentPage, pageSize, mode, id) {
    let sql = "select * from essay where 1=1 "
    if (currentPage) {
        sql += 'order by id desc  '
        sql += `limit ${(Number(currentPage) - 1) * pageSize},${pageSize} `

    }
    if (mode) {
        sql += `and mold = '${mode}' `
        sql += 'order by id desc '
    }
    if (id) {
        sql += `and id=${id}`
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

//获取文章的数量
function getWenTotal() {
    let sql = "select count(*) total from essay where 1=1 "
    return new Promise(async (resolve, reject) => {
        try {
            let result = await exec(sql)
            res = result.map(item => {
                return { ...item }
            })

            resolve(res[0].total)
        } catch (err) {
            reject(err)
        }
    })
}

//设置文章浏览次数
function setWenBrowseNum(id) {
    let sql = `update essay set num=num+1 where id=${id}`
    return new Promise(async (resolve, reject) => {
        try {
            let result = await beginTransaction(sql)
            if (result.affectedRows > 0) {
                resolve(true)
                return
            }
        } catch (error) { }
        reject(false)
    })
}

//获取文章的内容
async function getWenMd(id) {
    let result = await getWen(null, null, null, id)
    let { time, title } = result[0]
    let filepath = time + "_" + title + "_" + id + ".md"
    try {
        let md = readWenMd(null, filepath)
        return md
    } catch (err) {
        return true
    }
}

//获取当前文章的前后篇文章
async function getNextbefore(id) {
    //获取当前数据的后一条数据
    let sqlNext = `select * from essay where id = (select id from essay where id > ${id} order by id asc limit 1)`
    //获取当前数据的前一条数据
    let sqlBefore = `select * from essay where id = (select id from essay where id < ${id} order by id desc limit 1)`
    let objNext = await exec(sqlNext).catch(err => err)
    let objBefore = await exec(sqlBefore).catch(err => err)
    let obj = {}
    if (objNext.length) {
        obj.next = { ...objNext[0] }
    }
    if (objBefore.length) {
        obj.before = { ...objBefore[0] }
    }
    return obj
}

//获取当前文章的评论数据
async function getWenPing(id) {
    let sql = `select * from ping where id=${id}`
    let pings = await exec(sql).catch(err => err)
    if (pings) {
        pings = pings.map(item => {
            return { ...item }
        })
        return pings
    }
    return pings
}

//发表文章评论
function setWenPing(ping) {
    let sql = `insert into ping set ?`
    return new Promise(async (resolve, reject) => {
        try {
            let result = await beginTransaction(sql, ping)
            if (result.affectedRows) {
                resolve(true)
                return 
            }
        } catch (error) {

        }
        reject(false)
    })

}

//博客访问量统计
async function startNumBlog(){
    let sql="update visit set num=num+1 where id='wx'"
    try {
        let result=await beginTransaction(sql)
        if(result.affectedRows){
            return true
        }
    } catch (error) {
        return false
    }
}

//获取博客的访问量
function getBlogNum(){
    let sql="select * from visit";
    return new Promise(async (resolve,reject)=>{
        try {
            let result=await exec(sql);
            result=result.map(item=>{
                return {...item}
            });
            resolve(result[0]);
        } catch (error) {
            reject(error)
        }
    }) 
}
module.exports = {
    getWen, getWenTotal, 
    setWenBrowseNum, getWenMd, 
    getNextbefore, getWenPing, 
    setWenPing,startNumBlog,getBlogNum
}