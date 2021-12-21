import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// element-ui
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// cesium
import 'cesium/Widgets/widgets.css'
// leaflet
import 'leaflet/dist/leaflet.css'

const app = createApp(App)

// 消息总线
app.config.globalProperties.$Bus = createApp(App)

app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')
