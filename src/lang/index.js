import Vue from 'vue'
import VueI18n from 'vue-i18n'
//导入element的国际化语言
import Element from 'element-ui'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'
Vue.use(VueI18n)

// 准备翻译的语言环境信息
const messages = {
  //英文
  en: {
    menu: {//自己需要翻译的变量太多时，也可以剔除出自己的语言如chinese.js 暴露一个对象 后面一样的再导入一个对象 ...zhLocal
      home: 'home',
      goods: 'Goods Manage',
      params: 'Specification',
      advert: 'Ads Classification',
      order: 'Order Manage',
      user: 'My Center',
    },
    multiLanguage:'More Language',
    ...enLocale // 或者用 Object.assign({ message: 'hello' }, enLocale)

  },
  //中文
  zh: {
    menu: {
      home: '首页',
      goods: '商品管理',
      params: '规格参数',
      advert: '广告分类',
      order: '订单管理',
      user: '个人中心',
    },
    multiLanguage:'多语言',
    ...zhLocale // 或者用 Object.assign({ message: '你好' }, zhLocale)
  }
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: 'zh', // 选中的语言地区
  messages, // 地区信息
})

ElementLocale.i18n((key, value) => i18n.t(key, value))


export default i18n
