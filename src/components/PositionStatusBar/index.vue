<template>
  <div class="position-status-bar">
    经度：{{ position.lng }}， 纬度：{{ position.lat }}， 高度：{{
      position.height
    }}， 航向角：{{ position.heading }}，俯仰角：{{ position.pitch }}
  </div>
</template>

<script>
export default {
  name: 'PositionStatusBar',
  data() {
    return {
      timer: null,
      handler: null,
      position: {
        lng: 0,
        lat: 0,
        height: 0,
        heading: 0,
        pitch: 0,
        roll: 0
      }
    }
  },
  mounted() {
    // 等待 viewer 初始化完成
    this.timer = setInterval(this.init, 500)
  },
  unmounted() {
    clearInterval(this.timer)
    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK)
    this.handler.destroy()
    this.handler = null
  },
  methods: {
    init() {
      if (!window.viewer) return
      clearInterval(this.timer)
      var viewer = window.viewer
      this.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)

      // add mouse move event
      this.handler.setInputAction(evt => {
        this.position = this.getMousePosition(viewer, evt.endPosition)
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

      // add mouse right click event
      this.handler.setInputAction(() => {
        var camPos = this.getCameraPosition(viewer)
        console.log(
          `${camPos.lng}, ${camPos.lat}, ${camPos.height}, ${camPos.heading}, ${camPos.pitch}`
        )
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
    },
    getCameraPosition(viewer) {
      try {
        var camPos = viewer.camera.positionCartographic
        var lng = Cesium.Math.toDegrees(camPos.longitude).toFixed(8)
        var lat = Cesium.Math.toDegrees(camPos.latitude).toFixed(8)
        var height = camPos.height.toFixed(2)
        var heading = Cesium.Math.toDegrees(viewer.camera.heading).toFixed(2)
        var pitch = Cesium.Math.toDegrees(viewer.camera.pitch).toFixed(2)
        var roll = Cesium.Math.toDegrees(viewer.camera.roll).toFixed(2)
        return { lng, lat, height, heading, pitch, roll }
      } catch (e) {
        return { lng: 0, lat: 0, height: 0, heading: 0, pitch: 0, roll: 0 }
      }
    },
    getMousePosition(viewer, position) {
      try {
        var cartesian = viewer.camera.pickEllipsoid(
          position,
          viewer.scene.globe.ellipsoid
        )
        var cartographic = Cesium.Cartographic.fromCartesian(cartesian)
        var lng = Cesium.Math.toDegrees(cartographic.longitude).toFixed(8) // 经度值
        var lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(8) // 纬度值
        var height = viewer.camera.positionCartographic.height.toFixed(2) // 高度
        var heading = Cesium.Math.toDegrees(viewer.camera.heading).toFixed(2) // 偏航角
        var pitch = Cesium.Math.toDegrees(viewer.camera.pitch).toFixed(2) // 俯仰角
        var roll = Cesium.Math.toDegrees(viewer.camera.roll).toFixed(2) // 翻滚角
        return { lng, lat, height, heading, pitch, roll }
      } catch (e) {
        return { lng: 0, lat: 0, height: 0, heading: 0, pitch: 0, roll: 0 }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.position-status-bar {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 560px;
  height: 30px;
  background: rgba(40, 40, 40, 0.7);
  border: 1px solid #444;
  border-radius: 5px;
  color: white;
  font: normal 12px sans-serif;
  text-align: center;
  line-height: 30px;
}
</style>
