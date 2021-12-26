<template>
  <div ref="popup" v-if="showPopup" class="popup">
    <div class="popup-close-button" @click="clickCloseBtn">
      <svg-icon class="iconfont" iconName="close" />
    </div>
    <div class="wrapper">
      <div class="wrapper-header flex-center">
        {{ currentLocaleDesc.header }}
      </div>
      <div class="wrapper-content">{{ currentLocaleDesc.content }}</div>
    </div>
  </div>
</template>
<script>
import Bus from '@/utils/bus.js'
export default {
  name: 'CUGModel',
  data() {
    return {
      handler: null,
      showPopup: false,
      localeEntities: [],
      currentLocaleEntity: null,
      currentLocaleDesc: null,
      locales: [
        {
          id: 'locale_1',
          name: 'locale',
          position: { lng: 114.61312912, lat: 30.45891608 },
          desc: {
            header: '地大图书馆',
            content:
              '地大图书馆是一个学习的地方，里面环境舒适，学习氛围浓厚，非常适合在早上犯困的时候去图书馆激励自己~'
          }
        },
        {
          id: 'locale_2',
          name: 'locale',
          position: { lng: 114.61522975, lat: 30.4594947 },
          desc: {
            header: '大学生活动中心',
            content:
              '大学生活动中心会在节假日放一些电影，但可能并不会有多少人去看。除了电影，学校的毕业晚会之类的活动也是在这里举行~'
          }
        }
      ]
    }
  },
  mounted() {
    // 等待 viewer 初始化完成
    this.timer = setInterval(this.init, 500)
  },
  unmounted() {
    console.log(11111)
    clearInterval(this.timer)
    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
    this.handler.destroy()
    this.handler = null

    window.viewer.scene.postRender.removeEventListener(this.followMapToMove)
  },
  methods: {
    init() {
      if (!window.viewer) return
      clearInterval(this.timer)
      var viewer = window.viewer

      // 加载CUG模型
      const cugModel = this.loadModel(viewer)

      // 设置点击事件
      this.setMouseLeftClickEventListener(viewer)

      // 加载地点图标
      this.locales.forEach(element => {
        this.localeEntities.push(this.createIcon(viewer, element))
      })

      // 弹出框跟随地图移动
      viewer.scene.postRender.addEventListener(this.followMapToMove)

      // 设置消息总线设置
      Bus.$on('on-cug-model-visual-change', () => {
        cugModel.show = !cugModel.show
        this.localeEntities.forEach(entity => {
          entity.show = !entity.show
        })
      })
    },
    followMapToMove() {
      if (!this.currentLocaleEntity) return
      // 三维世界坐标转屏幕坐标
      this.position = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
        window.viewer.scene,
        this.currentLocaleEntity._position._value
      )
      if (this.position) this.positionPopUp(this.position)
    },
    positionPopUp(c) {
      const popup = this.$refs.popup
      const x = c.x - popup.offsetWidth / 2 - 40
      const y = c.y - popup.offsetHeight
      popup.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)'
    },
    loadModel(viewer) {
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
      return viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
          url: process.env.VUE_APP_FLAG + '/Scene/Production_1.json',
          maximumScreenSpaceError: isMobile.any() ? 8 : 1, // Temporary workaround for low memory mobile devices - Increase maximum error to 8.
          maximumNumberOfLoadedTiles: isMobile.any() ? 10 : 1000 // Temporary workaround for low memory mobile devices - Decrease (disable) tile cache.
        })
      )
    },
    createIcon(viewer, data) {
      // 查询该图标是否已经被创建
      if (viewer.entities.getById(data.id)) {
        return
      }
      // 创建新图标
      var lng = data.position.lng
      var lat = data.position.lat
      var entity = viewer.entities.add({
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
    },
    setMouseLeftClickEventListener(viewer) {
      this.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
      // 鼠标左键点击事件
      this.handler.setInputAction(evt => {
        const pickedObject = viewer.scene.pick(evt.position)
        // 拾取到实体
        if (pickedObject && pickedObject.id) {
          const entity = pickedObject.id
          if (entity.name === 'locale') {
            this.showPopup = true
            this.currentLocaleEntity = entity
            this.currentLocaleDesc = entity.externalData.desc
          }
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    },
    clickCloseBtn() {
      this.currentLocaleEntity = null
      this.currentLocaleDesc = null
      this.showPopup = false
    }
  }
}
</script>
<style lang="scss" scoped>
.popup {
  position: absolute;
  top: -30px;
  left: 40px;
  .popup-close-button {
    cursor: pointer;
    position: absolute;
    top: 0px;
    right: -30px;
    width: 30px;
    height: 30px;
    padding: 7.5px;
    box-sizing: border-box;
    border-radius: 0px 3px 3px 0px;
    background: rgba($color: #2c343c, $alpha: 0.9);
    .iconfont {
      width: 15px;
      height: 15px;
      color: white;
    }
  }
}

.wrapper {
  width: 420px;
  height: 270px;
  padding: 10px 30px;
  box-sizing: border-box;
  border-radius: 5px 0 5px 5px;
  background: rgba($color: #2c343c, $alpha: 0.9);
  .wrapper-header {
    width: 100%;
    height: 25%;
    color: white;
    font: 500 20px sans-serif;
  }
  .wrapper-content {
    width: 100%;
    height: 75%;
    color: white;
    font: 500 16px sans-serif;
  }
}
</style>
