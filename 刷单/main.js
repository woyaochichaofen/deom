import Vue from 'vue'
import App from './App'
import com from './components/com/com.vue'
Vue.config.productionTip = false
Vue.prototype.submit=com
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
