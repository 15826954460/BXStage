/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, FlatList, TouchableWithoutFeedback,
} from "react-native";

/** 全局样式的引用 */
import Size from '../../styles/size';
import Layout from "../../styles/layout";

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import CNavigation from '../../components/CNavigation';
import PullRefresh from '../../components/pullRefresh/PullRefresh';

/** 页面的引入 */

/** 工具类的引用 */

/** 常量声明 */

export default class Test extends Component {

  constructor(props) {
    super(props);
    this.isAllowRender = false; // 避免页面初次渲染就执行render
    this.state = {
      initData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      page: 0, // 模拟请求接口的翻页
      data: [0]
    };
  }

  componentDidMount() {
    this.setState({
      data: this.state.initData
    })
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

  _keyExtractor = (item, index) => index + '';

  _splitLine = () => {
    return <View style={{borderBottomWidth: Size.screen.pixel, borderBottomColor: 'red'}}/>
  }

  _renderItem = ({item}) => {
    return <TouchableWithoutFeedback onPress={() => {
    }}>
      <View style={{...Layout.layout.rcc, height: 50, width: Size.screen.width, borderBottomWidth: 1}}>
        <Text>{item}</Text>
      </View>
    </TouchableWithoutFeedback>
  }

  /**
   * 这里关于FlatList的坑，flex: 1, 的时候
   * 如果初次渲染页面的的时候数据不够一满屏，就会多次触发 onEndReached 事件
   * */
  _onEndReached = () => {
    console.log(this.state.page)
    /** 假设总共只有3页数据
     * 通过设置定时器来模拟请求接口
     * */
    if (this.state.page < 3) {
      this.state.page += 1
      let _timer = setTimeout(() => {
        this.setState({
          data: this.state.data.concat(this.state.initData)
        })
        clearTimeout(_timer)
        _timer = null
        if (this.state.page >= 3) {
          this._pullInstance._pullUpLoadingDown(true)
        }
        else {
          this._pullInstance._pullUpLoadingDown(false)
        }
      }, 3000)
    }
    if (this.state.page >= 3) {

    }
  }

  /** 下拉刷新重置数据 */
  _onHeaderRefreshing = () => {
    let _timer = setTimeout(() => {
      this.setState({
        data: this.state.initData
      })
      clearTimeout(_timer)
      _timer = null
      this._pullInstance._fetchDataOk()
    }, 3000)
  }

  render() {
    return (
      <CNavigation
        leftButton={{
          isShowTitle: false,
          isShowIcon: true,
        }}
        isSafeAreaTop={false}
        isPaddingTop={true}
      >
        <PullRefresh
          ref={ref => this._pullInstance = ref}
          style={{borderWidth: 3,}}
          onHeaderRefreshing={this._onHeaderRefreshing}
          scrollComponent={'FlatList'}
          keyExtractor={this._keyExtractor}
          data={this.state.data}
          renderItem={this._renderItem}
          onEndReached={this._onEndReached}
          ItemSeparatorComponent={this._splitLine}
        />
      </CNavigation>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: Size.screen.width,
    height: Size.screen.height,
  }
});