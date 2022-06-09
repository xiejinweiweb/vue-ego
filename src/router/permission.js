import router from './index'
//全局前置路由守卫------初始化的时候被调用、每次路由切换之前被调用 
//登录前 路由拦截
//获取vuex数据
import store from '../store/index'

router.beforeEach((to, from, next) => {
    // console.log('beforeEach',to, from, next);
    //1.判断是否需要登录
    // if (to.matched[0].meta.isLogin) {
    if (to.matched.some(record => record.meta.isLogin)) {
        //2.判断当前用户是否已经登录
        let token=store.state.loginAbout.userInfo.token//在login页面上改为非空即可说明已经登录
        if(token){
            next()
        }else{
            // alert("未登录!")
            console.log('路由导向登录页面');
            next('/login')
        }
        
    }
    else {
        next()
    }
    // next()
})

//全局后置路由守卫------初始化的时候被调用、每次路由切换之后被调用
router.afterEach((to, from, next) => {
    // console.log('afterEach', to, from);
    document.title = to.meta.title || 'SHU后台管理系统'
})