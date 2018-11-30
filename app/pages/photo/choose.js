/** react 组建的引用 */
import React, {Component, PureComponent} from "react";
import {
  StyleSheet, Text, View, FlatList, TouchableWithoutFeedback, Image, StatusBar,
} from "react-native";

/** 全局样式的引用 */
import Layout from "../../styles/layout";
import Size from "../../styles/size";

/** 第三方依赖库的引用 */
import {observer} from 'mobx-react';

/** 自定义组建的引用 */
import CNavigation from '../../components/CNavigation';
import LinearGradient from 'react-native-linear-gradient';

/** 页面的引入 */

/** 工具类的引用 */
import {ImageData} from './mobx/mobx';
import bouncedUtils from "../../utils/bouncedUtils";
import Util from "../../utils/util";

/** 常量声明 */
const
  UN_SELECT = require("../../images/feedBack/feedback_img_unselect.png"),
  SELECT = require('../../images/feedBack/feedback_img_selected.png');

const MAX_IMAGE_NUMBER = 4;

@observer
export default class ChoosePhoto extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  /** 选择图片 */
  _changeImage = (uri) => {
    /** 针对每一次选择对图片类表属性做相应的改变 */
    ImageData.photoImgList.map((item, index) => {
      if (item.uri === uri) {
        if (!item.isSelect) {
          if (ImageData.selectNumber >= MAX_IMAGE_NUMBER - ImageData.selectImgList.length) {
            bouncedUtils.toast.show({content: `最多只能选${MAX_IMAGE_NUMBER - ImageData.selectImgList.length}张`})
            return
          }
          ImageData.updateSelectNumber(1)
        } else {
          ImageData.updateSelectNumber(-1)
        }
        item.isSelect = !item.isSelect
      }
    })

    /** 重新赋值 */
    if (ImageData.selectNumber <= MAX_IMAGE_NUMBER - ImageData.selectImgList.length) {
      ImageData.updatePhotoImgList(ImageData.photoImgList)
    }
  }

  _keyExtractor = (item, index) => index + '';

  _renderItem = ({item}) => {
    return <TouchableWithoutFeedback
      key={item.filename + item.uri}
      onPress={() => this._changeImage(item.uri)}
    >
      <View
        style={{
          width: (Size.screen.width - 3) / 4,
          height: (Size.screen.width - 3) / 4,
          marginRight: 1,
          position: 'relative',
          marginBottom: 1
        }}>
        <Image
          resizeMode={'stretch'}
          style={{width: '100%', height: '100%'}}
          source={{uri: item.uri}}/>
        <Image style={{width: 22, height: 22, position: 'absolute', right: 6, top: 6,}}
               source={item.isSelect ? SELECT : UN_SELECT}
        />
      </View>
    </TouchableWithoutFeedback>
  }

  /** 确认图片选择 */
  _sureSelect = () => {
    let _newSelectImgList = ImageData.photoImgList.filter((item, index) => {
      return item.isSelect
    })
    ImageData.updateSelectImgList(ImageData.selectImgList.concat(_newSelectImgList))
    ImageData.resetSelectNumber()
    this.props.navigation.navigate('NoFeedBack')
  }

  /** 预览 */
  _preView = () => {
    let _newSelectImgList = ImageData.photoImgList.filter((item, index) => {
      return item.isSelect
    })
    ImageData.updatePreViewPhotoList(_newSelectImgList)
    this.props.navigation.navigate('PreView')
  }

  /** 取消选择 */
  _giveUpSelect = () => {
    ImageData.photoImgList.map((item, index) => {
      item.isSelect = false
    })
    ImageData.resetSelectNumber()
    ImageData.updatePhotoImgList(ImageData.photoImgList)
    this.props.navigation.pop()
  }

  render() {
    return (
      <CNavigation
        leftButton={{
          isShowTitle: false,
          isShowIcon: true,
          handle: this._giveUpSelect,
        }}
        rightButton={{
          isShowTitle: true,
          title: '取消',
          titleStyle: {
            fontSize: 14,
          },
          handle: this._giveUpSelect,
        }}
        centerTitle={{
          title: '相册',
          titleStyle: {
            color: Layout.color.wblack,
            fontSize: 18,
            fontWeight: 'bold',
          }
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 50,
            backgroundColor: Layout.color.white_bg,
            width: Size.screen.width,
            paddingTop: Util.isAndroid() ? StatusBar.currentHeight : 0,
          }}
          getItemLayout={(data, index) => (
            {length: (Size.screen.width - 3) / 4, offset: (Size.screen.width - 3) / 4 * index, index}
          )}
          initialNumToRender={30}
          keyExtractor={this._keyExtractor}
          data={ImageData.photoImgList.slice()}
          removeClippedSubviews={true}
          renderItem={this._renderItem}
          numColumns={4}
          horizontal={false}
        />

        <View style={styles.bottomButton}>

          <Text onPress={this._preView}
                style={{fontSize: 16, color: ImageData.selectNumber ? Layout.color.wblack : Layout.color.gray_line}}
          >{'预览'}</Text>

          {
            ImageData.selectNumber > 0 ?
              <View style={{...Layout.layout.rsbc}}>
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
                    {ImageData.selectNumber}
                  </Text>
                </LinearGradient>


                <TouchableWithoutFeedback
                  onPress={this._sureSelect}>
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
              </View> : null
          }
        </View>

      </CNavigation>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomButton: {
    width: Size.screen.width,
    position: 'absolute',
    bottom: 0,
    zIndex: 1000,
    height: 50,
    paddingHorizontal: 12,
    backgroundColor: Layout.color.white_bg,
    ...Layout.layout.rsbc,
  },
});