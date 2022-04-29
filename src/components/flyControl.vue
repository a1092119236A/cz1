<template>
  <button @click="next">下一站</button>
  <button @click="start">开始漫游</button>
  <button @click="stop">停止漫游</button>
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
  }).then(function (dataSource) {
    viewer.dataSources.add(dataSource).then((res) => {
      tours = res.entities.values;
      tours.forEach((tour) => {
        // tour.billboard = undefined;
        tour.label = new Cesium.LabelGraphics({
          text: tour.name,
          font: "12px monospace",
          horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
          verticalOrigin: Cesium.VerticalOrigin.TOP,
          pixelOffset: new Cesium.Cartesian2(15, 0),
          scaleByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
        });
      });
    });
  });
  start.value = () => {
    clearInterval(fly);
    fly = setInterval(() => {
      viewer.flyTo(tours[i], {
        duration: 3,
      });
      i++;
      if (i >= tours.length) {
        clearInterval(fly);
      }
    }, 5000);
  };

  stop.value = () => {
    clearInterval(fly);
  };
  next.value = () => {
    const p = tours[i].position;
    const v = p.getValue(clock.currentTime);
    // console.log(tours[i],p);

    const c = Cesium.Cartographic.fromCartesian(v);
    const n = Cesium.Cartesian3.fromRadians(c.longitude, c.latitude, 99999);
    console.log(v, c, n);
    // p.viewFrom = new Cesium.Cartesian3(0, 0, 999999);
    camera.flyTo({
      destination: n,
      duration: 1,
      complete: () => {
        viewer.selectedEntity = tours[i];
        i++;
      },
    });
  };
});
</script>