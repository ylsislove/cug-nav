<template>
  <div class="sidebar">
    <el-button
      :icon="collapseIcon"
      class="collapse-btn"
      size="small"
      @click="handleCollapse"
    ></el-button>
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      background-color="#282828dc"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
    >
      <el-submenu index="1">
        <template #title>
          <i class="el-icon-s-data"></i>
          <span>图层管理</span>
        </template>
        <el-menu-item index="1-1" @click="handleLeafletMap">
          Leaflet图层
        </el-menu-item>
        <el-menu-item index="1-2" @click="handleCUGModel">
          地大校园3D模型
        </el-menu-item>
        <!-- <el-menu-item
          v-for="sphere in sphereEntities"
          :key="sphere.id"
          :index="sphere.id"
          @click="showHemisphericAnalysisResult(sphere)"
        >
          {{ sphere.createTime }}
        </el-menu-item> -->
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import { onMounted, reactive, toRefs } from 'vue'
import Bus from '@/utils/bus.js'
export default {
  name: 'Sidebar',
  components: {},
  props: {},
  setup() {
    const data = reactive({
      isCollapse: true,
      collapseIcon: 'el-icon-s-unfold'
    })

    onMounted(() => {})

    const handleCollapse = () => {
      data.isCollapse = !data.isCollapse
      data.collapseIcon = data.isCollapse
        ? 'el-icon-s-unfold'
        : 'el-icon-s-fold'
    }

    const handleLeafletMap = () => {
      Bus.$emit('on-leaflet-map-visual-change')
    }

    const handleCUGModel = () => {
      Bus.$emit('on-cug-model-visual-change')
    }

    return {
      ...toRefs(data),
      handleCollapse,
      handleLeafletMap,
      handleCUGModel
    }
  }
}
</script>
<style lang="scss" scoped>
.sidebar {
  position: absolute;
  left: 5px;
  top: 10%;
}
.collapse-btn {
  margin-bottom: 10px;
  background: #282828dc;
  border: 1px solid #444;
  color: white;
}
.el-menu-vertical-demo {
  height: 60vh;
  border: 1px solid #444;
  border-radius: 5px;
  overflow-y: auto;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
}
</style>
