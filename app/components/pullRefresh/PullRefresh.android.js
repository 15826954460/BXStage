/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, FlatList, ScrollView, Animated, PanResponder, UIManager, LayoutAnimation, Platform,
} from "react-native";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}
/** 全局样式的引用 */
import Size from '../../styles/size';
import Layout from "../../styles/layout";

/** 第三方依赖库的引用 */
import LottieView from 'lottie-react-native';
import PropTypes from "prop-types";

/** 自定义组建的引用 */

/** 页面的引入 */

/** 工具类的引用 */

/** 常量声明 */
const aniStage1 = 0.54, aniStage2 = 0.68, aniStage3 = 0.78, aniStage4 = 1;

const
  PULL_HEIGHT = 80, // 下拉刷新高度
  NONE_STATUS = 0, // 没有上拉或者下拉
  PULL_DOWN_NOT_REFRESH = 1, // 下拉不够刷新
  PULL_DOWN_ALLOW_REFRESH = 2, // 下拉足够刷新
  PULL_DOWN_REFRESHING = 3, // 正在刷新
  PULL_UP_NO_LOADDING = 4, // 底部没有加载
  PULL_UP_LOADDING = 5;// 底部正在加载

const
  GOLD_DOWN = 400, // 金币掉落动画
  INFINITE_LOADING = 400, // 加载部分动画执行时间
  REFRESH_OK = 80, // 加载结束
  DELAY_TIME = 600; // 延迟600毫秒动画回滚

class HeaderComponent extends Component {

  _hadDown = false;

  constructor(props) {
    super(props);
    this.state = {
      getStatus: NONE_STATUS,
      progress: new Animated.Value(0),
    };
    props.getRef instanceof Function && props.getRef(this)
  }

  componentDidMount() {

  }

  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  /** 阻止动画并重置数据 */
  _stopAnimated = () => {
    this.state.progress.setValue(0);
  }

  /** 更改动画加载进度 */
  _updateProgress = per => {
    per >= 1 ? per = aniStage1 : per = per * aniStage1
    this.state.progress.setValue(per);
  }

  /** 金币掉落 */
  _goldDown = () => {
    Animated.timing(this.state.progress, {
      toValue: aniStage2,
      duration: GOLD_DOWN,
      useNativeDriver: true,
    }).start(() => {
      this.props.headerRefresh instanceof Function && this.props.headerRefresh()
      this._loopLoading()
    })
  }

  /** 加载部分 */
  _loopLoading = () => {
    this.state.progress.setValue(0.68);
    Animated.timing(this.state.progress, {
      toValue: aniStage3,
      duration: INFINITE_LOADING,
      useNativeDriver: true,
    }).start(() => {
      if (!this._hadDown) {
        this._loopLoading()
        return
      }
      this._loadDown()
    })
  }

  /** 动画加载完成 */
  _loadDown = () => {
    this.state.progress.setValue(aniStage3);
    Animated.timing(this.state.progress, {
      toValue: aniStage4,
      duration: REFRESH_OK,
      useNativeDriver: true
    }).start(() => {
      /** 延迟600ms进行动画回滚 */
      let _timer = setTimeout(() => {
        this.props.hasRefreshDown instanceof Function && this.props.hasRefreshDown()
        clearTimeout(_timer)
        _timer = null
      }, DELAY_TIME)
    })
  }

  /** 根据不同的状态来判断加载 */
  _setRefreshStatus = (status, y, refreshDown) => {
    const {getStatus} = this.state
    let updateStyle = true; // 是否改变样式的控制变量
    /** 处于刷新和刷新结束的时候不用更改样式 */
    if (status === NONE_STATUS && getStatus === PULL_DOWN_REFRESHING) {
      updateStyle = false;
    }

    /** 非刷新状态下计算动画的进度 */
    if ((status === PULL_DOWN_NOT_REFRESH || status === PULL_DOWN_ALLOW_REFRESH) && !refreshDown) {
      if (y >= 0) {
        let _per = y / PULL_HEIGHT;
        this._updateProgress(_per)
      }
    }
    /** 金币掉落动画 */
    else if (status === PULL_DOWN_REFRESHING && getStatus !== PULL_DOWN_REFRESHING) {
      this._goldDown()
    }
    /** 取最小下拉距离 */
    if (y >= 0) {
      y = Math.min(PULL_HEIGHT, y);
    }
    let translateY = y - PULL_HEIGHT;
    /** 改变样式 */
    updateStyle && this._lottieWrapper && this._lottieWrapper.setNativeProps({style: {transform: [{translateY}]}});
    this.state.getStatus = status
  }

