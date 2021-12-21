<template>
  <div></div>
</template>
<script>
export default {
  name: 'CUGModel',
  data() {
    return {}
  },
  mounted() {
    // 等待 viewer 初始化完成
    this.timer = setInterval(this.init, 500)
  },
  unmounted() {
    clearInterval(this.timer)
  },
  methods: {
    init() {
      if (!window.viewer) return
      clearInterval(this.timer)
      var viewer = window.viewer

      // Functions to adapt screen space error and memory use to the device
      var isMobile = {
        Android: function () {
          return navigator.userAgent.match(/Android/i)
        },
        BlackBerry: function () {
          return navigator.userAgent.match(/BlackBerry/i)
        },
        iOS: function () {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i)
        },
        Opera: function () {
          return navigator.userAgent.match(/Opera Mini/i)
        },
        Windows: function () {
          return navigator.userAgent.match(/IEMobile/i)
        },
        any: function () {
          return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
          )
        }
      }

      // Add tileset. Do not forget to reduce the default screen space error to 1
      viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
          url: '/devApi/Scene/Production_1.json',
          maximumScreenSpaceError: isMobile.any() ? 8 : 1, // Temporary workaround for low memory mobile devices - Increase maximum error to 8.
          maximumNumberOfLoadedTiles: isMobile.any() ? 10 : 1000 // Temporary workaround for low memory mobile devices - Decrease (disable) tile cache.
        })
      )
    },
    createIcon(data) {
      // 查询该图标是否已经被创建
      if (window.viewer.entities.getById(data.id)) {
        return
      }
      // 创建新图标
      var lng = data.position.longitude
      var lat = data.position.latitude
      var entity = window.viewer.entities.add({
        name: data.name,
        id: data.id,
        position: Cesium.Cartesian3.fromDegrees(lng, lat),
        billboard: {
          image: require('@/assets/icon/locale.png'),
          width: 50,
          height: 50,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.BOTTON,
          disableDepthTestDistance: Number.MAX_SAFE_INTEGER
        }
      })
      entity.externalData = {
        lng,
        lat,
        desc: data.desc
      }
      return entity
    }
  }
}
</script>
<style lang="scss" scoped></style>
