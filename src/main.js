import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { routes } from './routes'
import store from './store/store'
import { MdButton, MdField, MdCard, MdList, MdDivider, MdDialog, MdProgress, MdTooltip, MdContent, MdTabs } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(MdButton)
Vue.use(MdField)
Vue.use(MdCard)
Vue.use(MdList)
Vue.use(MdDivider)
Vue.use(MdDialog)
Vue.use(MdProgress)
Vue.use(MdTooltip)

Vue.use(MdContent)
Vue.use(MdTabs)

Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes,
  base: process.env.BASE_URL
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
