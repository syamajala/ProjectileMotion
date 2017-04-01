import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import infiniteScroll from 'vue-infinite-scroll'
import App from 'home.vue'

Vue.use(ElementUI)
Vue.use(infiniteScroll)

new Vue({
  el: '#app',
  render: h => h(App)
})
