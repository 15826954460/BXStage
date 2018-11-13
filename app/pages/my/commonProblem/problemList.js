/**
 * Created by hebao on 2017/2/10.
 */

'use strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View, InteractionManager, StyleSheet, Easing, ScrollView,
} from 'react-native';

/** 全局样式的引用 */
import {Size} from '../../../styles/size'
import {Layout} from '../../../styles/layout';
import StorageData from '../../../store/storageData';

/** 第三方依赖库的引用 */
import * as Animatable from 'react-native-animatable';

/** 自定义组件的引用 */
import ListItem from '../../../components/ListItem/ListItem';

/** 共局方法的引用 */
import {bouncedUtils} from '../../../utils/bouncedUtils';

/** 定义一些常量 */
const {width, height, pixel} = Size.screen;
const detailListIn = {
  easing: Easing.ease,
  from: {
    translateY: 10,
    opacity: 0,
  },
  to: {
    translateY: 0,
    opacity: 1,
  },
}

export default class FaqTypeDetail extends Component {
  static propTypes = {
    typeID: PropTypes.number,
  }

  static defaultProps = {
    typeID: 1,
  };

  constructor(props) {
    super(props);
    this.state = {
      TypeDetailList: [],
      TypeDetailListPre: [],
      typeID: props.typeID,
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this._getTypeDetail(this.state.typeID);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.typeID !== this.props.typeID) {
      InteractionManager.runAfterInteractions(() => {
        this._getTypeDetail(nextProps.typeID)
      })
    }
  }

  /** 获取类型 */
  _getProblemType = (typeID) => {
    let _action = new Map([
      [1, 'accountProblem'],
      [2, 'approvalProblem'],
      [3, 'lendingProblem'],
      [4, 'productIntroduce'],
    ])
    return _action.get(typeID)
  }

  /** 获取数据 */
  _getProblemListData(typeID, typeName) {
    let actions = new Map([
      [typeID, () => StorageData.getData(typeName).then(res => {
        if (res) {
          this.setState({TypeDetailList: res || []})
        }
      })],
    ])
    actions.get(typeID)()
  }

  _getTypeDetail = (typeID) => {
    this.state.TypeDetailListPre = this.state.TypeDetailList.slice(0, 10);
    this.setState({TypeDetailList: []})
    this._getProblemListData(typeID, this._getProblemType(typeID))
  }

  _checkDetail = () => {
  }

  render() {
    let {TypeDetailList} = this.state
    return (
      <ScrollView>
        <View style={Styles.wrap}>
          {
            TypeDetailList.map((item, index) => {
              if (item !== undefined) {
                return (
                  <Animatable.View
                    key={'faq_detail_list_' + index}
                    animation={detailListIn}
                    iterationCount={1}
                    useNativeDriver={true}
                    duration={400}
                    delay={40 * index + 400}>
                    <ListItem
                      leftText={item.title}
                      hasAllBottomLine={true}
                      borderAllBottomLineStyle={{
                        left: 12, right: 0
                      }}
                      wrapperStyle={{
                        height: 60,
                        marginTop: 0,
                        backgroundColor: '#fff'
                      }}
                      handle={() => bouncedUtils.noticesBottom.show(item.detail)}
                    />
                  </Animatable.View>
                );
              }
            })
          }
        </View>
      </ScrollView>
    )
  }
}

const Styles = StyleSheet.create({
  wrap: {
    width,
    backgroundColor: Layout.color.white_bg,
    ...Layout.layout.cfsfe
  },
});