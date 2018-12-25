/**
 * Created by woowalker on 2017/8/28.
 */
"use strict";
import React, { Component } from "react";
import { View, StyleSheet, Dimensions, Text, Animated, ScrollView, FlatList, PanResponder, UIManager, LayoutAnimation, Platform } from "react-native";
import PropTypes from "prop-types";
import LottieView from "lottie-react-native";
const { width, height } = Dimensions.get("window");

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// 一些状态的记录
const NONE_STATUE = 0, // 正常手势，没有上拉或者下拉刷新
  STATUS_PULL_DOWN = 1, // 下拉过程中
  STATUS_IS_ALLOW_TO_REFRESH = 2, // 拉动距离处于可触发刷新
  STATUS_IS_REFRESHING = 3, // 顶部正在刷新
  TRIGGER_PULL_DOWN_REFRESH = 80; // 可以触发下拉刷新的距离

// lottie json 文件
const lotticeJson = require("./common_annimation_refresh.json");

// 动画的阶段参数  aniStage1 = 下拉过程金币显示, aniStage2 = 金币掉落, aniStage3 = 正在加载, aniStage4 = 加载完成,
const aniStage1 = 0.54,
  aniStage2 = 0.67,
  aniStage3 = 0.78,
  aniStage4 = 1;

const GOLD_DOWN = 400, // 金币掉落动画
  INFINITE_LOADING = 400, // 加载部分动画执行时间
  REFRESH_OK = 80, // 加载结束
  DELAY_TIME = 600; // 延迟600毫秒动画回滚

class HeaderRefresh extends Component {
  _gestureStatus = NONE_STATUE;
  _fetchSuccess = false;
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0)
    };
  }

  componentWillUnmount() {}

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  _hasFetchDown = () => {
    this._fetchSuccess = true;
  };

  /** 阻止动画并重置数据 */
  _stopAnimated = () => {
    this.state.progress.setValue(0);
  };

  // 下拉过程设置进度
  _updateProgress = per => {
    per >= 1 ? (per = aniStage1) : (per = per * aniStage1);
    this.state.progress.setValue(per);
  };

  /** 开始启用动画 */
  _startLoading = () => {
    this._goldDown();
  };

  /** 金币掉落过程 */
  _goldDown = () => {
    Animated.timing(this.state.progress, {
      toValue: aniStage2,
      duration: GOLD_DOWN,
      useNativeDriver: true
    }).start(() => {
      // 金币掉落请求刷新数据接口
      this.props.refreshData instanceof Function && this.props.refreshData();
      this.props.preventPullUpLoad && this.props.preventPullUpLoad(false); // 禁用上拉加载
      // 同时调用循环动画的过程
      this._loopLoading();
    });
  };

  /** 接口请求数据过程 */
  _loopLoading() {
    Animated.timing(this.state.progress, {
      toValue: aniStage3,
      duration: INFINITE_LOADING,
      useNativeDriver: true
    }).start(() => {
      this.state.progress.setValue(aniStage2);
      !this._fetchSuccess ? this._loopLoading() : this._loadingDown();
    });
  }

  /** 动画加载完成 */
  _loadingDown = () => {
    Animated.timing(this.state.progress, {
      toValue: aniStage4,
      duration: REFRESH_OK,
      useNativeDriver: true
    }).start(() => {
      /** 延迟600ms进行动画回滚 */
      let _timer = setTimeout(() => {
        this.props.hasRefreshDown instanceof Function && this.props.hasRefreshDown();
        clearTimeout(_timer);
        _timer = null;
      }, DELAY_TIME);
    });
  };

  // 通过ref向子组件传数据，避免整个scroll被渲染
  _setRefreshStatus(status, offset) {
    let currentStatus = this._gestureStatus;
    // 开始进行刷新数据
    if (status === STATUS_IS_REFRESHING && this._gestureStatus !== status) {
      this._startLoading();
    }
    // 处于下拉过程中
    else if (status === STATUS_PULL_DOWN || status === STATUS_IS_ALLOW_TO_REFRESH) {
      if (offset >= 0) {
        let _per = offset / TRIGGER_PULL_DOWN_REFRESH;
        this._updateProgress(_per);
      }
    }
    this._gestureStatus = status;
    offset >= 0 && (offset = Math.min(TRIGGER_PULL_DOWN_REFRESH, offset));
    offset <= 0 && (offset = 0); // 上拉过程中，为 -80，保持不变
    let translateY = offset - TRIGGER_PULL_DOWN_REFRESH;
    if (status === STATUS_IS_REFRESHING && currentStatus === STATUS_IS_REFRESHING) {
      translateY = -offset;
    }
    this._lotticeWrapperInstance && this._lotticeWrapperInstance.setNativeProps({ style: { top: translateY } });
  }

  render() {
    return (
      <View
        ref={ref => (this._lotticeWrapperInstance = ref)}
        style={[
          Styles.refresh,
          {
            top: -TRIGGER_PULL_DOWN_REFRESH
          }
        ]}
      >
        <LottieView style={{ width: 100, height: 80 }} source={lotticeJson} progress={this.state.progress} />
      </View>
    );
  }
}

