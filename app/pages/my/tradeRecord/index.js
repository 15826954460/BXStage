/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, ScrollView, FlatList,
} from "react-native";

/** 全局样式的引用 */
import Size from "../../../styles/size";
import Layout from "../../../styles/layout";

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import ListItem from '../../../components/ListItem/ListItem';
import CNavigation from '../../../components/CNavigation';

/** 页面的引入 */

/** 工具类的引用 */
import StorageData from '../../../store/storageData';
import Util from '../../../utils/util';

/** 常量声明 */

export default class TradRecord extends Component {

  constructor(props) {
    super(props);
    this._isAllowReached = false;
    this.state = {
      allRecords: [],
      tradeRecode: [],
      index: -1,
      pageIndex: 1,
      pageCount: 5,
    };
  }

  componentDidMount() {
  }

  componentWillMount() {
    let {allRecords, tradeRecode, pageIndex, pageCount} = this.state
    StorageData.getData('tradeRecode').then(res => {
      allRecords = res.records
      if (res) {
        this.setState({tradeRecode: allRecords.slice(0, pageIndex * pageCount)})
      }
    })
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps, nextState) {
  }

  shouldComponentUpdate(nextProps) {
    return true
  }


  _keyExtractor = (item, index) => index + '';

  _footerItem = () => {
    return <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 16}}>
      <Text style={{color: Layout.color.wgray_sub, fontSize: 13,}}>
        {'—— 已加载完所有数据 ——'}
      </Text>
    </View>
  }

  _bottomLine = () => {
    return <View
      style={{borderBottomWidth: Size.screen.pixel, borderBottomColor: Layout.color.gray_line,}}>
    </View>
  }

  _renderItem = (item, index) => {
    return (
      <View>
        <ListItem
          leftText={'还款'}
          leftTextBottom={Util.formatDate(item.tradTime, 'm月d日 HH:MM:ss')}
          rightText={item.tradeType !== 1 ? ` - ${item.amount}` : ` + ${item.amount}`}
          rightTextStyle={{
            color: item.tradeType !== 1 ? Layout.color.wred : Layout.color.wgreen,
          }}
          isShowRightIcon={false}
          hasAllBottomLine={true}
          wrapperStyle={{
            height: 60,
            marginTop: 0,
            backgroundColor: '#fff'
          }}
        />
        <View style={[{height: 70, justifyContent: 'center'}, styles.paddingHorizontal]}>
          <Text style={{color: Layout.color.wgray_main, fontSize: 13, marginBottom: 3}}>
            {'交易编号'}
          </Text>
          <Text style={{color: Layout.color.black, fontSize: 13,}}>
            {item.tradeOrderNo}
          </Text>
        </View>
      </View>
    )
  }

  // 上拉加载待最后统一封装成通用组件
  _onEndReached = () => {

  }

  render() {
    return (
      <CNavigation
        leftButton={{
          isShowTitle: false,
          isShowIcon: true,
        }}
      >
        <ScrollView style={styles.container}>
          <View style={[{
            paddingVertical: 30,
            backgroundColor: Layout.color.white_bg,
            marginBottom: 15
          }, styles.paddingHorizontal]}>
            <Text style={{fontSize: 30}}>{'交易记录'}</Text>
          </View>

          <FlatList
            data={this.state.tradeRecode}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) => this._renderItem(item)}
            ItemSeparatorComponent={this._bottomLine}
            ListFooterComponent={this._footerItem}
            onEndReachedThreshold={0.01}
            onEndReached={this._onEndReached}
          />

        </ScrollView>
      </CNavigation>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Layout.color.light_gray,
  },
  paddingHorizontal: {
    paddingHorizontal: 12,
  }
});