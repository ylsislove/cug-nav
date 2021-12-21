const config = {
  icoToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3MWYwZjdjYS1iNDEwLTRmM2UtOTRjNi00NGZiNTcxMWRhMmMiLCJpZCI6MzQxNTksImlhdCI6MTYyMDgxNTA2OX0.J4xLynMzCF1ScedFdR3l7zwR_s9HZSOneguZfhXbA2w',
  viewerInterface: {
    geocoder: false, // 是否显示地名查找控件
    homeButton: true, // 是否显示Home按钮
    sceneModePicker: false, // 是否显示投影方式控件
    baseLayerPicker: false, // 是否显示图层选择控件
    navigationHelpButton: false, // 是否显示帮助信息控件
    animation: false, // 是否显示动画控件
    timeline: false, // 是否显示时间线控件
    infoBox: false, // 是否显示点击要素之后显示的信息
    selectionIndicator: false, // 是否显示选取指示器组件
    CreditsDisplay: false,
    showRenderLoopErrors: false,
    shouldAnimate: true,
    showCreditContainer: 'none'
  },
  depthTestAgainstTerrain: true,
  debugShowFramesPerSecond: true
}

export default config
