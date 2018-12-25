/** react 组建的引用 */
import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";

/** 全局样式的引用 */
import HBStyle from "../../styles/standard";
import CommonSize from "../../utility/size";
/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import withTemplate from "../../components/HOC/withTemplate";
import withOnScroll from "../../components/HOC/withOnScrollToNav";
import CTouchableWithoutFeedback from "../../components/CTouchableWithoutFeedback";
import PTRScrollList from "./pullCom/pullRefresh";

/** 页面的引入 */
import ResultPageNoTitle from "../../components/ResultPageNoTitle";

/** 工具类的引用 */
import WebAPI from "../../utility/webAPI";
import Util from "../../utility/util";
import { backToRoute } from "../../utility/NavigationHelper";

/** 常量声明 */
// const WithScrollView = withOnScroll(FlatList);
const NOData_Icon = require("../../res_img/common/common_img_blank.png");

@withTemplate
export default class Notice extends Component {
  _isAllowToPullUpLoad = false; // 是否允许下拉刷新

  constructor(props) {
    super(props);
    this.state = {
      isLoadingMore: false, // 是否正在加载
      hasNoMoreData: false, // 没有更多数据
      isGetNoticeData: true, // 是否收到过通知
      page: 1, // 页数
      rows: 10, // 每页条数
      data: []
    };
    this.navConfig = {
      title: "通知"
    };
  }

  componentDidMount() {
    this._getNotice({ isInitFetch: true });
  }

  componentWillMount() {}

  componentWillUnmount() {}

  componentWillReceiveProps(nextProps, nextState) {}

  shouldComponentUpdate(nextProps) {
    return true;
  }

  /** 获取通知列表 */
  _getNotice = ({ isInitFetch = false, isPullRefresh = false, isPullUpLoad = false } = {}) => {
    /**
     * isInitFetch 判断是不是初次请求接口的变量，用来控制是否需要显示底部文案
     * isPullRefresh 下拉刷新控制变量, 处理下拉刷新相关的状态
     * isPullUpLoad 上拉加载的控制变量，用来根据上拉的状态来处理是否允许下拉加载
     */
    const { page, rows } = this.state;
    !isInitFetch && this.setState({ isLoadingMore: true });
    this._timer = setTimeout(() => {
      clearTimeout(this._timer);
      WebAPI.Borrower.GetClaimsTransferNoticeList("28acec737a1b4638b11d51f9f33bdbe8", page, rows)
        .success(res => {
          if (res.success) {
            if (Util.isArray(res.data) && res.data.length > 0) {
              this.setState({ data: isPullRefresh ? [].concat(res.data) : this.state.data.concat(res.data), isGetNoticeData: true });
              if (res.data.length >= rows) {
                this._isAllowToPullUpLoad = true;
              }
              // 数据不够 rows 条，不允许上拉加载
              else {
                this._isAllowToPullUpLoad = false;
                this.setState({ hasNoMoreData: true, isLoadingMore: false });
              }
              this.state.page += 1;
              // 如果是下拉刷新才执行的方法(和组件有关)
              isPullRefresh && this._flatListInstance && this._flatListInstance._refreshSuccess instanceof Function && this._flatListInstance._refreshSuccess();
            } else {
              // 没有数据依然允许下拉刷新
              this._isAllowToPullUpLoad = false;
              this.setState({ hasNoMoreData: true, isLoadingMore: false });
              isInitFetch && this.setState({ isGetNoticeData: false });
            }
            // 上拉加载完成，开启下拉刷新
            isPullUpLoad && this._flatListInstance && this._flatListInstance._pullUpFinished(true);
          }
          // 接口请求成功，反回异常数据
          else if (!res.success && res.errorCode === "100001") {
            Util.alert.show({
              content: "你的荷包已在其他设备上登录，如非本人操作，则密码可能已泄露，请重新登录后立即修改登录密码。",
              buttons: [
                {
                  title: "我知道了",
                  callback: () => {
                    backToRoute(this.props.navigation, "BorrowerLogin");
                  }
                }
              ]
            });
          }
        })
        .config({ showLoadingIndicator: isInitFetch });
    }, 3000);
  };

