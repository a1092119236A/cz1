import { createApp } from 'vue'
import App from './App.vue'
import 'cesium/Build/Cesium/Widgets/widgets.css'
const app = createApp(App)
import * as Cesium from 'cesium'
window.Cesium = Cesium
window.main={}
app.mount('#app')