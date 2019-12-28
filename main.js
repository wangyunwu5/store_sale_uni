import Vue from 'vue'
import App from './App'

import store from './store'
import countUp from './components/countUp/countUp.vue'
 
Vue.component('countup',countUp)

import screenTextScroll from './components/screenTextScroll/screenTextScroll.vue'

Vue.component('textscroll',screenTextScroll)

Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
