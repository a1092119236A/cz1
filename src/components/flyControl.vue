<template>
<div class="flyControl">
  <button @click="next">下一站</button>
  <button @click="start">开始漫游</button>
  <button @click="stop">停止漫游</button>
</div>
  
</template>
<script setup>
import { ref, unref } from "vue";
import { useVueCesium } from "vue-cesium";
const vc = useVueCesium();
let start = ref();
let stop = ref();
let next = ref();
let fly, tours;

vc.creatingPromise.then((vc) => {
  const viewer = vc.viewer;
  const { camera, clock } = viewer;
  let i = 0;
  Cesium.GeoJsonDataSource.load("点.json", {
    // stroke: Cesium.Color.HOTPINK,
    // fill: Cesium.Color.PINK,
    // strokeWidth: 3,
    // markerSymbol: "?",
    markerSize:5
  }).then(function (dataSource) {
    viewer.dataSources.add(dataSource).then((res) => {
      tours = res.entities.values;
      tours.forEach((tour) => {
        tour.billboard=undefined
        tour.label = new Cesium.LabelGraphics({
          text: tour.name,
          // font: "12px monospace",
          // horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
          // verticalOrigin: Cesium.VerticalOrigin.TOP,
          // pixelOffset: new Cesium.Cartesian2(15, 0),
          // scaleByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
          distanceDisplayCondition : new Cesium.DistanceDisplayCondition(10.0, 39999)
        });
      });
    });
  });
  start.value = () => {
    clearInterval(fly);
    fly = setInterval(() => {
    flyNext()
      i++;
      if (i >= tours.length) {
        clearInterval(fly);
      }
    }, 5000);
  };

  stop.value = () => {
    clearInterval(fly);
  };
  // frame.removeAttribute('sandbox');
  //   console.log(frame);
  //   frame.addEventListener(
  //     "load",
  //     function () {
  //       const cssLink = frame.contentDocument.createElement("link");
  //       cssLink.href = Cesium.buildModuleUrl("/infox.css");
  //       cssLink.rel = "stylesheet";
  //       cssLink.type = "text/css";
  //       frame.contentDocument.head.appendChild(cssLink);
  //     },
  //     false
  //   );
  window.camera = camera;
  window.viewer = viewer;
  next.value = () => {
    flyNext()
  };
  function flyNext() {
    const tour = tours[i];
    const p = tour.position;
    const v = p.getValue(clock.currentTime);

    const c = Cesium.Cartographic.fromCartesian(v);
    const n = Cesium.Cartesian3.fromRadians(c.longitude, c.latitude, 999);
    console.log(tour);
    // 定时执行获取宽高
    const img_url = `/长征图片/${tour.name}.png`;
    // 创建对象
    const img = new Image();
    img.alt = tour.name;
    img.src = img_url;
    const check = function () {
      // 只要任何一方大于0
      // 表示已经服务器已经返回宽高
      if (img.width > 0 || img.height > 0) {
        img.style = `width:${img.width}px;height:${img.height}px;`;
        console.log(img.style.width,img.style.height,tour.properties.PopupInfo._value);

        const div = document.createElement("div");
        div.innerHTML = `当前站点：${tour.name}<br>
    介绍：${tour.properties.PopupInfo._value}`;
        div.appendChild(img);

        tour.description = div.innerHTML;
        clearInterval(set);
      }
    };
    const set = setInterval(check, 40);
    console.log(img);

    camera.flyToBoundingSphere(new Cesium.BoundingSphere(n, 2000),{
      duration: 1,
      complete: () => {
        viewer.selectedEntity = tour;
        i++;
      },
    });
  }
});
</script>
<style scoped>
.flyControl {
  position: absolute;
  top: 10;
  left: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
</style>