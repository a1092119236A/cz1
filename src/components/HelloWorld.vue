<template>
    <vc-viewer :scene3DOnly="true" @ready="onViewerReady" :imageryProvider="imageryProvider">
    <vc-terrain-provider-arcgis ></vc-terrain-provider-arcgis>
      <flyControl  />
    <echartStyle />
  </vc-viewer>
  
</template>
<script setup>
import { ref, computed } from "vue";
import { VcViewer,VcTerrainProviderArcgis } from "vue-cesium";
import flyControl from "./flyControl.vue";
import echartStyle from "./echartStyle.vue";
const imageryProvider = ref(null);
const onViewerReady = (ready) => {
  const viewer = ready.viewer;
  //移除报错
  viewer.infoBox.frame.removeAttribute("sandbox");
  viewer.infoBox.frame.src = "about:blank";
  //取消默认双击事件
  viewer.screenSpaceEventHandler.setInputAction(function () {},
  Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  imageryProvider.value = new Cesium.ArcGisMapServerImageryProvider({
    url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
  });
};
</script>