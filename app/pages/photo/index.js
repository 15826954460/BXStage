/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, CameraRoll, ScrollView, Dimensions, Image,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from "../../styles/layout";
import {Size} from "../../styles/size";

/** 第三方依赖库的引用 */
import Permissions from 'react-native-permissions'; // 判断是否有调用相机或照片权限的第三方库
import ImagePicker from 'react-native-image-picker'; // 访问相册的第三方库
import {NavigationActions} from 'react-navigation';

/** 自定义组建的引用 */
import CNavigation from '../../components/CNavigation';

/** 页面的引入 */

/** 工具类的引用 */
import {bouncedUtils} from '../../utils/bouncedUtils';


/** 常量声明 */
const {width, height} = Dimensions.get('window');//屏幕宽度

export default class PhotoPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: true,
      photoTypeObj: {
        /**
         * a: [{
         *    filename: "IMG_0388.JPG"
              height: 1137
              isStored: true
              playableDuration: 0
              uri: "assets-library://asset/asset.JPG?id=B3435448-CC2B-42D4-A6D8-C78A9CB4F4AD&ext=JPG"
              width: 640
         * }]
         * b: []
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
            CameraRoll.getPhotos({
              first: 10000, // 写这么大的数字，默认取用户所有图片
              assetType: 'Photos',
              groupTypes: 'All'
            }).then(r => {
              r.edges.map((node, index, arr) => {
                if (photoTypeObj[node.node.group_name]) {
                  photoTypeObj[node.node.group_name].push(node.node.image)
                } else {
                  photoTypeObj[node.node.group_name] = []
                  photoTypeObj[node.node.group_name].push(node.node.image)
                }
              })
              this.setState({
                photoTypeObj: photoTypeObj
              })
            }).catch((err) => {
              //Error Loading Images
            });
            /** 调用系统相册 这个适合截图操作 */
            break;
          default:
            this.state.isAuthorized = false
            bouncedUtils.toast.show({
              content: '没有权限', type: 'warning'
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
      return <View style={styles.imgGroupItem} key={index}>
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
                <Text>
                  {'请在设置－隐私－照片”中，允许币下分期访问你的手机相册'}
                </Text>
              </View> : <View style={{flex: 1, width: width}}>
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
    width: width,
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