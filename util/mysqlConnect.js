let mysqlConnect=require("mysql")

//获取数据库连接对象
let con=mysqlConnect.createConnection({
    host:"localhost",
    port:3306,
    password:"root",
    user:"root",
    database:"blog"
})

con.connect(err=>{
    if(err){
        console.log("连接数据库失败")
    }
})


//操作数据库的方法,不开启事务
function exec(sql,arr=null){
    return new Promise((resolve,reject)=>{
        con.query(sql,arr,(err,result)=>{
            if(err){
                reject(err)
                return 
            }
            resolve(result)
        })
    })
}

//操作数据库的方法，开始事务
function beginTransaction(sql,arr){
    return new Promise((resolve,reject)=>{
        con.beginTransaction((err)=>{
            
            if(err){
                reject("开始事务失败")
                return 
            }
            con.query(sql,arr,(err,result)=>{
                if(err){
                    return con.rollback(()=>{
                        reject("操作数据库失败")
                    })
                }
                con.commit((err)=>{
                    
                    if(err){
                        return reject("提交事务失败")
                    }
                    resolve(result)
                })
            })
        })
    })
}

module.exports={
    exec,beginTransaction
}



