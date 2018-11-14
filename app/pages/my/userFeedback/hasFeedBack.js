/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, ScrollView, Image, Dimensions, FlatList, Modal,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from "../../../styles/layout";

/** 第三方依赖库的引用 */
import ImageViewer from 'react-native-image-zoom-viewer';
// import {ImageCache} from "react-native-img-cache";

/** 自定义组建的引用 */
import CNavigation from '../../../components/CNavigation';
import CGradientButton from '../../../components/CGradientButton';

/** 页面的引入 */
import FeedBackCell from './feedBackCell'

/** 工具类的引用 */
import {Util} from '../../../utils/util';

/** 常量声明 */
const {width, height} = Dimensions.get('window');//屏幕宽度

export default class HasFeedBack extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      imgList: [], // 图片列表
      ChooseIndex: 0 //当前图片的下标
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

  _toggleModal = (imgList, index) => {
    this.setState({
      imgList: imgList,
      isModalVisible: !this.state.isModalVisible,
      ChooseIndex: index
    })
  }

  render() {
    let {isModalVisible, imgList} = this.state;
    return (
      <CNavigation
        leftButton={{
          isShowTitle: false,
          isShowIcon: true,
        }}
        centerTitle={{
          title: '用户反馈',
          titleStyle: {
            color: Layout.layout.wblack,
            fontSize: 18,
            fontWeight: 'bold',
          }
        }}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={{paddingTop: 15}}
          showsVerticalScrollIndicator={false}
        >
          <FeedBackCell toggleModal={this._toggleModal}/>

          <Modal visible={isModalVisible}
                 transparent={true}
                 onRequestClose={() => this.setState({isModalVisible: false})}
                 animationType={'fade'}
                 hardwareAccelerated={true}
          >
            <ImageViewer imageUrls={imgList}
                         showsButtons={false}
                         index={this.state.ChooseIndex}
                         onClick={(onCancel) => {
                           onCancel()
                           this.setState({isModalVisible: false})
                         }}
                         renderIndicator={() => {
                           null
                         }}
                         enableImageZoom={true}
                         onChange={(index) => this.setState({ChooseIndex: index})}
            />

            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: Util.isIPhoneX() ? 54 : 20,
              width: width,
              flexDirection: 'row'
            }}>
              {
                imgList instanceof Array && imgList.map((item, index) => {
                  if (index === this.state.ChooseIndex) {
                    return <View key={index} style={[styles.smellArc, {opacity: 1}]}/>
                  } else {
                    return <View key={index} style={[styles.smellArc, {opacity: 0.4}]}/>
                  }
                })
              }
            </View>

          </Modal>

        </ScrollView>

        <View style={styles.btnWrapper}>
          <CGradientButton
            gradientType={'btn_m'}
            contentText={'写反馈'}
            contentTextStyle={{
              color: Layout.color.white_bg,
              fontSize: 15,
              fontFamily: "PingFangSC-Regular",
              textAlign: "center"
            }}
            onPress={() => this.props.navigation.navigate('NoFeedBack')}
          />
        </View>

      </CNavigation>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Layout.color.light_gray,
  },
  smellArc: {
    width: 8,
    height: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
    marginLeft: 10
  },
  btnWrapper: {
    width: width,
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});