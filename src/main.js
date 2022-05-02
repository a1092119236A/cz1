import { createApp } from 'vue'
import Main from './components/main.vue'
import 'cesium/Build/Cesium/Widgets/widgets.css'
const app = createApp(Main)
import * as Cesium from 'cesium'
window.Cesium = Cesium
window.main={}
app.mount('#app')