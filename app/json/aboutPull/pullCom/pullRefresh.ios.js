/**
 * Created by woowalker on 2017/8/28.
 */
"use strict";
import React, { Component } from "react";
import { View, StyleSheet, Dimensions, Animated, ScrollView, FlatList } from "react-native";
import PropTypes from "prop-types";
import LottieView from "lottie-react-native";

/** 声明一些常量 */
const { width, height } = Dimensions.get("window");

// 一些状态的记录
const NONE_STATUE = 0, // 正常手势，没有上拉或者下拉刷新
  STATUS_PULL_DOWN = 1, // 下拉过程中
  STATUS_IS_ALLOW_TO_REFRESH = 2, // 拉动距离处于可触发刷新
  STATUS_IS_REFRESHING = 3, // 顶部正在刷新
  TRIGGER_PULL_DOWN_REFRESH = 80; // 可以触发下拉刷新的距离

// 动画的阶段参数  aniStage1 = 下拉过程金币显示, aniStage2 = 金币掉落, aniStage3 = 正在加载, aniStage4 = 加载完成,
const aniStage1 = 0.54,
  aniStage2 = 0.67,
  aniStage3 = 0.78,
  aniStage4 = 1;

// lottie json 文件
const lotticeJson = require("./common_annimation_refresh.json");

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

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  componentWillReceiveProps(nextProps) {}

  // 通过ref向子组件传数据，避免整个scroll被渲染
  _setRefreshStatus(status, offset) {
    let _updateStyle = true; // 设置偏移量的标记变量
    // 刷新复位只更新状态
    if (status === NONE_STATUE && this._gestureStatus === STATUS_IS_REFRESHING) {
      _updateStyle = false;
    }
    // 当外部状态正在刷新，且当前不处于刷新状态时，开始启用加载动画
    else if (status === STATUS_IS_REFRESHING && this._gestureStatus !== status) {
      this._startLoading();
    }
    // 下拉过程中，实时计算动画的进度
    else if (status === STATUS_PULL_DOWN || status === STATUS_IS_ALLOW_TO_REFRESH) {
      if (offset >= 0) {
        let _per = offset / TRIGGER_PULL_DOWN_REFRESH;
        this._updateProgress(_per);
      }
    }
    // 下拉过程中最大取 80
    offset >= 0 && (offset = Math.min(TRIGGER_PULL_DOWN_REFRESH, offset));
    offset <= 0 && (offset = 0); // 上拉过程中，为 -80，保持不变

    _updateStyle && this._lotticeWrapperInstance && this._lotticeWrapperInstance.setNativeProps({ style: { transform: [{ translateY: offset - TRIGGER_PULL_DOWN_REFRESH }] } });
    this._gestureStatus = status;
  }

  render() {
    return (
      <View
        ref={ref => (this._lotticeWrapperInstance = ref)}
        style={[
          styles.refresh,
          {
            transform: [{ translateY: -TRIGGER_PULL_DOWN_REFRESH }]
          }
        ]}
      >
        <LottieView style={{ width: 100, height: 80 }} source={lotticeJson} progress={this.state.progress} />
      </View>
    );
  }
}

export default class PTRScrollList extends Component {
  _refreshDown = false; // 刷新结束标志变量
  static propTypes = {
    scrollComponent: PropTypes.oneOf(["ScrollView", "FlatList"]),
    getRef: PropTypes.func,
    refreshData: PropTypes.func
  };

  static defaultProps = {
    scrollComponent: "FlatList",
    refreshData: () => null
  };

  constructor(props) {
    super(props);
    this.state = {
      gestureStatus: NONE_STATUE, // 默认状态
      enableHeaderRefresh: true, // 根据父组件设置是否可以进行下拉刷新
      contentInset: { top: 0, right: 0, bottom: 0, left: 0 } // 视图边缘的坐标
    };
    this._defaultContentInstet = this.state.contentInset; // 记录初始化的滚动边界
    props.getRef instanceof Function && props.getRef(this);
  }

