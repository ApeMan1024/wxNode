const { exec } = require("../util/mysqlConnect")

//获取博客分类的类型
async function wenFen() {
    let sql = "select * from classify"
    try {
        let result = await exec(sql)
        return result.map(item => {
            return { ...item }
        })
    } catch (error) {
        return error
    }
}

//查询文章信息
async function getWenFen(id, title) {
    let sql = "select * from essay where 1=1 "
    if (id) {
        sql += `and id like '%${id}%' order by id desc`
    }
    if (title) {
        sql += `and title like '%${title}%' order by id desc`
    }
    console.log(sql)
    try {
        let result = await exec(sql)
        return result.map(item => {
            return {...item}
        })
    } catch (error) {
        return error
    }
}

module.exports = {
    wenFen,getWenFen
}