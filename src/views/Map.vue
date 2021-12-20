<template>
  <div class="layer-cesium">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
export default {
  name: '',
  mounted() {
    // eslint-disable-next-line no-undef
    var viewer = new Cesium.Viewer('cesiumContainer')

    // eslint-disable-next-line no-console
    console.log(viewer)
  }
}
</script>
<style lang="scss" scoped>
.layer-cesium {
  width: 100%;
  height: 100vh;
  #cesiumContainer {
    height: 100%;
  }
}
</style>
