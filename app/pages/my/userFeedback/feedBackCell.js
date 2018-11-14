/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, Dimensions, Image, TouchableWithoutFeedback,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from "../../../styles/layout";
/** 第三方依赖库的引用 */
import ReadMore from 'react-native-read-more-text';
// import {CachedImage,ImageCache} from "react-native-img-cache";

/** 自定义组建的引用 */

/** 页面的引入 */

/** 工具类的引用 */

/** 常量声明 */
const {width, height} = Dimensions.get('window');//屏幕宽度
const ImgList = [
  // {url: require('../../../images/common/test_one.png')},
  // {url: require('../../../images/common/test_two.jpg')},
  // {url: require('../../../images/common/test_three.jpg')},
  // {url: require('../../../images/common/test_four.jpg')},
  {url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542175379691&di=73f04d1280a3c6103cbce95cf442dac7&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fa1ec08fa513d2697859a76665efbb2fb4316d844.jpg'},
  {url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542175444576&di=95338fb1962fd14487a18a7cc6ff05e1&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F4a36acaf2edda3cc0975750d0ae93901213f920e.jpg'},
  {url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542175471083&di=e37a19084f4c4003a657b32ae5591ee6&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20161024%2F4a685feaae2a497b85561c1f433b1a3f_th.jpeg'},
  {url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542175495762&di=b91560fd530b443590c8024b6c9a8ef6&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F1f178a82b9014a906ffc1386a2773912b21beecf.jpg'},
]

export default class FeedBackCell extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModuleVisible: false,
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
    return false
  }

  _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={styles.extendFont} onPress={handlePress}>
        {'展开'}
      </Text>
    );
  }

  _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={styles.extendFont} onPress={handlePress}>
        {'收起'}
      </Text>
    );
  }

  render() {
    return (
      <View style={styles.wrapper}>

        <View style={styles.timeWrapper}>
          <Text style={{fontSize: 30, color: Layout.color.wblack, fontWeight: 'bold'}}>{'22'}</Text>
          <Text style={{
            fontSize: 15,
            color: Layout.color.wblack,
            fontWeight: 'bold',
            alignItems: 'flex-end',
            bottom: 3,
          }}>{'日'}</Text>
          <Image
            style={{marginHorizontal: 3, bottom: 4}}
            source={require('../../../images/feedBack/feedback_img_datadash.png')}/>
          <Text style={{color: Layout.color.wgray_main, fontSize: 15, alignItems: 'flex-end', bottom: 1}}>
            {'5月'}
          </Text>
        </View>

        <View style={styles.textAreaWrap}>
          <ReadMore
            numberOfLines={4}
            renderTruncatedFooter={this._renderTruncatedFooter}
            renderRevealedFooter={this._renderRevealedFooter}>
            <Text style={styles.feedbackContent}>
              {'一天了，为什么还不理我啊，到底行不行啊，再不理我就要逾期了，逾期的钱不会算我的吧？赶紧给个答复啊，快快快！还有能不能把我的借款额度提高一点，我可是你们的忠实用户啊，提高为什么还不理我啊，到底行不行啊，再不理我就要逾期了，逾期的钱不会算我的吧？赶紧给个答复啊，快快快！还有能不能把我的借款额度提高一点。'}
            </Text>
          </ReadMore>
        </View>

        <View style={[styles.imgWrapper]}>
          {
            ImgList.map((item, index) => {
              return <View
                key={index + Math.random() * 10000 + ''}
                style={{width: 109, height: 109, marginRight: ((index + 1) % 3 === 0) ? 0 : 12, marginBottom: 12}}
              >
                <TouchableWithoutFeedback onPress={() => {
                  this.props.toggleModal instanceof Function && this.props.toggleModal(ImgList, index)
                }}>
                  <Image
                    resizeMode={'stretch'}
                    style={{width: '100%', height: '100%'}}
                    source={{uri: item.url}}
                  />
                </TouchableWithoutFeedback>

              </View>
            })
          }
        </View>

        <View style={styles.replyFeedBack}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
            <Image source={require('../../../images/feedBack/feedbakc_img_bixiakefu.png')}/>
            <Text style={{fontSize: 15, fontWeight: 'bold', marginLeft: 6,}}>{'币下客服'}</Text>
          </View>
          <Text style={{fontSize: 14, lineHeight: 21}}>
            {'感谢反馈，我们将继续优化功能，为您带来更好的体验，感谢您的支持，祝您生活愉快。'}
          </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Layout.color.white_bg,
    paddingHorizontal: 12,
    paddingTop: 14,
    paddingBottom: 20,
  },
  timeWrapper: {
    height: 36,
    ...Layout.layout.rfsfe,
  },
  feedbackContent: {
    fontSize: 15,
    lineHeight: 23,
    color: Layout.color.wblack,
    marginBottom: 12,
    marginTop: 15,
  },
  imgWrapper: {
    width: width - 24,
    marginBottom: 20,
    flexWrap: 'wrap',
    ...Layout.layout.rfsc,
  },
  replyFeedBack: {
    padding: 12,
    backgroundColor: '#FFFBF0',
  },
  textAreaWrap: {
    paddingBottom: 12,
    paddingTop: 15,
  },
  extendFont: {
    color: Layout.color.worange,
    fontSize: Layout.font.Subtle2,
    lineHeight: 20,
    marginTop: 3,
    textAlign: 'right',
  },
});