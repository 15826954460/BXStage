/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, FlatList, ScrollView, Animated,
} from "react-native";

/** 全局样式的引用 */
import {Size} from '../../styles/size';
import {Layout} from "../../styles/layout";

/** 第三方依赖库的引用 */
import LottieView from 'lottie-react-native';
import PropTypes from "prop-types";

/** 自定义组建的引用 */

/** 页面的引入 */

/** 工具类的引用 */

/** 常量声明 */
const aniStage1 = 0.54, aniStage2 = 0.67, aniStage3 = 0.78, aniStage4 = 1;

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
    this.state.progress.setValue(aniStage2);
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
      /** 延迟600ms重置数据 */
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
    updateStyle && this._lottieWrapper.setNativeProps({style: {transform: [{translateY}]}});
    this.state.getStatus = status
  }

  render() {
    return (
      <View
        ref={(ref) => this._lottieWrapper = ref}
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

export default class PullRefresh extends Component {

  static propTypes = {
    scrollComponent: PropTypes.oneOf(["ScrollView", "FlatList"]),
    enableHeaderRefresh: PropTypes.bool,
    enableFooterLoading: PropTypes.bool,
  }

  static defaultProps = {
    scrollComponent: 'FlatList',
    enableHeaderRefresh: true,
    enableFooterLoading: true,
  }

  _refreshDown = false;

  constructor(props) {
    super(props);
    this.state = {
      footerStatus: PULL_UP_NO_LOADDING,
      gestureStatus: NONE_STATUS,
      enableHeaderRefresh: props.enableHeaderRefresh,
      enableFooterLoading: props.enableFooterLoading,
      contentInset: {top: 0, left: 0, bottom: 0, right: 0}, // 内容范围相对滚动视图边缘的坐标
    };
    this._defaultContentInstet = props.contentInset || this.state.contentInset
  }

  componentDidMount() {
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps, nextState) {
  }

  shouldComponentUpdate(nextProps, nextState) {
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

  /** 下拉刷新结束 */
  _hasRefreshDown = () => {
    this._refreshDown = true
    // 状态的重置
    this._setGestureStatus(NONE_STATUS);
    this._headRefreshInstance._setRefreshStatus(NONE_STATUS)
    this.state.enableHeaderRefresh = true,
    this.state.enableFooterLoading = true,
    // 动画向上回滚
    this._currentOffsetY < 0 && this._scrollToPos(0, true);
  }

  /** 请求数据结束 */
  _fetchDataOk = () => {
    this._headRefreshInstance._hadDown = true
  }

  /** 开始拖拽 */
  onScrollBeginDrag = (e) => {

  }

  /** 开始滚动 */
  onMomentumScrollBegin = (e) => {

  }

  /** 修改当前状态 */
  _setGestureStatus = status => {
    this.state.gestureStatus = status;
  };

  /** 调用下拉刷新 */
  _headerRefresh = () => {
    this.state.enableFooterLoading = false // 禁止上拉加载
    this.props.onHeaderRefreshing instanceof Function && this.props.onHeaderRefreshing()
  }

  /** 滚动过程中 */
  onScroll = (e) => {
    // this._refreshDown = false;
    let {contentOffset, contentInset} = e.nativeEvent;
    this._currentOffsetY = contentOffset.y;
    let {enableHeaderRefresh, gestureStatus} = this.state;
    if (enableHeaderRefresh) {
      let y = this._currentOffsetY * -1; //  - this._defaultContentInstet.top
      if (gestureStatus !== PULL_DOWN_REFRESHING && gestureStatus !== PULL_DOWN_ALLOW_REFRESH) {
        if (y >= PULL_HEIGHT) {
          this._setGestureStatus(PULL_DOWN_ALLOW_REFRESH);
        }
        else {
          this._setGestureStatus(PULL_DOWN_NOT_REFRESH)
        }
      }
      this._headRefreshInstance && this._headRefreshInstance._setRefreshStatus(this.state.gestureStatus, y, this._refreshDown);
    }
    this.props.onScroll && this.props.onScroll(e);
  }

  /** 拖拽结束 */
  onScrollEndDrag = (e) => {
    let {enableHeaderRefresh} = this.state;
    let {gestureStatus, footerStatus} = this.state;
    let {contentOffset} = e.nativeEvent;
    let y = contentOffset.y;
    if (enableHeaderRefresh) {
      y = y * -1 - this._defaultContentInstet.top;
      /** 非正在刷新情况下 */
      if (gestureStatus !== PULL_DOWN_REFRESHING && footerStatus === PULL_UP_NO_LOADDING) {
        if (y >= PULL_HEIGHT) {
          this._setGestureStatus(PULL_DOWN_REFRESHING);
          /** 设置视图的偏移量 */
          this._scrollToPos(-PULL_HEIGHT - this._defaultContentInstet.top, true);
          /** 使用定时器避免滚动还没结束就进行跟新视图 */
          let _timer = setTimeout(() => {
            this.setState({
              contentInset: {
                ...this._defaultContentInstet,
                top: PULL_HEIGHT
              }
            }, () => {
              clearTimeout(_timer)
              _timer = null
            });
          }, 0);
        }
      }
      this._headRefreshInstance && this._headRefreshInstance._setRefreshStatus(this.state.gestureStatus, y, this._refreshDown);
    }
    this.props.onScrollEndDrag && this.props.onScrollEndDrag(e);
  }

  /** 滚动结束contentInset重置 */
  onMomentumScrollEnd = (e) => {
    if (this._refreshDown) {
      this.setState({
        contentInset: {
          ...this.state.contentInset,
          ...this._defaultContentInstet
        }
      })
      let _timer = setTimeout(() => {
        this._headRefreshInstance._stopAnimated()
        this._refreshDown = false
        clearTimeout(_timer)
        _timer = null
      }, 200)
    }
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
        ScrollComponent = <FlatList  {...this.props}/>;
        break;
    }
    return (
      <View style={{flex: 1, position: 'relative', borderWidth: 1, borderColor: 'red'}}>
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
              contentInset: this.state.contentInset,
              onMomentumScrollBegin: this.onMomentumScrollBegin,
              onMomentumScrollEnd: this.onMomentumScrollEnd,
              onScrollBeginDrag: this.onScrollBeginDrag,
              onScrollEndDrag: this.onScrollEndDrag,
              onScroll: this.onScroll,
              onEndReachedThreshold: 0.01,
              scrollEventThrottle: this.props.scrollEventThrottle || 16,
              contentContainerStyle: this.props.contentContainerStyle || {backgroundColor: "#ffffff"},
            },
            this.props.children
          )
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: Size.screen.width,
    height: Size.screen.height,
  },
  lottieWrapper: {
    position: 'absolute',
    top: 0,
    width: Size.screen.width, borderWidth: 1,
    height: PULL_HEIGHT,
    ...Layout.layout.rcc,
  }
});