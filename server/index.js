//搭建express服务
const express = require('express')
const app = express()

//路由
const router=require('./router')

app.use('/api',router)

app.listen(9527, (err) => {
    if (!err) console.log("http://localhost:9527",'服务器启动成功了!')
})

