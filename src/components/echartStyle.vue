
<template>
  <vc-overlay-echarts ref="echartOverlay" :options="options">
  </vc-overlay-echarts>
</template>

<script setup>
import {VcOverlayEcharts} from "vue-cesium";
import { ref } from "vue";
const echartOverlay = ref(null);
  // Cesium.GeoJsonDataSource.load("面.json").then(function (dataSource) {
  //   viewer.dataSources.add(dataSource).then((res) => {
   
  //   });
  // });
  // Cesium.GeoJsonDataSource.load("线.json").then(function (dataSource) {
  //   viewer.dataSources.add(dataSource).then((res) => {});
  // });
const datas = [
  {
    level: 1,
    name: "北京",
    label: "beijing",
    value: [116.4551, 40.2539],
    symbol: "",
    symbolSize: [30, 30],
  },
];

const lineColors = ["#fff", "#f6fb05", "#00fcff"];
const stationSymbols = [
  "image://https://zouyaoji.top/vue-cesium/images/station-blue.png",
  "image://https://zouyaoji.top/vue-cesium/images/station-yellow.png",
];
const lineSymbols = [
  "image://https://zouyaoji.top/vue-cesium/images/symbol-white.png",
  "image://https://zouyaoji.top/vue-cesium/images/symbol-yellow.png",
];
datas.forEach((data) => {
  data.symbol = stationSymbols[data.level - 1];
});

const arrs = [[], [], []];

datas.forEach((data) => {
  if (data.belong) {
    const belongs = Array.isArray(data.belong) ? data.belong : [data.belong];
    belongs.forEach((belong) => {
      datas.forEach((item) => {
        if (belong === item.name) {
          arrs[data.level - 1].push([
            {
              coord: item.value,
            },
            {
              coord: data.value,
            },
          ]);
        }
      });
    });
  }
});

const seriesEffectScatter = [
  {
    type: "effectScatter",
    coordinateSystem: "cesium",
    symbolSize: [20, 20],
    symbolOffset: [0, -10],
    z: 3,
    circular: { rotateLabel: true },
    label: {
      normal: {
        show: true,
        position: "right",
        formatter: "{b}",
        fontSize: 24,
        color: "#fff",
        textBorderColor: "#2aa4e8",
        textBorderWidth: 2,
        offset: [0, 20],
      },
    },
    data: datas,
  },
];
const seriesLines = [];
arrs.forEach((arr, index) => {
  seriesLines.push({
    name: "",
    type: "lines",
    coordinateSystem: "cesium",
    z: 1,
    effect: {
      show: true,
      smooth: !1,
      trailLength: 0,
      symbol: lineSymbols[index],
      symbolSize: [10, 30],
      period: 4,
    },
    lineStyle: { width: 2, color: lineColors[index], curveness: -0.2 },
    data: arr,
  });
});

const options = {
  animation: true,
  series: [...seriesEffectScatter, ...seriesLines],
};
console.log(options);
</script>

<style>
</style>
