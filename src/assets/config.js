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
  debugShowFramesPerSecond: true,
  homeCameraView: {
    show: true,
    default: 'cug',
    locale: [
      {
        name: 'earth',
        lng: 105.354166666667,
        lat: 28.7083333333333,
        alt: 22000000,
        heading: 0.0,
        pitch: -90,
        roll: 0.0
      },
      {
        name: 'china',
        lng: 105.354166666667,
        lat: 28.7083333333333,
        alt: 5000000,
        heading: 0.0,
        pitch: -90,
        roll: 0.0
      },
      {
        name: 'yuncheng',
        lng: 111.02074308,
        lat: 35.04524632,
        alt: 2000,
        heading: 0.0,
        pitch: -90,
        roll: 0.0
      },
      {
        name: 'cug',
        lng: 114.61348573,
        lat: 30.45485255,
        alt: 205.37,
        heading: 357.64,
        pitch: -23.88,
        roll: 0.0
      }
    ]
  }
}

export default config
