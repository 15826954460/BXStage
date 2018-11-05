const scrollnativeEvent = {
  contentInset: {right: 0, top: 0, left: 0, bottom: 0}, // 视图内容的样式
  contentOffset: {y: 1.6666666666666665, x: 0}, // 视图的偏移量 y 向上为 + 向下为 -
  contentSize: {width: 375, height: 918}, // 视图内容的高度
  // 可显示内容的高度
  layoutMeasurement: {
    height: 729,
    width: 375
  },
  zoomScale: 1
}

const onResponderNativeEvent = {
  changedTouches: [], // - 从上一次事件以来的触摸事件数组。
  identifier: '',   //- 触摸事件的 ID。
  locationX: '',  //- 触摸事件相对元素位置的 X 坐标。
  locationY: '', //- 触摸事件相对元素位置的 Y 坐标。
  pageX: '',  //- 触摸事件相对根元素位置的 X 坐标。
  pageY: '',  //- 触摸事件相对根元素位置的 Y 坐标。
  target: '',  //- 接收触摸事件的元素 ID.
  timestamp: '',  //- 触摸事件的时间标记，用来计算速度.
  touches: '',  //- 屏幕上所有当前触摸事件的数组.
}