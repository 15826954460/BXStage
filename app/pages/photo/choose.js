/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, FlatList, TouchableWithoutFeedback, Image,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from "../../styles/layout";
import {Size} from "../../styles/size";
/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import CNavigation from '../../components/CNavigation';
import LinearGradient from 'react-native-linear-gradient';

/** 页面的引入 */

/** 工具类的引用 */
import {UserImageList} from '../../store/mobx';
import {bouncedUtils} from "../../utils/bouncedUtils";

/** 常量声明 */
const
  UN_SELECT = require("../../images/feedBack/feedback_img_unselect.png"),
  SELECT = require('../../images/feedBack/feedback_img_selected.png');

const MAX_IMAGE_NUMBER = 4;

export default class ChoosePhoto extends Component {

  constructor(props) {
    super(props);
    this.state = {
      changeNumber: 0,
      data: []
    };
  }

  _addOptions = (arr) => {
    arr.map((item, index) => {
      item.isSelect = false
    })
    this.setState({
      data: arr,
    })
  }

  componentWillMount() {

  }

  componentDidMount() {
    this._addOptions(this.props.navigation.state.params.photoList)
  }


  componentWillUnmount() {
    this.setState({
      changeNumber: 0,
      data: []
    })
  }

  componentWillReceiveProps(nextProps, nextState) {
  }

  shouldComponentUpdate(nextProps) {
    return true
  }

  /** 选择图片 */
  _changeImage = (filename) => {
    this.state.data.map((item, index) => {
      if (item.filename === filename) {
        if (!item.isSelect) {
          if (this.state.changeNumber >= (MAX_IMAGE_NUMBER - UserImageList.data.selectNumber)) {
            bouncedUtils.toast.show({ content: `最多只能选${this.state.changeNumber}张`})
            return
          }
          this.state.changeNumber += 1
        } else {
          this.state.changeNumber -= 1
        }
        item.isSelect = !item.isSelect
      }
    })

    if (this.state.changeNumber <= (MAX_IMAGE_NUMBER - UserImageList.data.selectNumber)) {
      this.setState({
        data: this.state.data,
        changeNumber: this.state.changeNumber
      })
    }
  }

  _keyExtractor = (item, index) => index + '';

  _renderItem = ({item}) => {
    return <TouchableWithoutFeedback
      key={item.filename}
      onPress={() => this._changeImage(item.filename)}
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
    this.state.data.filter((item, index) => {
      return item.isSelect
    }).map((item, index) => {
      UserImageList.data.selectImgList.push({uri: item.uri})
    })
    this.props.navigation.navigate('NoFeedBack')
  }

  render() {
    const {data, changeNumber} = this.state
    return (
      <CNavigation
        leftButton={{
          isShowTitle: false,
          isShowIcon: true,
          handle: () => this.props.navigation.pop()
        }}
        rightButton={{
          isShowTitle: true,
          title: '取消',
          titleStyle: {
            fontSize: 14,
          },
          handle: () => {
            // this.props.navigation.pop()
          },
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
          }}
          keyExtractor={this._keyExtractor}
          data={data}
          removeClippedSubviews={true}
          renderItem={this._renderItem}
          numColumns={4}
          horizontal={false}
        />

        <View style={styles.bottomButton}>

          <Text style={{fontSize: 16, color: changeNumber ? Layout.color.wblack : Layout.color.gray_line}}>{'预览'}</Text>

          {
            changeNumber > 0 ?
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
                    {changeNumber}
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
              </View> : null
          }
        </View>

      </CNavigation>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
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
  flatListStyle: {}
});