  /** 跳转到转让协议 */
  _goTransfer = item => {
    // NativeModule.RNBridge.jsBridgeOpen(item.noticeUrl);
  };

  _renderItem = ({ item }) => {
    return (
      <CTouchableWithoutFeedback handle={() => this._goTransfer(item)}>
        <View style={styles.itemsWrapper}>
          <Text
            style={{
              fontSize: 16,
              color: HBStyle.color.wblack,
              marginBottom: 19.5
            }}
          >
            {"债权转让通知书"}
          </Text>
          <View style={{ ...HBStyle.layout.rsbc }}>
            <View style={{ ...HBStyle.layout.rsbc }}>
              <Image style={{ width: 24, height: 24, marginRight: 7 }} source={require("../../res_img/borrower/image/news_img_notice.png")} />
              <Text style={{ fontSize: 13, color: HBStyle.color.wgray_main }}>{item.noticeName}</Text>
            </View>
            <View style={{ ...HBStyle.layout.rsbc }}>
              <Text
                style={{
                  fontSize: 13,
                  color: HBStyle.color.wgray_main
                }}
              >
                {Util.formatDate(item.transferDate, "yyyy-m-d HH:MM")}
              </Text>
            </View>
          </View>
        </View>
      </CTouchableWithoutFeedback>
    );
  };

  _keyExtractor = (item, index) => index + "";

  /** 上拉加载 */
  _onEndReached = () => {
    if (this._isAllowToPullUpLoad) {
      this._flatListInstance && this._flatListInstance._pullUpFinished(false); // 禁用下拉加载
      this._getNotice({ isPullUpLoad: true });
    }
  };

  // 阻止上拉加载
  _preventPullUpLoad = bool => {
    this._isAllowToPullUpLoad = bool;
    this.setState({ isLoadingMore: bool }); // 不显示底部组件任何提示文案
  };

  /** 下拉刷新 */
  _refresh = () => {
    this.state.page = 1;
    this._getNotice({ isPullRefresh: true });
  };

  _footerCom = hasMore => {
    return !hasMore ? (
      <View style={[HBStyle.layout.ccc, { height: 40 }]}>
        <Text style={{ fontSize: 13, color: HBStyle.color.wgray_main }}>{"没有更多啦~"}</Text>
      </View>
    ) : (
      <View style={[HBStyle.layout.ccc, { height: 40 }]}>
        <Text style={{ fontSize: 13, color: HBStyle.color.wgray_main }}>{"正在拼命加载中~"}</Text>
      </View>
    );
  };

  render() {
    const { hasNoMoreData, isLoadingMore } = this.state;
    return (
      <View style={styles.container}>
        {!this.state.isGetNoticeData ? (
          <ResultPageNoTitle imgurl={NOData_Icon} textView={() => <Text style={styles.describeFont}>{"还没收到过通知"}</Text>} />
        ) : (
          <PTRScrollList
            getRef={ref => (this._flatListInstance = ref)}
            getInstance={ref => (this._comInstance = ref)}
            refreshData={this._refresh}
            contentContainerStyle={{ paddingHorizontal: 12 }}
            style={styles.flatListStyle}
            keyExtractor={this._keyExtractor}
            data={this.state.data}
            renderItem={this._renderItem}
            onEndReached={this._onEndReached}
            ListFooterComponent={hasNoMoreData ? this._footerCom(false) : isLoadingMore ? this._footerCom(true) : null}
            onEndReachedThreshold={0.01}
            scrollEventThrottle={1}
            showsVerticalScrollIndicator={false}
            preventPullUpLoad={this._preventPullUpLoad}
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: CommonSize.screen.width,
    backgroundColor: HBStyle.color.gray_bg,
    paddingBottom: Util.isIPhoneX() ? 34 : 0
  },
  flatListStyle: {
    flex: 1
  },
  itemsWrapper: {
    paddingHorizontal: 12,
    backgroundColor: HBStyle.color.white_bg,
    borderRadius: 5,
    paddingTop: 15,
    paddingBottom: 13.5,
    marginTop: 12,
    height: 94,
    flex: 1
  },
  describeFont: {
    fontSize: HBStyle.font.Body2,
    color: "#bebebe",
    textAlign: "center"
  }
});