function customLayoutAnimationConfig(duration) {
  return {
    duration,
    create: {
      property: LayoutAnimation.Properties.opacity,
      type: LayoutAnimation.Types.easeInEaseOut
    },
    update: {
      type: LayoutAnimation.Types.easeInEaseOut
    },
    delete: {
      property: LayoutAnimation.Properties.opacity,
      type: LayoutAnimation.Types.easeInEaseOut
    }
  };
}

export default class PTRScrollList extends Component {
  _headerRefreshInstance = null; //刷新头实例
  _currentOffsetY = 0;
  _panResponder = null;
  _refreshDown = false; // 刷新结束标志变量

  static propTypes = {
    scrollComponent: PropTypes.oneOf(["ScrollView", "FlatList"]),
    getRef: PropTypes.func,
    onHeaderRefreshing: PropTypes.func,
    renderHeaderRefresh: PropTypes.object,
    contentContainerStyle: PropTypes.object
  };

  static defaultProps = {
    scrollComponent: "FlatList",
    getRef: () => null,
    onHeaderRefreshing: () => null
  };

  constructor(props) {
    super(props);
    this.state = {
      gestureStatus: NONE_STATUE,
      enableHeaderRefresh: true,
      scrollEnabled: true
    };
    props.getRef instanceof Function && props.getRef(this);
  }

  componentDidMount() {
    console.log(555555555);
  }

