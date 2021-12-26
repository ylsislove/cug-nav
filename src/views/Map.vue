<template>
  <div class="layer-cesium">
    <div id="cesiumContainer"></div>
    <Header title="地大校园在线游览平台" />
    <PositionStatusBar />
    <CUGModel />
    <LeafletDemo />
    <LayerManager />
  </div>
</template>

<script>
import config from '@/assets/config'
import Header from '@/components/Header'
import PositionStatusBar from '@/components/PositionStatusBar'
import CUGModel from '@/components/CUGModel'
import LeafletDemo from '@/components/LeafletDemo'
import LayerManager from '@/components/LayerManager'
export default {
  name: 'Map',
  components: {
    Header,
    PositionStatusBar,
    CUGModel,
    LeafletDemo,
    LayerManager
  },
  mounted() {
    // Initialize Cesium
    const viewer = this.init()

    // Set the initial camera to look at Seattle
    this.setCameraView(viewer)
  },
  methods: {
    example1() {
      var viewer = window.viewer
      viewer.entities.add({
        name: 'Red box with black outline',
        position: Cesium.Cartesian3.fromDegrees(-107.0, 40.0, 300000.0),
        box: {
          dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
          material: Cesium.Color.RED.withAlpha(0.5),
          outline: true,
          outlineColor: Cesium.Color.BLACK
        }
      })
      viewer.zoomTo(viewer.entities)
    },
    setCameraView(viewer) {
      // 读取配置文件
      const views = {}
      config.homeCameraView.locale.forEach(item => {
        views[item.name] = {
          destination: Cesium.Cartesian3.fromDegrees(
            item.lng,
            item.lat,
            item.alt
          ),
          orientation: {
            heading: Cesium.Math.toRadians(item.heading),
            pitch: Cesium.Math.toRadians(item.pitch),
            roll: Cesium.Math.toRadians(item.roll)
          }
        }
      })

      // 设置默认视角
      if (config.homeCameraView.default) {
        viewer.camera.setView(views[config.homeCameraView.default])
        // 设置 Home 按钮
        viewer.homeButton.viewModel.command.beforeExecute.addEventListener(
          function (e) {
            e.cancel = true
            viewer.camera.setView(views[config.homeCameraView.default])
          }
        )
      }
    },
    init() {
      // 设置自己的账户Token
      Cesium.Ion.defaultAccessToken = config.icoToken

      // eslint-disable-next-line no-undef
      const vi = config.viewerInterface
      window.viewer = new Cesium.Viewer('cesiumContainer', {
        geocoder: vi.geocoder,
        homeButton: vi.homeButton,
        sceneModePicker: vi.sceneModePicker,
        baseLayerPicker: vi.baseLayerPicker,
        navigationHelpButton: vi.navigationHelpButton,
        animation: vi.animation,
        vrButton: true,
        timeline: vi.timeline,
        infoBox: vi.infoBox,
        selectionIndicator: vi.selectionIndicator,
        imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
          url: 'http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=caf650b739eb21de76bd479e8e714e5a',
          layer: 'tdtBasicLayer',
          style: 'default',
          format: 'image/jpeg',
          tileMatrixSetID: 'GoogleMapsCompatible',
          maximumLevel: 18,
          show: false
        }),
        terrainProvider: Cesium.createWorldTerrain({
          requestWaterMask: true, // required for water effects
          requestVertexNormals: true // required for terrain lighting
        })
      })

      // 判断是否支持图像渲染像素化处理
      if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
        viewer.resolutionScale = window.devicePixelRatio
      }

      // 是否开启抗锯齿
      viewer.scene.fxaa = true
      viewer.scene.postProcessStages.fxaa.enabled = true

      // 添加中文标记图层
      viewer.imageryLayers.addImageryProvider(
        new Cesium.WebMapTileServiceImageryProvider({
          url: 'http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=caf650b739eb21de76bd479e8e714e5a',
          layer: 'tdtAnnoLayer',
          style: 'default',
          format: 'image/jpeg',
          tileMatrixSetID: 'GoogleMapsCompatible',
          maximumLevel: 18,
          show: false
        })
      )

      // 隐藏版权信息
      viewer._cesiumWidget._creditContainer.style.display = 'none'

      // 修改默认工具栏样式
      const fullscreenContainer = document.getElementsByClassName(
        'cesium-viewer-fullscreenContainer'
      )[0]
      fullscreenContainer.style =
        'top: 7px; right: 45px; width: 32px; height: 32px; border-radius: 14%;'
      const vrContainer = document.getElementsByClassName(
        'cesium-viewer-vrContainer'
      )[0]
      vrContainer.style =
        'top: 7px; right: 82px; width: 32px; height: 32px; border-radius: 14%;'

      // 去除默认的双击选择实体事件
      // viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      //   Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      // )
      // viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      //   Cesium.ScreenSpaceEventType.LEFT_CLICK
      // )

      // 开启地形深度检测
      viewer.scene.globe.depthTestAgainstTerrain =
        config.depthTestAgainstTerrain

      // 关闭光照
      // viewer.scene.globe.enableLighting = false
      // viewer.shadows = false

      // 显示帧数
      viewer.scene.debugShowFramesPerSecond = config.debugShowFramesPerSecond

      return viewer
    }
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
