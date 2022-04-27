<template>
  <vc-viewer :scene3DOnly=true @ready="onViewerReady">
    <flyControl />
  </vc-viewer>
</template>
<script setup>
import { VcViewer } from "vue-cesium";
import flyControl from "./flyControl.vue";
const onViewerReady = (ready) => {
  const viewer = ready.viewer;
  //取消默认双击事件
  viewer.screenSpaceEventHandler.setInputAction(function () {},
  Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  Cesium.GeoJsonDataSource.load("面.json").then(function (dataSource) {
    viewer.dataSources.add(dataSource).then((res) => {
      viewer.flyTo(res, {
        duration: 1,
      });
    });
  });
  Cesium.GeoJsonDataSource.load("线.json").then(function (dataSource) {
    viewer.dataSources.add(dataSource).then((res) => {});
  });
};
</script>