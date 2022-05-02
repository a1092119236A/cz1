<template>
  <div class="flyControl">
    <button @click="last">上一站</button>
    <button @click="next">下一站</button>
    <button @click="start">开始漫游</button>
    <button @click="stop">停止漫游</button>
    漫游间隔：<input style="width:40px" type="number" v-model="tourInterval">秒
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
const start = ref();
const stop = ref();
const last = ref();
const next = ref();
const tourInterval=ref(10);
let fly, tours;
onMounted(() => {
  const viewer = main.viewer;
  const { camera, clock } = viewer;
  let i = -1;
  Cesium.GeoJsonDataSource.load("点.json", {
    // stroke: Cesium.Color.HOTPINK,
    // fill: Cesium.Color.PINK,
    // strokeWidth: 3,
    // markerSymbol: "?",
    markerSize: 5,
  }).then(function (dataSource) {
    viewer.dataSources.add(dataSource).then((res) => {
      tours = res.entities.values;
      tours.forEach((tour) => {
        tour.billboard = undefined;
        tour.label = new Cesium.LabelGraphics({
          text: tour.name,
          // font: "12px monospace",
          // horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
          // verticalOrigin: Cesium.VerticalOrigin.TOP,
          // pixelOffset: new Cesium.Cartesian2(15, 0),
          // scaleByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
            10.0,
            39999
          ),
        });
      });
    });
  });
  start.value = () => {
    clearInterval(fly);
    fly = setInterval(() => {
      tourFly();
      i++;
      if (i >= tours.length) {
        clearInterval(fly);
      }
    }, tourInterval.value * 1000);
  };

  stop.value = () => {
    clearInterval(fly);
  };

  window.camera = camera;
  window.viewer = viewer;
  next.value = () => {
    tourFly();
  };
  last.value = () => {
    tourFly(false);
  };
  function tourFly(next = true) {
    if (next) {
      i++;
    } else {
      i--;
    }
    const tour = tours[i];
    const p = tour.position;
    const v = p.getValue(clock.currentTime);

    const c = Cesium.Cartographic.fromCartesian(v);
    const n = Cesium.Cartesian3.fromRadians(c.longitude, c.latitude, 999);
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
        img.style = `width:100%;height:auto;object-fit: cover;`;

        const div = document.createElement("div");
        div.innerHTML = ` 当前站点：${tour.name}<br>
      介绍：${tour.properties.PopupInfo._value}<br>`;
        div.appendChild(img);

        tour.description = div.innerHTML;
        clearInterval(set);
      }
    };
    const set = setInterval(check, 40);

    camera.flyToBoundingSphere(new Cesium.BoundingSphere(n, 2000), {
      duration: 1,
      offset: new Cesium.HeadingPitchRange(0, -0.1, 0),
      complete: () => {
        viewer.selectedEntity = tour;
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
  backdrop-filter: blur(2px);
  background: white;
}
</style>