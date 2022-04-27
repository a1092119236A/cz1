<template>
  <button @click="start">开始漫游</button>
  <button @click="next">下一站</button>
  <button @click="stop">停止漫游</button>
  <input type="text" v-model="hprArray" />
</template>
<script setup>
import { ref,computed } from "vue";
import { useVueCesium } from "vue-cesium";
const vc = useVueCesium();
let start = ref();
let stop = ref();
let next = ref();
const hprArray = ref([0, 0, 0]);
let hpr = computed(() => {
  console.log(hpr.value);
  return Cesium.HeadingPitchRoll.fromDegrees(...hprArray.value.split(','));
});


vc.creatingPromise.then((vc) => {
  const viewer = vc.viewer;
  let i = 0;

  let fly, tours;
  start.value = () => {
    console.log(1);
    clearInterval(fly);
    fly = setInterval(() => {
      const p = tours[i];
      console.log(p);
      viewer.flyTo(p, {
        duration: 3,
        // offset: new Cesium.HeadingPitchRange(0, 0, 10)
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
    const p = tours[i];
    console.log(hpr.value);
    viewer.flyTo(p, {
      duration: 1,
      offset: hpr.value,
    });
    // camera.flyTo( {
    //   destination: new Cesium.Cartesian3.from(),
    //   duration: 2,
    //   // maximumHeight: 100,
    //   // offset: new Cesium.HeadingPitchRange(Math.PI/4, Math.PI/4, 999)
    // });
    i++;
  };
  Cesium.GeoJsonDataSource.load("点.json", {
    stroke: Cesium.Color.HOTPINK,
    fill: Cesium.Color.PINK,
    strokeWidth: 3,
    markerSymbol: "?",
  }).then(function (dataSource) {
    viewer.dataSources.add(dataSource).then((res) => {
      //按照轨迹飞行
      tours = res.entities.values;

      //检测到点击事件就打断
    });
  });
});
</script>