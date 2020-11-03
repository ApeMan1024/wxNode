const path = require("path")
const fs = require("fs")
//读取文章的内容
function readWenMd(bool, filepath) {
    let src = ""
    if (!bool) {
        src = path.resolve(__dirname, "../public/file")
    }
    else{
       src=path.resolve(__dirname,"../public/file/babout") 
    }
    src = path.join(src, filepath)

    try {
        let md = fs.readFileSync(src, { encoding: "utf-8" })
        return md
    } catch (error) {
        throw error
    }
}

//获取博主信息
function getUserInfo(){
    let src = path.resolve(__dirname, "../public/file/user/我.md")
    try {
        let md = fs.readFileSync(src, { encoding: "utf-8" })
        return md
    } catch (error) {
        throw error
    }
}

//向文章中写入内容
function writeWenMd(filepath,md){
    let src=path.resolve(__dirname,"../public/file")
    src=path.join(src,filepath)
    try {
        fs.writeFileSync(src,md,{encoding:"utf-8"})
        return true;
    } catch (error) {
        return false
    }
}

//删除文章
function delWenMd(filepath){
    let src=path.resolve(__dirname,"../public/file")
    src=path.join(src,filepath)
    try {
        fs.unlinkSync(src)
        return true
    } catch (error) {
        return false
    } 
}
//删除图片
function delWenImg(src1){
    let src=path.resolve(__dirname,"../public/images/wen",src1)
    try {
        fs.unlinkSync(src)
        return true
    } catch (error) {
        return false
    } 
}

/**
 * 
 * @param {文章id} id 
 * @param {文章标题} title 
 * @param {文章上传时间} time 
 * @param {文章当前的文件名} filename 
 */
function xiuWen(id,title,time,filename){
    let filepath=`${time}_${title}_${id}.md`
    let path1=path.resolve(__dirname,"../public/file",filepath)
    let path2=path.resolve(__dirname,"../public/file",filename)
    try {
        fs.renameSync(path2,path1)
        return true
    } catch (error) {
        return false
    }
}

module.exports = {
    readWenMd,getUserInfo,writeWenMd,delWenMd,delWenImg,xiuWen
}