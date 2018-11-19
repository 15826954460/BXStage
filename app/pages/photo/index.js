/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, CameraRoll, ScrollView, Image, TouchableWithoutFeedback,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from "../../styles/layout";
import {Size} from "../../styles/size";

/** 第三方依赖库的引用 */
import Permissions from 'react-native-permissions'; // 判断是否有调用相机或照片权限的第三方库

/** 自定义组建的引用 */
import CNavigation from '../../components/CNavigation';

/** 工具类的引用 */
import {bouncedUtils} from '../../utils/bouncedUtils';
import {ImageData} from './mobx/mobx';

/** 常量声明 */

export default class PhotoPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: true,
      photoTypeObj: {
        /** 内部数据结构如下格式
         * a: [{},{}]
         * b: [{},{}]
         * */
      },
    }
  }

  componentDidMount() {
  }

  componentWillMount() {
    const {photoTypeObj} = this.state
    /** 检测权限 */
    Permissions.request('photo').then(res => {
        switch (res) {
          case 'authorized':
            /** 显示lottie动画 */
            let loadingInstance = '';
            let _startLoad = setTimeout(() => {
              loadingInstance = bouncedUtils.loading.show
              loadingInstance()
              _startLoad = null
            }, 1000)

            /** 待优化 */
            CameraRoll.getPhotos({
              first: 10, // 暂定只取600张
              assetType: 'Photos', // 获取类型
              groupTypes: 'All' // 获取所有
            }).then(r => {
              r.edges.map((node, index, arr) => {
                console.log(node)
                if (photoTypeObj[node.node.group_name]) {
                  photoTypeObj[node.node.group_name].push(node.node.image)
                } else {
                  photoTypeObj[node.node.group_name] = []
                  photoTypeObj[node.node.group_name].push(node.node.image)
                }
              })
              /** 隐藏lottie动画 */
              clearTimeout(_startLoad)
              loadingInstance instanceof Function && bouncedUtils.loading.hide()
              this.setState({
                photoTypeObj: photoTypeObj
              })
            }).catch((err) => {
              bouncedUtils.toast.show({
                content: '出现异常\n请稍后再试'
              })
            });
            /** 调用系统相册 这个适合截图操作 */
            break;
          default:
            this.state.isAuthorized = false
            bouncedUtils.toast.show({
              content: '没有权限'
            })
        }
      }
    )
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps, nextState) {
  }

  shouldComponentUpdate(nextProps) {
    return true
  }

  _imgGroupItem = () => {
    const {photoTypeObj} = this.state
    return Object.keys(photoTypeObj).map((item, index) => {
      return <TouchableWithoutFeedback
        key={index}
        onPress={() => {
          photoTypeObj[item].map((item, index) => {
            return item.isSelect = false
          })
          ImageData.updatePhotoImgList(photoTypeObj[item])
          this.props.navigation.navigate('ChoosePhoto')
        }}
      >
        <View style={styles.imgGroupItem}>
          <Image source={{uri: photoTypeObj[item][0].uri}} style={styles.leftImage}/>
          <View style={styles.rightWrapper}>
            <Text style={{fontSize: 16, color: Layout.color.wblack}}>
              {item}
              <Text style={{fontSize: 16, color: Layout.color.wgray_main}}>
                {`（${photoTypeObj[item].length}）`}
              </Text>
            </Text>
            <Image source={require('../../images/common/common_img_arrow.png')}/>
          </View>
        </View>
      </TouchableWithoutFeedback>
    })
  }

  render() {
    const {isAuthorized, photoTypeObj} = this.state
    return (
      <CNavigation
        rightButton={{
          isShowTitle: true,
          title: '取消',
          titleStyle: {
            fontSize: 14,
          },
          handle: () => {
            this.props.navigation.pop()
          },
        }}
        centerTitle={{
          title: '照片',
          titleStyle: {
            color: Layout.color.wblack,
            fontSize: 18,
            fontWeight: 'bold',
          }
        }}
      >
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {
            !isAuthorized ? <View style={{flex: 1, ...Layout.layout.ccc}}>
              <Text style={{color: Layout.color.gray_line}}>
                {'请在设置－隐私－照片”中，允许币下分期访问你的手机相册'}
              </Text>
            </View> : <View style={{flex: 1, width: Size.screen.width}}>
              {
                Object.keys(photoTypeObj).length > 0 && this._imgGroupItem()
              }
            </View>
          }

        </ScrollView>
      </CNavigation>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Size.screen.width,
  },
  imgGroupItem: {
    ...Layout.layout.rsbc,
    borderBottomColor: Layout.color.gray_line,
    borderBottomWidth: Size.screen.pixel,
  },
  leftImage: {width: 93, height: 93},
  rightWrapper: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    flex: 1, paddingLeft: 15, paddingRight: 12
  },
});