  //注册手势事件
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: this._onMoveShouldSetPanResponderCapture,
      onPanResponderMove: this._onPanResponderMove,
      onPanResponderEnd: this._onPanResponderEnd
    });
  }

  componentWillUnmount() {}

  componentWillReceiveProps(nextProps) {}

  _scrollToPos = (offset, animated) => {
    let { scrollComponent } = this.props;
    switch (scrollComponent) {
      case "ScrollView":
        this._scrollInstance && this._scrollInstance.scrollTo({ x: 0, y: offset, animated });
        break;
      case "FlatList":
        this._scrollInstance && this._scrollInstance.scrollToOffset({ offset, animated });
        break;
    }
  };

  // 判断事件劫持在这里执行
  _onMoveShouldSetPanResponderCapture = (evt, gestureState) => {
    let { dy, vy } = gestureState; // vy: 纵向移动速度  下拉为 - 上拉为 +
    let result = this.state.gestureStatus !== STATUS_IS_REFRESHING && vy > 0 && this._currentOffsetY === 0;
    // 事件劫持，启用滚动，不劫持的时候，禁用滚动  alse 禁用 true 开启
    this._scrollInstance && this._scrollInstance.setNativeProps({ scrollEnabled: !result });
    console.log(66666666666, "------onMoveShouldSetPanResponderCapture------", "dy=" + dy, "vy=" + vy, "result=");
    // return result;
    return true;
  };

  _onPanResponderMove = (evt, gestureState) => {
    /** 手势事件参考链接：https://reactnative.cn/docs/0.56/panresponder/ */
    let { dy, vy } = gestureState;
    let { enableHeaderRefresh, gestureStatus } = this.state;
    console.log(66666666666, "---------onPanResponderMove----------", "dy=" + dy, "vy=" + vy, "gestureStatus=" + gestureStatus);
    if (enableHeaderRefresh) {
      if (gestureStatus !== STATUS_IS_REFRESHING) {
        dy >= TRIGGER_PULL_DOWN_REFRESH ? (this.state.gestureStatus = STATUS_IS_ALLOW_TO_REFRESH) : (this.state.gestureStatus = STATUS_PULL_DOWN);
      }
      if (gestureStatus !== STATUS_IS_REFRESHING) {
        this._scrollInstance && this._scrollInstance.setNativeProps({ style: { paddingTop: dy } });
        this._headerRefreshInstance && this._headerRefreshInstance._setRefreshStatus(this.state.gestureStatus, dy);
      }
    }
  };

  // 拖拽结束 onPanResponderEnd
  _onPanResponderEnd = (evt, gestureState) => {
    let { dy, vy } = gestureState;
    let { enableHeaderRefresh } = this.state;
    let { gestureStatus } = this.state;
    console.log(6666666666688, "-----onPanResponderEnd-----", "dy=" + dy, "vy=" + vy, "enableHeaderRefresh=" + enableHeaderRefresh);
    if (enableHeaderRefresh) {
      if (gestureStatus !== STATUS_IS_REFRESHING && dy >= 0) {
        let duration = 200; // 自定义动画时间
        LayoutAnimation.configureNext(customLayoutAnimationConfig(duration));

        // 正常下拉 且下拉距离足够刷新
        if (dy >= TRIGGER_PULL_DOWN_REFRESH) {
          this.state.gestureStatus = STATUS_IS_REFRESHING;
          this._scrollInstance && this._scrollInstance.setNativeProps({ style: { paddingTop: TRIGGER_PULL_DOWN_REFRESH } });
          this._headerRefreshInstance._setRefreshStatus(this.state.gestureStatus, TRIGGER_PULL_DOWN_REFRESH);
          // 计算动画时间
          duration = Math.min(((dy - TRIGGER_PULL_DOWN_REFRESH) / TRIGGER_PULL_DOWN_REFRESH) * duration, duration);
        }
        // 下拉速度足够快，android 手机识别不到 onPanResponderMove 过程，此时此刻的 dy = 0
        else if (vy > 0.4 || (vy > 0 && /e/g.test(String(vy)))) {
          console.log(66666666666, "-----------足够快--------------");
          this.state.gestureStatus = STATUS_IS_REFRESHING;
          this._scrollInstance && this._scrollInstance.setNativeProps({ style: { paddingTop: TRIGGER_PULL_DOWN_REFRESH } });
          this._headerRefreshInstance._setRefreshStatus(this.state.gestureStatus, TRIGGER_PULL_DOWN_REFRESH);
          duration = Math.min(((TRIGGER_PULL_DOWN_REFRESH - dy) / TRIGGER_PULL_DOWN_REFRESH) * duration, duration);
        }
        // 正常下拉，不足以刷新
        else {
          this._scrollInstance && this._scrollInstance.setNativeProps({ style: { paddingTop: 0 } });
          this._headerRefreshInstance._setRefreshStatus(this.state.gestureStatus, NONE_STATUE);
          duration = Math.min((dy / TRIGGER_PULL_DOWN_REFRESH) * duration, duration);
        }
      }
      console.log(6666666666688, "-----onPanResponderEnd-----", "dy=" + dy, "vy=" + vy);
    }
  };

  // 动画刷新完成初始化位置
  _hasRefreshDown = (animated = true) => {
    this.state.gestureStatus = NONE_STATUE;
    this._headerRefreshInstance && this._headerRefreshInstance._setRefreshStatus(NONE_STATUE, 0);
    this._scrollInstance && this._scrollInstance.setNativeProps({ style: { paddingTop: 0 } });
    // this._currentOffsetY < 0 && this._scrollToPos(0, animated); // 下拉刷新的时候才会执行该方法
    this.props.preventPullUpLoad(true);
    this._headerRefreshInstance && this._headerRefreshInstance._stopAnimated();
  };

  // 下面的滚动方法只会再下拉刷新且状态为 STATUS_IS_REFRESHING 的时候执行，下拉刷新没结束
  _onScroll = e => {
    let { contentOffset } = e.nativeEvent;
    this._currentOffsetY = contentOffset.y;
    let { enableHeaderRefresh, gestureStatus } = this.state;
    if (enableHeaderRefresh) {
      let y = this._currentOffsetY;
      if (gestureStatus === STATUS_IS_REFRESHING) {
        this._headerRefreshInstance._setRefreshStatus(this.state.gestureStatus, y);
      }
    }
  };

  // 下拉请求接口成功
  _refreshSuccess = () => {
    this._headerRefreshInstance && this._headerRefreshInstance._hasFetchDown();
  };

  // 上拉加载
  _onEndReached = () => {
    this.props.onEndReached();
  };

  // 上拉加载结束
  _pullUpFinished = bool => {
    this.setState({ enableHeaderRefresh: bool });
  };

  render() {
    let { enableHeaderRefresh, scrollEnabled } = this.state;
    let { scrollComponent, refreshData, preventPullUpLoad } = this.props;
    let ScrollComponent = null;
    switch (scrollComponent) {
      case "ScrollView":
        ScrollComponent = ScrollView;
        break;
      default:
        ScrollComponent = FlatList;
        break;
    }
    return (
      // collapsable 保证页面中的结构
      <View style={Styles.wrap} {...this._panResponder.panHandlers} collapsable={false}>
        {enableHeaderRefresh ? (
          <HeaderRefresh ref={ref => (this._headerRefreshInstance = ref)} refreshData={refreshData} preventPullUpLoad={preventPullUpLoad} hasRefreshDown={this._hasRefreshDown} />
        ) : null}
        <ScrollComponent
          {...this.props}
          ref={ref => (this._scrollInstance = ref)}
          scrollEnabled={scrollEnabled}
          scrollEventThrottle={16}
          contentContainerStyle={this.props.contentContainerStyle || { backgroundColor: "#ffffff" }}
          onTouchStart={this.onTouchStart}
          onTouchMove={this.onTouchMove}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          onScroll={this._onScroll}
          onEndReachedThreshold={0.01}
          onEndReached={this._onEndReached}
        />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  wrap: {
    flex: 1,
    position: "relative"
  },
  refresh: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
  }
});
