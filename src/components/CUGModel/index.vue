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
          position: { lng: 114.61245791, lat: 30.46229093 },
          desc: {
            header: '教学服务中心',
            content:
              '在教学服务中心里可以办理中国银行的业务，也可以处理申请宿舍等之类的杂事~'
          }
        },

        {
          id: 'locale_2',
          name: 'locale',
          position: { lng: 114.61273096, lat: 30.46120867 },
          desc: {
            header: '地质过程与矿产资源国家重点实验室',
            content: '简称国重一，没去过，功能不详~'
          }
        },
        {
          id: 'locale_3',
          name: 'locale',
          position: { lng: 114.61278653, lat: 30.46034689 },
          desc: {
            header: '生物地质与环境地质国家重点实验室',
            content: '简称国重二，没去过，功能不详~'
          }
        },
        {
          id: 'locale_4',
          name: 'locale',
          position: { lng: 114.61089427, lat: 30.46115811 },
          desc: {
            header: '材料与化学学院',
            content: '材化学子的主楼，里面应该进行着各种奇奇怪怪的实验~'
          }
        },
        {
          id: 'locale_5',
          name: 'locale',
          position: { lng: 114.61126023, lat: 30.46012181 },
          desc: {
            header: '环境学院',
            content: '环境学子的主楼，了解不多，功能不详~'
          }
        },
        {
          id: 'locale_6',
          name: 'locale',
          position: { lng: 114.6137364, lat: 30.4620103 },
          desc: {
            header: '计算机学院',
            content: '计算机系人骄傲的把秃头抬起~'
          }
        },
        {
          id: 'locale_7',
          name: 'locale',
          position: { lng: 114.61476276, lat: 30.46195053 },
          desc: {
            header: '地理与信息工程学院',
            content: '都说地信的妹子多，但单身狗也很多（不是~'
          }
        },
        {
          id: 'locale_8',
          name: 'locale',
          position: { lng: 114.6101033, lat: 30.46133712 },
          desc: {
            header: '经济管理学院',
            content: '经管学院，热门专业~'
          }
        },
        {
          id: 'locale_9',
          name: 'locale',
          position: { lng: 114.6132863, lat: 30.46037831 },
          desc: {
            header: '公共教学楼一',
            content:
              '简称公教一，平常上课的地方，在图书馆没开放之前也是自习的好地方~'
          }
        },
        {
          id: 'locale_10',
          name: 'locale',
          position: { lng: 114.61318679, lat: 30.46124233 },
          desc: {
            header: '公共教学楼二',
            content:
              '简称公教二，也是平常上课的地方，一些大大小小的考试也会在这里进行~'
          }
        },
        {
          id: 'locale_11',
          name: 'locale',
          position: { lng: 114.61312912, lat: 30.45891608 },
          desc: {
            header: '地大图书馆',
            content:
              '地大图书馆是一个学习的地方，里面环境舒适，学习氛围浓厚，非常适合在早上犯困的时候去图书馆激励自己~'
          }
        },
        {
          id: 'locale_12',
          name: 'locale',
          position: { lng: 114.61522975, lat: 30.4594947 },
          desc: {
            header: '大学生活动中心',
            content:
              '大学生活动中心会在节假日放一些电影，但可能并不会有多少人去看。除了电影，学校的毕业晚会之类的活动也是在这里举行~'
          }
        },
        {
          id: 'locale_13',
          name: 'locale',
          position: { lng: 114.61643206, lat: 30.46194485 },
          desc: {
            header: '室外体育场',
            content: '晚上有很多人在这里跑步，当然，情侣也有很多~'
          }
        },
        {
          id: 'locale_14',
          name: 'locale',
          position: { lng: 114.615789, lat: 30.4606172 },
          desc: {
            header: '体育馆',
            content:
              '体育馆里可以游泳、健身、打篮球、羽毛球和乒乓球，是一个不错的地方~'
          }
        },
        {
          id: 'locale_15',
          name: 'locale',
          position: { lng: 114.6158737, lat: 30.45975515 },
          desc: {
            header: '教工食堂',
            content: '顾名思义，如果你想偶遇老师，可以来这里试试~'
          }
        },
        {
          id: 'locale_16',
          name: 'locale',
          position: { lng: 114.61673554, lat: 30.45975035 },
          desc: {
            header: '博士后宿舍',
            content: '听说博士后宿舍都是单人间，也不知道是不是真的~'
          }
        },
        {
          id: 'locale_17',
          name: 'locale',
          position: { lng: 114.61672771, lat: 30.45905879 },
          desc: {
            header: '学五组团研究生宿舍',
            content: '这里还真不是很了解，欢迎投稿有趣的故事~'
          }
        },
        {
          id: 'locale_18',
          name: 'locale',
          position: { lng: 114.61568263, lat: 30.45881496 },
          desc: {
            header: '学三组团研究生宿舍',
            content: '啊，研究生宿舍相比本科生最棒的一点就是可以乘坐电梯，乌拉~'
          }
        },
        {
          id: 'locale_19',
          name: 'locale',
          position: { lng: 114.61433113, lat: 30.45805824 },
          desc: {
            header: '学二组团本科女生宿舍',
            content: '四人间，上床下桌，环境还行~'
          }
        },
        {
          id: 'locale_20',
          name: 'locale',
          position: { lng: 114.61192498, lat: 30.45803168 },
          desc: {
            header: '学一组团本科男生宿舍',
            content: '四人间，上床下桌，环境还行~'
          }
        },
        {
          id: 'locale_21',
          name: 'locale',
          position: { lng: 114.60970945, lat: 30.45877555 },
          desc: {
            header: '学四组团留学生宿舍',
            content: '这里还真不是很了解，欢迎投稿有趣的故事~'
          }
        },
        {
          id: 'locale_22',
          name: 'locale',
          position: { lng: 114.61318789, lat: 30.45799414 },
          desc: {
            header: '学生一食堂',
            content: '简称学一，比教工食堂的饭菜要便宜一些，味道还行~'
          }
        },
        {
          id: 'locale_23',
          name: 'locale',
          position: { lng: 114.61062241, lat: 30.45843315 },
          desc: {
            header: '学生二食堂',
            content: '简称学二，民族风味餐厅，偶尔在这里换换口味也是很不错哒~'
          }
        },
        {
          id: 'locale_24',
          name: 'locale',
          position: { lng: 114.60997625, lat: 30.46032926 },
          desc: {
            header: '校医院',
            content: '看病的地方~'
          }
        },
        {
          id: 'locale_25',
          name: 'locale',
          position: { lng: 114.60885252, lat: 30.46198955 },
          desc: {
            header: '能源与物业中心',
            content: '功能不详~'
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
    line-height: 26px !important;
    font: 500 16px sans-serif;
  }
}
</style>
