<template>
  <div class="header">
    <div class="title">{{ title }}</div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  props: {
    title: String
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.header {
  position: absolute;
  top: 0;
  left: 130px;
  right: 130px;
  height: 100px;
  background: radial-gradient(
    farthest-corner at 50% 0%,
    rgba(83, 200, 214, 0.54) 0%,
    rgba(139, 230, 237, 0) 65%
  );
  z-index: 1111;
  .title {
    margin-top: 10px;
    width: 100%;
    height: 60px;
    text-align: center;
    font: 500 32px sans-serif;
    color: #ffffff;
    line-height: 60px;
    user-select: none;
  }
}
</style>
