/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, FlatList, Image,ScrollView,
} from "react-native";

/** 全局样式的引用 */
import Layout from "../../../styles/layout";
import Size from "../../../styles/size";
/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import withCNavigation from '../../../components/HOC/HOCCNavigation';
import withOnScroll from '../../../components/HOC/HOCOnscroll';

/** 页面的引入 */

/** 工具类的引用 */

/** 常量声明 */
const WithScrollView = withOnScroll(FlatList)

@withCNavigation
export default class Notice extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasNotice: true,
      data: [1, 2, 3, 4, 5]
    };
    this.navConfig = {
      centerTitle: {
        title: '通知',
      },
      commonBackgroundColor: Layout.color.gray_bg,
      navStyle: {
        navBackgroundColor: Layout.color.gray_bg,
        borderBottomColor: Layout.color.gray_bg,
      },
    }
  }

  componentDidMount() {
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps, nextState) {
  }

  shouldComponentUpdate(nextProps) {
    return true
  }

  _renderItem = ({item}) => {
    return <View style={styles.itemsWrapper}>
      <Text style={{
        fontSize: 16,
        color: Layout.color.wblack,
        fontFamily: 'PingFangSC-Regular',
        marginBottom: 19.5
      }}>{'债权转让通知书'}</Text>
      <View style={[Layout.layout.rsbc]}>
        <View style={{...Layout.layout.rsbc}}>
          <Image style={{width: 24, height: 24, marginRight: 7}}
                 source={require('../image/news_img_notice.png')}
          />
          <Text style={{fontSize: 13, color: Layout.color.wgray_main}}>{'荷包'}</Text>
        </View>
        <View style={{...Layout.layout.rsbc}}>
          <Text style={{fontSize: 13, color: Layout.color.wgray_main}}>{'2018-01-01  22:56'}</Text>
        </View>
      </View>
    </View>
  }

  _keyExtractor = (item, index) => index + ''

  _onEndReached = () => {

  }

  _footerCom = () => {
    return <View style={[Layout.layout.ccc, {height: 40}]}>
      <Text style={{fontSize: 13, color: Layout.color.wgray_main}}>{'没有更多啦~'}</Text>
    </View>
  }

  render() {
    return (
      <View style={styles.container}>
        {
          !this.state.hasNotice ? <Empty/> : <WithScrollView
            ref={ref => this._pullInstance = ref}
            contentContainerStyle={{paddingHorizontal: 12}}
            style={styles.flatListStyle}
            keyExtractor={this._keyExtractor}
            data={this.state.data}
            renderItem={this._renderItem}
            onEndReached={this._onEndReached}
            ListFooterComponent={this._footerCom}
            onEndReachedThreshold={0.01}
            scrollEventThrottle={16}
          />
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Size.screen.width,
  },
  flatListStyle: {
    flex: 1,
  },
  itemsWrapper: {
    paddingHorizontal: 12,
    backgroundColor: Layout.color.white_bg,
    borderRadius: 5,
    paddingTop: 15,
    paddingBottom: 13.5,
    marginTop: 12,
    height: 94,
  }
});