//引入store  共享数据
import store from '../store/index'
//持久化
let user=localStorage.getItem('user')
if(user){
  user=JSON.parse(user)
  store.commit('loginAbout/setUser',user)
}