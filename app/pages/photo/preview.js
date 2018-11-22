/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, Modal, Image, Dimensions, TouchableWithoutFeedback, StatusBar,
} from "react-native";

/** 第三方依赖库的引用 */
import {SafeAreaView} from 'react-navigation';
import {observer} from 'mobx-react';

/** 自定义组建的引用 */
import ImageViewer from 'react-native-image-zoom-viewer';
import LinearGradient from 'react-native-linear-gradient';

/** 工具类的引用 */
import {ImageData} from './mobx/mobx';
import {Layout} from "../../styles/layout";
import {Util} from "../../utils/util";

/** 常量声明 */
const {width, height} = Dimensions.get('window');//屏幕宽度
const
  UN_SELECT = require("../../images/feedBack/feedback_img_unselect.png"),
  SELECT = require('../../images/feedBack/feedback_img_selected.png'),
  LEFT_ICON_BLACK = require('../../images/common/navig_img_back_white.png');

@observer
export default class PreView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ChooseIndex: 0,
      isModalVisible: false,
      imgList: [],
      selectNumber: 0,
    };
  }

  componentDidMount() {
    StatusBar.setHidden(true, true) // 显示动画的时候隐藏状态栏
    ImageData.preViewPhotoList.slice().map((item, index) => {
      if (item.isSelect) {
        this.state.selectNumber += 1
      }
      this.state.imgList.push({url: item.uri, isSelect: item.isSelect})
    })
    this.setState({
      imgList: this.state.imgList,
      selectNumber: this.state.selectNumber,
      isModalVisible: true,
    })
  }

  componentWillMount() {
  }

  componentWillUnmount() {
    StatusBar.setHidden(false, true) // 显示状态栏
  }

  componentWillReceiveProps(nextProps, nextState) {
  }

  shouldComponentUpdate(nextProps) {
    return true
  }

  /** 确认选择 */
  _sureSelect = () => {
    let _newSelectImgList = []
    this.state.imgList.map((item, index) => {
      if (item.isSelect) {
        _newSelectImgList.push({uri: item.url, isSelect: item.isSelect})
      }
    })
    ImageData.updateSelectImgList(ImageData.selectImgList.concat(_newSelectImgList))
    ImageData.resetSelectNumber()
    this.props.navigation.navigate('NoFeedBack')
  }

  /** 筛选图片 */
  _selectImg = (i) => {
    this.state.imgList.map((item, index) => {
      if (i === index) {
        if (item.isSelect) {
          this.state.selectNumber -= 1
        } else {
          ImageData.updateSelectNumber(1)
        }
        item.isSelect = !item.isSelect
      }
    })


    this.setState({
      imgList: this.state.imgList,
      selectNumber: this.state.selectNumber,
    })
  }

  /** 返回上一页 */
  _goBack = () => {
    let _length = 0;
    /** 针对整个相册列表进行部分属性的更改 */
    ImageData.photoImgList.map((items) => {
      if (items.isSelect) {
        let _items = items
        this.state.imgList.map((item) => {
          if (_items.uri === item.url) {
            _items.isSelect = item.isSelect
          }
        })
      }
    })
    this.state.imgList.map((item) => {
      if (item.isSelect) {
        _length += 1
      }
    })

    /** 这里的赋值，因为数组的长度没有改变mobx不会进行刷新，所以通过下面 number 修改来导致页面的刷新 */
    ImageData.updatePhotoImgList(ImageData.photoImgList)
    ImageData.resetSelectNumber(_length)
    this.props.navigation.pop()
  }

  render() {
    let {imgList, ChooseIndex, isModalVisible, selectNumber} = this.state;
    return (
      <SafeAreaView
        style={{flex: 1}}
        forceInset={{top: 'never', bottom: 'never'}}
      >
        <Modal visible={isModalVisible}
               transparent={true}
               animationType={'fade'}
               hardwareAccelerated={true}
               onRequestClose={() => {
               }}
        >
          <ImageViewer imageUrls={imgList}
                       showsButtons={false}
                       index={this.state.ChooseIndex}
                       renderIndicator={() => null}
                       enableImageZoom={true}
                       onChange={(index) => this.setState({ChooseIndex: index})}
          />

          <View style={styles.topNav}>


            <TouchableWithoutFeedback
              onPress={this._goBack}
            >
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 44,
                height: 44,
              }}>
                <Image source={LEFT_ICON_BLACK}
                       style={{width: 23, height: 23,}}/>
              </View>
            </TouchableWithoutFeedback>

            {
              imgList.map((item, index) => {
                if (ChooseIndex === index) {
                  return <TouchableWithoutFeedback
                    key={index}
                    onPress={() => this._selectImg(index)}
                  >
                    <View style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 44,
                      height: 44,
                    }}>
                      <Image source={item.isSelect ? SELECT : UN_SELECT}
                             style={{width: 22, height: 22}}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                }
              })
            }

          </View>

          <View style={styles.bottomNav}>
            <View style={[{...Layout.layout.rsbc}]}>
              <LinearGradient
                start={{x: 0.0, y: 0.0}}
                end={{x: 1.0, y: 0.0}}
                colors={['#FF3736', '#FFC50A']}
                style={{
                  width: 22, height: 22, borderRadius: 11,
                  alignItems: 'center', justifyContent: 'center'
                }}
              >
                <Text style={{fontSize: 16, color: Layout.color.white_bg, alignSelf: 'center'}}>
                  {selectNumber}
                </Text>
              </LinearGradient>


              <TouchableWithoutFeedback onPress={this._sureSelect}>
                <View>
                  <Text style={{
                    fontSize: 16,
                    marginLeft: 6,
                    color: Layout.color.worange,
                  }}>
                    {'完成'}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>

        </Modal>

      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
  },
  topNav: {
    position: 'absolute',
    top: 0,
    width: width,
    height: Util.isIPhoneX() ? 88 : 64,
    paddingTop: Util.isIPhoneX() ? 44 : 20,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,.5)',
    ...Layout.layout.rsbc,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: Util.isIPhoneX() ? 84 : 50,
    paddingBottom: Util.isIPhoneX() ? 34 : 0,
    backgroundColor: 'rgba(0,0,0,.5)',
    paddingHorizontal: 12,
    ...Layout.layout.rfec,
  }
});