<template>
  <div>
    <div id="title">漫游长征路线三维地图展示</div>
    <div id="container" ref="mapRef"><flyControl v-if="loadFlyControl" /></div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import flyControl from "./flyControl.vue";
const loadFlyControl = ref(false);
const mapRef = ref(null);
onMounted(() => {
  const viewer = new Cesium.Viewer(mapRef.value, {
    imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
      url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
    }),
    terrainProvider: Cesium.createWorldTerrain(),
    baseLayerPicker: false,
    animation: false,
    timeline: false,
    fullscreenButton: false,
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    navigationHelpButton: false,
    infoBox: true,
    selectionIndicator: true,
    scene3DOnly: true,
    shouldAnimate: true,
    contextOptions: {
      webgl: {
        alpha: false,
      },
    },
  });
  //移除报错
  {
    const frame = viewer.infoBox.frame;
    frame.removeAttribute("sandbox");
    frame.src = "about:blank";
    // console.log(frame);
    frame.addEventListener(
      "load",
      function () {
        var cssLink = frame.contentDocument.createElement("link");
        cssLink.href = Cesium.buildModuleUrl("/infobox.css");
        cssLink.rel = "stylesheet";
        cssLink.type = "text/css";
        frame.contentDocument.head.appendChild(cssLink);
      },
      false
    );
  }
  main.viewer = viewer;
  loadFlyControl.value = true;
  //取消默认双击事件
  viewer.screenSpaceEventHandler.setInputAction(function () {},
  Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  Cesium.GeoJsonDataSource.load("面.json", {
    stroke: Cesium.Color.RED,
    fill: new Cesium.Color(0, 0, 0, 0),
    strokeWidth: 3,
  }).then(function (dataSource) {
    viewer.dataSources.add(dataSource).then((res) => {
      viewer.flyTo(res.entities, {
        duration: 1,
      });
    });
  });
  Cesium.GeoJsonDataSource.load("线.json").then(function (dataSource) {
    viewer.dataSources.add(dataSource).then((res) => {});
  });
});
</script>
<style scoped>
#title {
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