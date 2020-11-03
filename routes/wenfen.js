let express = require("express")
let router = express.Router()

const {
    wenFenModel, getWenFenModel
} = require("../model/modelFen")

//获取文章的分类
router.post("/fen", async (req, res, next) => {
    try {
        let result = await wenFenModel()
        res.json({
            data: result,
            code: 200
        })
    } catch (error) {
        res.json({
            data: false,
            code: 404
        })
    }
})

router.post("/swen", async (req, res, next) => {
    let { select } = req.body
    //根据id查询文章信息
    if (Number(select)) {
        try {
            let data = await getWenFenModel(Number(select))
            data.forEach(item => {
                item.src1 = "images/wen/" + item.src1
            })
            res.json({
                data,
                code:200
            })
        } catch (error) {
            res.json({
                data:false,
                code:404
            })
        }
        return
    }
    //根据文章标题查找文章信息
    try {
        let data = await getWenFenModel(null,select)
        data.forEach(item => {
            item.src1 = "images/wen/" + item.src1
        })
        res.json({
            data,
            code:200
        })
    } catch (error) {
        res.json({
            data:false,
            code:404
        })
    }
})


module.exports = router