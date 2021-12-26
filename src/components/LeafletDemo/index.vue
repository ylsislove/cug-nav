<template>
  <div v-show="leafletMapVisible" id="leaflet-map"></div>
</template>
<script>
import { Map, TileLayer } from 'leaflet'
import Bus from '@/utils/bus.js'
export default {
  name: 'LeafletDemo',
  data() {
    return {
      leafletMapVisible: true
    }
  },
  mounted() {
    const map = new Map('leaflet-map')

    const layer = new TileLayer(
      'http://wprd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&style=7',
      {
        subdomains: '1234'
      }
    )

    layer.addTo(map)
    map.setView([30.45485255 + 0.0025, 114.61348573 + 0.0025], 15)

    Bus.$on('on-camera-change', data => {
      map.setView(
        [parseFloat(data.lat) - 0.001, parseFloat(data.lng) + 0.0025],
        15
      )
    })

    Bus.$on('on-leaflet-map-visual-change', () => {
      this.leafletMapVisible = !this.leafletMapVisible
    })
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
#leaflet-map {
  position: absolute;
  right: 0;
  bottom: 0px;
  width: 350px;
  height: 350px;
  // background: #fff;
}
</style>
