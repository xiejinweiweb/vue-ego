import VueRouter from 'vue-router'
// import About from '../views/About'
import Login from '../views/login/Login.vue'
import Layout from '../views/layout/index.vue'
import Home from '../views/Home/index.vue'
// 异步组件导入
const Goods = () => import('../views/Goods/Goods.vue')
const Params = () => import('../views/Params/Params.vue')
const Advert = () => import('../views/Advert/Advert.vue')
const Order = () => import('../views/Order/index.vue')
const OrderList = () => import('../views/Order/OrderList/index.vue')
const ReturnOrder = () => import('../views/Order/ReturnOrder/index.vue')

const AddGoods = () => import('../views/Goods/AddGoods.vue')
const UserPrint = () => import('../views/User/index.vue')

const router = new VueRouter({
    routes: [//这个地方注意别写routers
        {
            name: 'Login',
            path: '/login',
            component: Login,
            meta: {
                title: '登录',
                isLogin: false
            },
        },
        {
            path: '',
            component: Layout,
            meta: {
                title: '布局',
                isLogin: true
            },
            children: [
                {
                    name: 'Home',
                    path: '/',
                    component: Home,
                    meta: { title: '首页' },
                },
                {
                    name: 'Goods',
                    path: '/goods',
                    component: Goods,
                    meta: { title: '商品管理' },
                },
                {
                    name: 'AddGoods',
                    path: '/add-goods',
                    component: AddGoods,
                    meta: { title: '商品管理' },
                },
                {
                    name: 'Params',
                    path: '/params',
                    component: Params,
                    meta: { title: '规格参数' },
                },
                {
                    name: 'Advert',
                    path: '/advert',
                    component: Advert,
                    meta: { title: '广告分类' },
                },
                {
                    name: 'Order',
                    path: '/order',
                    component: Order,
                    redirect: '/order/order-list',
                    meta: { title: '订单管理' },
                    children: [
                        {
                            path: 'order-list',
                            component: OrderList,
                        },
                        {
                            path: 'order-return',
                            component: ReturnOrder,
                        }
                    ]
                },
                {
                    name: 'UserPrint',
                    path: '/user-print',
                    component: UserPrint,
                    meta: { title: '信息打印' },
                }
            ]
        }
    ]
})

export default router