/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, ScrollView, ImageBackground, Image,Dimensions,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from "../../../styles/layout";

/** 第三方依赖库的引用 */
import * as Animatable from 'react-native-animatable';

/** 自定义组建的引用 */
import CTouchableWithoutFeedback from '../../../components/CTouchableWithoutFeedback';

/** 页面的引入 */

/** 工具类的引用 */
import {Util} from '../../../utils/util';
import {easeOutQuart, LinearOutSlowInInterpolator} from '../../../utils/curve';

/** 常量声明 */
const
  PROPLEM_TYPE_LIST = [
    {
      imgUrl: [
        require('../../../images/faq/faq_img_account.png'),
        require('../../../images/faq/faq_img_account_down.png')
      ],
      name: '账号问题',
      type: 1
    },
    {
      imgUrl: [
        require('../../../images/faq/faq_img_approval.png'),
        require('../../../images/faq/faq_img_approval_down.png')
      ],
      name: '审批问题',
      type: 2
    },
    {
      imgUrl: [
        require('../../../images/faq/faq_img_coin.png'),
        require('.../../../images/faq/faq_img_coin_down.png')
      ],
      name: '放款还款',
      type: 3
    },
    {
      imgUrl: [
        require('../../../images/faq/faq_img_product.png'),
        require('../../../images/faq/faq_img_product_down.png')
      ],
      name: '产品介绍',
      type: 4
    }
  ],
  IMAGE_BACKGROUND = require('../../../images/faq/faq_img_card_shadow.png');
const {width, height} = Dimensions.get('window');

const curveAni = Util.isAndroid() ? easeOutQuart : LinearOutSlowInInterpolator;

Animatable.initializeRegistryWithDefinitions({
  faq_select_ani: {  //墙裂参考animate.css
    easing: curveAni(),  //定义动画的展现方式，使用的二次贝茨曲线就是参考animate.css得来
    0: {
      scale: 1,
    },
    0.5: {
      scale: 0.96
    },
    1: {
      scale: 1,
    }
  },
});

const slideIn = {
  easing: 'ease-in',
  from: {
    translateX: -340,
  },
  to: {
    translateX: 0,
  },
}

export default class ProblemList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      defaultType: 1,
    };
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

  _selectType = (type, rowID) => {
    this.setState({
      defaultType: type,
    })
    if (rowID === 0) {
      //滚动到最顶部
      this._typeListScroll.scrollTo({x: 0, y: 0, animated: true})
    }
    else if (!isNaN(rowID)) {
      if (rowID === PROPLEM_TYPE_LIST.length - 1) {
        //滚动到最底部
        const scrollX = this._contentWidth - width;
        scrollX > 0 ? this._typeListScroll.scrollTo({x: scrollX, y: 0, animated: true}) : null;
      }
      else {
        //滚动到中间
        let maxScrollX = this._contentWidth - width;
        let scrollX = rowID * (100 + 10) + Layout.gap.gap_edge
        scrollX = scrollX > maxScrollX ? maxScrollX : scrollX

        this._typeListScroll.scrollTo({
          x: scrollX,
          y: 0,
          animated: true
        })
      }
    }
    this.refs['faq_type_list_' + type].faq_select_ani(480).then((endState) => {
      if (endState.finished) {
        /** 动画结束之后再走列表动画 */
        // WebAPI.FAQ.AddFAQTypeViewCount(rowData.ID, () => null);
      }
    });
  }

  _problemList = () => {
    let _problemList = PROPLEM_TYPE_LIST.map((item, index, arr) => {
      return (
        <Animatable.View
          ref={'faq_type_list_' + item.type}
          key={item.type + ''}
          animation={slideIn}
          iterationCount={1}
          useNativeDriver={true}
          duration={400}
          delay={40 * (PROPLEM_TYPE_LIST.length - 1 - index)}
        >
            <ImageBackground
              resizeMode={'contain'}
              source={IMAGE_BACKGROUND}
              fadeDuration={0}
              style={styles.typeWrapper}>
              <CTouchableWithoutFeedback
                handle={() => this._selectType(item.type, index)}
              >
              <View style={{
                width: 100,
                height: 80,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 13,
                backgroundColor: Layout.color.white_bg,
              }}>

                <Image style={{marginBottom: 7}}
                       fadeDuration={0}
                       resizeMode={'contain'}
                       source={this.state.defaultType === item.type ? item.imgUrl[1] : item.imgUrl[0]}/>
                <Text style={{fontSize: 13, color: Layout.color.black}}>{item.name}</Text>
              </View>
              </CTouchableWithoutFeedback>
            </ImageBackground>

        </Animatable.View>
      )
    })
    return _problemList
  }

  render() {
    return (
      <ScrollView
        ref={ref => this._typeListScroll = ref}
        style={styles.problemTypeContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(w, h) => this._contentWidth = w}
      >
        {this._problemList()}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  problemTypeContainer: {
    width: width,
  },
  typeWrapper: {
    width: 120,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
  }
});