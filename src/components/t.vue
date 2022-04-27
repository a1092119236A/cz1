// business-component.vue
<template>
  <div class="business-component">
    Hellow VueCesium
    <button @click="onButtonClick"></button>
  </div>
</template>

<script lang='ts' setup>
  import { ref, onMounted } from 'vue'
  import { useVueCesium } from 'vue-cesium'
  import type { VcViewerProvider, VcReadyObject } from 'vue-cesium/es/utils/types'

  const $vc: VcViewerProvider = useVueCesium()

  const onButtonClick = () => {
    // 注1：business-component 为 vc-viewer 的子组件
    console.log($vc.viewer) // instanceof Cesium.Viewer
    // 注2： business-component 不是 vc-viewer 的子组件
    $vc.creatingPromise.then((readyObj: VcReadyObject) => {
      console.log(readyObj.viewer) // instanceof Cesium.Viewer
    })
  }
</script>