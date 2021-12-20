import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// element-ui
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// cesium
import 'cesium/Widgets/widgets.css'

const app = createApp(App)

app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')
