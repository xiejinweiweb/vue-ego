const Mock = require('mockjs')

const express = require('express')
const router = express.Router()

//导入数据库 sqlFn('sql',[],res=>{})函数
const sqlFn = require('./mysql')

//测试路由接口
// router.get('/',(req,res)=>{
//     res.send('hello xjw')
// })

/**
 * 登陆接口
 */
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    const sql = "select * from user where `username`=? and `password`=?";
    const arr = [username, password];
    sqlFn(sql, arr, result => {
        // 返回用户信息
        if (result.length > 0) {
            const token = jwt.sign({
                id: result[0].id,
                username: result[0].username
            }, config.jwtSecret)
            res.send(token);
        } else {
            res.status(401).json({
                errors: "用户名密码错误"
            })
        }
    })
})

/**
 * 商品列表：获取分页 {total:'',arr:[{},{},{}],pagesize:8,}
 * 参数：page 页码
 */
router.get('/project', (req, res) => {
    const page = req.query.page || 1;
    const sqlLen = "select * from project where id";
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = "select * from project order by id desc limit 8 offset " + (page - 1) * 8;
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 8,
                    total: len
                })
            } else {
                res.send({
                    status: 500,
                    msg: "暂无数据"
                })
            }
        })
    })
})


/**
 * 商品查询接口 search
 * 参数：search
 */
router.get("/search", (req, res) => {
    var search = req.query.search;
    const sql = "select * from project where concat(`title`,`sellPoint`,`descs`) like '%" + search + "%'";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})

router.get("/test1", (req, res) => {
    let data = Mock.mock({
        name: '@cname',//随机名称
        nickName: '@last',//随机昵称
        phone: /^1[34578]\d{9}$/,//随机电话号码
        status:200,
        "list|6":[
            {
                "id|+2":1,
                "flag|1-2": true,
                "city|2": {
                    "310000": "上海市",
                    "320000": "江苏省",
                    "330000": "浙江省",
                    "340000": "安徽省"
                  },
                  "array|+1": [
                    "AMD",
                    "CMD",
                    "UMD"
                  ],
                  "desc":'@cword(3,8)',
                  "imgUrl":"@image()"
            }
        ],
        "star|1-5":'★',
        // "list|6": [
        //     info:'你好',//随机id
        //     "DiFANG|2": {
        //         "310000": "上海市",
        //         "320000": "江苏省",
        //         "330000": "浙江省",
        //         "340000": "安徽省"
        //     }
        // ]
    })
    res.send(data)
})




module.exports = router;
