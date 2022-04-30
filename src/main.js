import { createApp } from 'vue'
import App from './App.vue'
import VueCesium from 'vue-cesium'
import 'vue-cesium/dist/index.css'
// import 'cesium/Build/Cesium/Widgets/widgets.css'
const app = createApp(App)
app.use(VueCesium)
app.mount('#app')