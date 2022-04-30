import { createApp } from 'vue'
import App from './App.vue'
// import VueCesium from 'vue-cesium'
// import 'vue-cesium/dist/index.css'
import 'cesium/Build/Cesium/Widgets/widgets.css'
const app = createApp(App)
import * as Cesium from 'cesium'
window.Cesium = Cesium
// app.use(VueCesium)
window.main={}
app.mount('#app')