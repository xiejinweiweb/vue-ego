//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
//引入Vuex插件
import Vuex from 'vuex'
import loginModules  from "./modules/loginModule";
Vue.use(Vuex)

//创建并暴露store
export default new Vuex.Store({
    modules:{
        loginAbout: loginModules,
        // personAbout: personOptions
    }
})
