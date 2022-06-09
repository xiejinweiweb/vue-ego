//mock.js 文件
import Mock from 'mockjs' // 引入mockjs
const Random = Mock.Random // Mock.Random 是一个工具类，用于生成各种随机数据

const dataList = [] // 用于接受生成数据的数组
for (let i = 0; i < 54; i++) { // 可自定义生成的个数
  const template = {
    'Boolean': Random.boolean, // 可以生成基本数据类型
    'num': Random.natural(1, 10), // 生成1到100之间自然数
    'price': Random.integer(1, 9), // 生成1到100之间的整数
    'Float': Random.float(0, 100, 0, 5), // 生成0到100之间的浮点数,小数点后尾数为0到5位
    'Character': Random.character(), // 生成随机字符串,可加参数定义规则
    'String': Random.string(2, 10), // 生成2到10个字符之间的字符串
    'Range': Random.range(0, 10, 2), // 生成一个随机数组
    'date': Random.date(), // 生成一个随机日期,可加参数定义日期格式
    'image': Random.image(Random.size, '#02adea', 'Hello'), // Random.size表示将从size数据中任选一个数据
    'Color': Random.color(), // 生成一个颜色随机值
    'text': '<p>' + Random.paragraph(1, 2) + '</p>', // 生成2至5个句子的文本
    'name': Random.name(), // 生成姓名
    'category': Random.url(), // 生成web地址
    'Address': Random.province(), // 生成地址
    'id': (i + 1) * 31415965 + i * i, // 生成地址
  }
  dataList.push(template)
}

// 商品列表mock数据
Mock.mock('user/goodsList', 'post', (params) => { //三个参数。第一个路径，第二个请求方式post/get，第三个回调，返回值
  var info = JSON.parse(params.body)
  var searchKey = info.params.searchKey
  const newArr = [];
  // debugger
  for (let i = 0; i < dataList.length; i++) {
    //查询条件为name时直接将符合的数据添加到新数组内
    // var str = dataList[i].name;
    // var str2 = str.replace(/\s*/g,"");
    // console.log(str2); 
    if (searchKey && !dataList[i].name.indexOf(searchKey)) {
      console.log("查询条件：" + searchKey)
      newArr.push(dataList[i]);
    }
    //查询条件为text时将符合的数据添加到新数组内
    // if (searchKey && !dataList[i].text.indexOf(searchKey)) {
    //   console.log("查询条件：" + searchKey)
    //   newArr.push(dataList[i]);
    // }
    //查询条件为空时添加所有数据到新数组
    if (!searchKey) {
      newArr.push(dataList[i]);
    }
  }
  var [index, size, total] = [info.params.pageIndex, info.params.pageSize, newArr.length]
  var len = total / size
  var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len
  var newDataList = newArr.slice(index * size, (index + 1) * size)
  return {
    'code': '20',
    'message': 'success',
    'data': {
      'pageIndex': index,//页码
      'pageSize': size,
      'rows': newDataList,
      'total': total,
      'totalPages': totalPages
    }
  }
})

//商品类目mock数据
Mock.mock('user/categoryList', {
  code: 20,
  data: {
    'data|4': [
      {
        cid: '@id',//随机id
        name: '@cname',//随机名称
        nickName: '@last',//随机昵称
        phone: /^1[34578]\d{9}$/,//随机电话号码
        'price|1-9': 1,//
        'num|1-99': 1,//
        address: '@county(true)',//随机地址
        text: "this is mock data",
        email: '@email',//随机邮箱
        isMale: '@boolean',//随机性别
        createTime: '@datetime',//创建时间
        avatar() {
          //用户头像
          return Mock.Random.image('100×100', Mock.Random.color(), '#757575', 'png', this.nickName)
        }
      }
    ]
  }
})


const userList = {  //定义用户数据
  data: {
    total: 6,
    //前两个用户数据分别固定设为管理员和普通用户，为后续权限设置做准备，其他用户随机生成
    userInfo: [{
      userId: 1,
      roles: 'admin',
      userName: 'admin',
      passWord: "123456",
      token: "123133123",
    }, {
      userId: 2,
      roles: 'editor',
      userName: 'root',
      passWord: "root",
      token: "65454634",
    }, {
      userId: 3,
      roles: 'others',
      userName: '@word(3, 5)',
      passWord: '123456',
      token: '@guid()',
    },],
    meta: {
      status: 200,
      message: 'success',
    }
  },
};


//写入post请求相关代码
Mock.mock('/test/login', 'post', (params) => {
  var info = JSON.parse(params.body)//将传递进来的数据保存
  var username = info.params.username
  var password = info.params.password
  for (let i = 0; i < userList.data.userInfo.length; i++) {
    if (username === userList.data.userInfo[i].userName && password === userList.data.userInfo[i].passWord)
      return {
        meta: {
          msg: 'success',
          status: 200
        },
        user: {
          username: userList.data.userInfo[i].userName,
          roles: userList.data.userInfo[i].roles,
          token: userList.data.userInfo[i].token
        }
      }
  }
  return {
    meta: {
      msg: 'error',
      status: 201
    }
  }
})