  render() {
    return (
      <View
        ref={ref => this._lottieWrapper = ref}
        style={[styles.lottieWrapper,
          {
            transform: [{translateY: -PULL_HEIGHT}],
          }
        ]}>
        <View style={{width: 100, height: 80}}>
          <LottieView
            source={require('../../json/common_annimation_refresh.json')}
            progress={this.state.progress}
          />
        </View>
      </View>
    )
  }
}

// 全局的动画配置
function customLayoutAnimationConfig(duration) {
  return {
    duration: duration,
    create: {
      property: LayoutAnimation.Properties.opacity,
      type: LayoutAnimation.Types.easeInEaseOut
    },
    update: {
      type: LayoutAnimation.Types.easeInEaseOut
    }
  }
}

export default class PullRefresh extends Component {

  static propTypes = {
    scrollComponent: PropTypes.oneOf(["ScrollView", "FlatList"]),
    enableHeaderRefresh: PropTypes.bool,
    enableFooterLoading: PropTypes.bool,
  }

  static defaultProps = {
    scrollComponent: 'FlatList',
    enableHeaderRefresh: true,
    enableFooterLoading: false,
  }

  _refreshDown = false;
  _currentOffsetY = 0;

  constructor(props) {
    super(props);
    this.state = {
      gestureStatus: NONE_STATUS,
      enableHeaderRefresh: props.enableHeaderRefresh,
      enableFooterLoading: props.enableFooterLoading,
      footerStatus: PULL_UP_NO_LOADDING
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: this.onMoveShouldSetPanResponderCapture,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderEnd: this.onPanResponderEnd
    });
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps, nextState) {
  }

  shouldComponentUpdate(nextProps) {
    return true
  }

  _scrollToPos = (offset, animated) => {
    let {scrollComponent} = this.props;
    switch (scrollComponent) {
      case "ScrollView":
        this._scrollInstance && this._scrollInstance.scrollTo({x: 0, y: offset, animated});
        break;
      case "FlatList":
        this._scrollInstance && this._scrollInstance.scrollToOffset({offset, animated});
        break;
    }
  };

  onScroll = e => {
    let {contentOffset} = e.nativeEvent;
    this._currentOffsetY = contentOffset.y;
    let {enableHeaderRefresh, gestureStatus} = this.state;
    if (enableHeaderRefresh) {
      let y = this._currentOffsetY;
      if (gestureStatus === PULL_DOWN_REFRESHING) {
        this._headRefreshInstance._setRefreshStatus(this.state.gestureStatus, y, this._refreshDown);
      }
    }
  };

  /** 根据内容显示高度来判断是否显示底部提示文案 */
  onContentSizeChange = (w, h) => {
    if (h < Size.screen.height - Size.screen.statusBarHeight) {
      this.setState({enableFooterLoading: false})
    } else {
      this.setState({enableFooterLoading: true})
    }
  }

  /** 底部文案 */
  _footerCom = () => {
    return <View style={[
      {justifyContent: 'center', alignItems: 'center', marginTop: 6}
    ]}>
      <Text style={{color: Layout.color.wgray_sub, fontSize: 13,}}>{'正在加载...'}</Text>
    </View>
  }

  /** 修改当前状态 */
  _setGestureStatus = (status) => {
    this.state.gestureStatus = status;
  };

  /** 事件劫持 */
  onMoveShouldSetPanResponderCapture = (evt, gestureState) => {
    let {dy, vy} = gestureState;
    let result = this.state.gestureStatus !== PULL_DOWN_REFRESHING && gestureState.vy > 0 && this._currentOffsetY === 0;
    /** 是否禁用滚动事件 */
    this._scrollInstance && this._scrollInstance.setNativeProps({scrollEnabled: !result});
    return result;
  };

  // 开始拖拽
  onPanResponderMove = (evt, gestureState) => {
    let {dy, vy} = gestureState;
    let {enableHeaderRefresh, gestureStatus} = this.state;
    if (enableHeaderRefresh) {
      console.log(11111, gestureStatus)
      let y = dy;
      if (gestureStatus !== PULL_DOWN_REFRESHING) {
        if (y >= PULL_HEIGHT) {
          this._setGestureStatus(PULL_DOWN_ALLOW_REFRESH);
        }
        else if (y < PULL_HEIGHT && y > 0) {
          this._setGestureStatus(PULL_DOWN_NOT_REFRESH);
        }
      }
      if (gestureStatus !== PULL_DOWN_REFRESHING) {
        this._scrollInstance && this._scrollInstance.setNativeProps({style: {paddingTop: y}});
        this._headRefreshInstance._setRefreshStatus(this.state.gestureStatus, y, this._refreshDown);
      }
    }
  };

  // 拖拽结束 onPanResponderEnd
  onPanResponderEnd = (evt, gestureState) => {
    let {dy, vy} = gestureState;
    let {enableHeaderRefresh} = this.state;
    let {gestureStatus, footerStatus} = this.state;
    let y = dy;
    if (enableHeaderRefresh) {
      if (gestureStatus !== PULL_DOWN_REFRESHING && y >= 0) {
        let duration = 200;
        if (y >= PULL_HEIGHT && footerStatus === PULL_UP_NO_LOADDING) {
          this._setGestureStatus(PULL_DOWN_REFRESHING);
          this._scrollInstance && this._scrollInstance.setNativeProps({style: {paddingTop: PULL_HEIGHT}});
          this._headRefreshInstance._setRefreshStatus(this.state.gestureStatus, PULL_HEIGHT, this._refreshDown);
          duration = Math.min(((y - PULL_HEIGHT) / PULL_HEIGHT) * duration, duration);
        }
        /** 针对下拉加速度特别快不会触发 onPanResponderMove 的条件 */
        else if ((vy > 0.4 || (vy > 0 && /e/g.test(String(vy)))) && footerStatus === PULL_UP_NO_LOADDING) {
          this._setGestureStatus(PULL_DOWN_REFRESHING);
          this._scrollInstance && this._scrollInstance.setNativeProps({style: {paddingTop: PULL_HEIGHT}});
          this._headRefreshInstance._setRefreshStatus(this.state.gestureStatus, PULL_HEIGHT, this._refreshDown);
          duration = Math.min(((PULL_HEIGHT - y) / PULL_HEIGHT) * duration, duration);
        }
        else {
          this._scrollInstance && this._scrollInstance.setNativeProps({style: {paddingTop: 0}});
          this._headRefreshInstance._setRefreshStatus(this.state.gestureStatus, 0, this._refreshDown);
          duration = Math.min((y / PULL_HEIGHT) * duration, duration);
        }
        LayoutAnimation.configureNext(customLayoutAnimationConfig(duration));
      }
    }
  };

  /** 下拉刷新结束 */
  _hasRefreshDown = () => {
    LayoutAnimation.configureNext(customLayoutAnimationConfig(200));
    this._scrollInstance && this._scrollInstance.setNativeProps({style: {paddingTop: 0}});
    this._refreshDown = true
    // 状态的重置
    this.setState({enableHeaderRefresh: true})
    this._headRefreshInstance._stopAnimated()
    this._refreshDown = false
    this._setGestureStatus(NONE_STATUS);
    this._headRefreshInstance._setRefreshStatus(NONE_STATUS)
  }

  /** 请求数据结束 */
  _fetchDataOk = () => {
    this._headRefreshInstance._hadDown = true
  }

  /** 下拉刷新 */
  _headerRefresh = () => {
    this.setState({enableFooterLoading: false})
    this.props.onHeaderRefreshing instanceof Function && this.props.onHeaderRefreshing()
  }

  render() {
    const {scrollComponent} = this.props
    const {enableHeaderRefresh, enableFooterLoading} = this.state
    let ScrollComponent = null;
    switch (scrollComponent) {
      case "ScrollView":
        ScrollComponent = <ScrollView  {...this.props}/>;
        break;
      default:
        ScrollComponent = <FlatList
          {...this.props}
          ListFooterComponent={enableFooterLoading ? this._footerCom() : null}
          onEndReached={this._onEndReached}/>;
        break;
    }
    return (
      <View style={{flex: 1, position: 'relative',}}
            {...this._panResponder.panHandlers}
            collapsable={false}>
        {
          enableHeaderRefresh ? <HeaderComponent
            headerRefresh={this._headerRefresh}
            hasRefreshDown={this._hasRefreshDown}
            getRef={ref => this._headRefreshInstance = ref}
          /> : null
        }
        {
          React.cloneElement(
            ScrollComponent,
            {
              ref: ref => this._scrollInstance = ref,
              onScroll: this.onScroll,
              onContentSizeChange: this.onContentSizeChange,
              onScrollEndDrag: this.onScrollEndDrag,
              onEndReachedThreshold: 0.01,
              scrollEventThrottle: this.props.scrollEventThrottle || 16,
              contentContainerStyle: this.props.contentContainerStyle || {
                backgroundColor: "#ffffff",
              },
            },
            this.props.children
          )
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  lottieWrapper: {
    position: 'absolute',
    top: 0,
    width: Size.screen.width,
    height: PULL_HEIGHT,
    ...Layout.layout.rcc,
  }
});