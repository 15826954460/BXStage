/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, ScrollView, FlatList,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from "../../../styles/layout";
import {Size} from "../../../styles/size";
/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import CNavigation from '../../../components/CNavigation';
import ListItem from '../../../components/ListItem/ListItem';


/** 页面的引入 */

/** 工具类的引用 */
import StorageData from "../../../store/storageData";
import {Util} from '../../../utils/util';

/** 常量声明 */

export default class MyLoan extends Component {

  constructor(props) {
    super(props);
    this.state = {
      myLoan: {
        records: [],
      },
    };
  }

  componentDidMount() {
  }

  componentWillMount() {
    StorageData.getData('myLoan').then(res => {
      if (res) {
        this.setState({myLoan: res})
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

  _checkStatus = (status) => {
    let actions = new Map([
      ['1', () => '审批中'],
      ['2', () => '已退回'],
      ['3', () => '未通过'],
      ['4', () => '放款中'],
      ['5', () => '待还款'],
      ['6', () => '逾期中'],
      ['7', () => '已结清'],
      ['8', () => '已关单'],
    ])
    return actions.get(status)()
  }

  _renderItem = (item) => {
    return (
      <ListItem
        leftText={Util.toThousands(item.amount)}
        leftTextBottom={Util.formatDate(item.loanTime, 'm月d日 HH:MM:ss')}
        rightText={this._checkStatus(String(item.status))}
        wrapperStyle={{
          height: 60,
          marginTop: 0,
          backgroundColor: '#fff'
        }}
        handle={() => this.props.navigation.navigate('LoanDetail')}
      />
    )
  }

  _bottomLine = () => {
    return <View
      style={{borderBottomWidth: Size.screen.pixel, borderBottomColor: Layout.color.gray_line,}}>
    </View>
  }

  _footerItem = () => {
    return <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 16}}>
      <Text style={{color: Layout.color.wgray_sub, fontSize: 13,}}>{'—— 已加载完所有数据 ——'}</Text>
    </View>
  }

  _keyExtractor = (item, index) => index + '';

  render() {
    const {myLoan} = this.state
    return (
      <CNavigation
        leftButton={{
          isShowTitle: false,
          isShowIcon: true,
        }}
      >
        <ScrollView style={styles.container}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
        >
          <View style={styles.top}>
            <Text style={{fontSize: 30, marginBottom: 5}}>
              {'我的借款'}
            </Text>
            <Text style={{fontSize: 14, color: Layout.color.wgray_bar}}>
              {`累计借款${myLoan.loanTimes}次，共${Util.toThousands(myLoan.loanAmount)}元`}
            </Text>
          </View>

          <FlatList
            data={myLoan.records}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) => this._renderItem(item)}
            ItemSeparatorComponent={this._bottomLine}
            ListFooterComponent={this._footerItem}
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
  top: {
    backgroundColor: Layout.color.white_bg,
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 14,
    marginBottom: 15,
  },
});