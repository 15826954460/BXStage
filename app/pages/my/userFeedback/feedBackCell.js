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
import StorageData from '../../../store/storageData';
import {Util} from '../../../utils/util';

/** 常量声明 */
const {width, height} = Dimensions.get('window');//屏幕宽度

export default class FeedBackCell extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageList: []
    };
  }

  componentDidMount() {
  }

  componentWillMount() {
    StorageData.getData('userFeedBack').then(res => {
      if (res) {
        this.setState({imageList: res})
      }
    })
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps, nextState) {
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 返回false，避免父组件render的时候导致子组件的render
    console.log(1111, nextState.imageList !== this.state.imageList, )
    if (nextState.imageList !== this.state.imageList) {
      return true
    }
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
      this.state.imageList.map((items, index) => {
        return <View
          key={index + ""}
          style={styles.wrapper}>

          <View style={styles.timeWrapper}>
            <Text style={{fontSize: 30, color: Layout.color.wblack, fontWeight: 'bold'}}>{Util.formatDate(items.createTime, 'd')}</Text>
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
              {Util.formatDate(items.createTime, 'm月')}
            </Text>
          </View>

          <View style={styles.textAreaWrap}>
            <ReadMore
              numberOfLines={4}
              renderTruncatedFooter={this._renderTruncatedFooter}
              renderRevealedFooter={this._renderRevealedFooter}>
              <Text style={styles.feedbackContent}>
                {items.feedbackContent}
              </Text>
            </ReadMore>
          </View>

          <View style={[styles.imgWrapper]}>
            {
              items.feedbackImgs.map((item, index) => {
                return <View
                  key={index + Math.random() * 10000 + ''}
                  style={{width: 109, height: 109, marginRight: ((index + 1) % 3 === 0 && width === 375) ? 0 : 12, marginBottom: 12}}
                >
                  <TouchableWithoutFeedback onPress={() => {
                    this.props.toggleModal instanceof Function && this.props.toggleModal(items.feedbackImgs, index)
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

          {
            items.revert ? <View style={styles.replyFeedBack}>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                <Image source={require('../../../images/feedBack/feedbakc_img_bixiakefu.png')}/>
                <Text style={{fontSize: 15, fontWeight: 'bold', marginLeft: 6,}}>{'币下客服'}</Text>
              </View>
              <Text style={{fontSize: 14, lineHeight: 21}}>
                {items.reply}
              </Text>
            </View> : null
          }

        </View>
      })
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