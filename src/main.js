import Vue from 'vue'
import App from './App.vue'
import router from './router'
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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
