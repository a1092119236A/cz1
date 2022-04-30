<template>
<div id="title">漫游长征路线三维地图展示</div>
    <vc-viewer :scene3DOnly="true" @ready="onViewerReady" :imageryProvider="imageryProvider">
    <vc-terrain-provider-arcgis ></vc-terrain-provider-arcgis>
      <flyControl  />
  </vc-viewer>
  
</template>
<script setup>
import { ref, computed } from "vue";
import flyControl from "./flyControl.vue";
// import echartStyle from "./echartStyle.vue";
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
    Cesium.GeoJsonDataSource.load("面.json", {
  stroke: Cesium.Color.RED,
  fill: new Cesium.Color(0,0,0,0),
  strokeWidth: 3,
}).then(function (dataSource) {
    viewer.dataSources.add(dataSource).then((res) => {
   viewer.flyTo(res.entities,{
      duration:1

   })
    });
  });
  Cesium.GeoJsonDataSource.load("线.json").then(function (dataSource) {
    viewer.dataSources.add(dataSource).then((res) => {});
  });
};
</script>
<style scoped>
#title{
  position: absolute;
  top: 3%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  backdrop-filter: blur(10px);
  color: aliceblue;
  user-select: none;
  border-radius: 5px;
  z-index: 999;
}
</style>