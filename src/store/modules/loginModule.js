// 登录相关的模块（module）
export default {
    //Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割
    namespaced: true,
    state: {
        userInfo: {
            username: '',
            token: ''
        }
    },
    actions: {
       
        demo(context, value) {
            console.log('actions中的demo被调用了', context, value);
        }
    },
    mutations: {
        //设置用户信息
        setUser(state, value) {
            console.log('mutations中的setUser被调用了', state, value);
            state.userInfo = value
        },
        //清空用户信息
        clearUser(state) {
            console.log('mutations中的clearUser被调用了', state);
            state.userInfo = {
                username: '',
                token: ''
            }
        },
    },

    getters: {
        // bigSum(state) {
        //     return state.sum * 10
        // }
    },
}