  componentWillUnmount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.enableHeaderRefresh !== undefined) this.state.enableHeaderRefresh = nextProps.enableHeaderRefresh;
  }

  // 刷新结束
  _hasRefreshDown = ({ animated = true } = {}) => {
    this._refreshDown = true; // 刷新结束
    this.state.gestureStatus = NONE_STATUE; // 重置刷新状态
    this._headerRefreshInstance && this._headerRefreshInstance._setRefreshStatus(NONE_STATUE, 0);
    this._scrollToPos(0, animated); // 动画向上回滚
  };

  /** 滚动结束contentInset重置 */
  onMomentumScrollEnd = e => {
    if (this._refreshDown) {
      this.props.preventPullUpLoad(true);
      this._headerRefreshInstance && this._headerRefreshInstance._stopAnimated();
      this._refreshDown = false;
      this.setState({
        contentInset: { ...this._defaultContentInstet }
      });
    }
  };

  /** 滚动到手动设置的位置 */
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

  /** 页面滚动函数，根据页面的滚动 距离，执行相对应的方法 */
  _onScroll = e => {
    let { y } = e.nativeEvent.contentOffset; // 视图滚动距离，向下为负，向上为正
    let { enableHeaderRefresh, gestureStatus } = this.state;
    // 允许头部刷新的情况下
    if (enableHeaderRefresh) {
      let _offsetY = y * -1; // 获取下拉距离
      // 处于下拉过程中
      if (gestureStatus !== STATUS_IS_REFRESHING && gestureStatus !== STATUS_IS_ALLOW_TO_REFRESH) {
        _offsetY >= TRIGGER_PULL_DOWN_REFRESH ? (this.state.gestureStatus = STATUS_IS_ALLOW_TO_REFRESH) : (this.state.gestureStatus = STATUS_PULL_DOWN);
      }
      // 设置根据下拉距离，设置头部下拉刷新的状态
      this._headerRefreshInstance && this._headerRefreshInstance._setRefreshStatus(this.state.gestureStatus, _offsetY);
    }
  };

  /** 拖拽结束 */
  onScrollEndDrag = e => {
    let { gestureStatus } = this.state;
    let { y } = e.nativeEvent.contentOffset;
    if (this._refreshDown) return;
    if (this.state.enableHeaderRefresh) {
      let _offsetY = y * -1;
      if (gestureStatus !== STATUS_IS_REFRESHING) {
        // 不处于刷新状态
        if (_offsetY >= TRIGGER_PULL_DOWN_REFRESH) {
          // 下拉距离大于可触发下拉刷新距离
          this.state.gestureStatus = STATUS_IS_REFRESHING;
          this._scrollToPos(-TRIGGER_PULL_DOWN_REFRESH, true);
          // 这里使用定时器(微任务)，等待滚动结束之后，设置列表的滚动位置(解决滚动还没有完全结束而导致的bug),设置列表的滚动边界
          let _timer = setTimeout(() => {
            this.setState({
              contentInset: {
                ...this._defaultContentInstet,
                top: TRIGGER_PULL_DOWN_REFRESH
              }
            });
            clearTimeout(_timer);
            _timer = null;
          }, 0);
        }
      }
      this._headerRefreshInstance && this._headerRefreshInstance._setRefreshStatus(this.state.gestureStatus, _offsetY);
    }
    this.props.onScrollEndDrag && this.props.onScrollEndDrag(e);
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
  _pullUpFinished =(bool)=>{
    this.setState({enableHeaderRefresh: bool})
  }

  render() {
    let { scrollComponent, refreshData, preventPullUpLoad } = this.props;
    let ScrollComponent = null;
    switch (scrollComponent) {
      case "ScrollView":
        ScrollComponent = <ScrollView {...this.props} />;
        break;
      default:
        ScrollComponent = <FlatList {...this.props} />;
        break;
    }

    return (
      <View style={[{ flex: 1 }]}>
        {this.state.enableHeaderRefresh ? (
          <HeaderRefresh ref={ref => (this._headerRefreshInstance = ref)} refreshData={refreshData} preventPullUpLoad={preventPullUpLoad} hasRefreshDown={this._hasRefreshDown} />
        ) : null}
        {React.cloneElement(
          ScrollComponent,
          {
            ref: ref => (this._scrollInstance = ref),
            contentContainerStyle: this.props.contentContainerStyle || { backgroundColor: "#ffffff" },
            onScroll: this._onScroll,
            contentInset: this.state.contentInset,
            onScrollEndDrag: this.onScrollEndDrag,
            onMomentumScrollEnd: this.onMomentumScrollEnd,
            onEndReachedThreshold: 0.01,
            automaticallyAdjustContentInsets: false,
            onEndReached: this._onEndReached
          },
          this.props.children
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  refresh: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 999,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
  }
});
