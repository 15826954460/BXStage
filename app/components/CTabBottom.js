/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, ImageBackground, Text, View, Dimensions, TouchableOpacity,
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */
import {withNavigation, NavigationActions, StackActions} from 'react-navigation';
import PropTypes from 'prop-types';

/** 自定义组建的引用 */

/** 工具类的引用 */
import {Size} from '../styles/size';
import {Routers} from '../store/routes';

/** 常量声明 */
const {width, height} = Dimensions.get('window');//屏幕宽度

class CTabBottom extends Component {

  static propTypes = {
    index: PropTypes.number.isRequired
  }

  static defaultProps = {
    index: 1,
  }

  constructor(props) {
    super(props);
    this.state = {
      index: 0
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

  onSelectTab = (tab) => {
    switch (tab) {
      case 0:
        // Routers.stackRoots.dispatch(
        //   StackActions.reset({
        //     index: 0,
        //     actions: [
        //       NavigationActions.navigate({routeName: 'InstalmentPage'}),
        //     ]
        //   })
        // )
        this.props.navigation.replace('MainPage')
        break;
      case 1:
        // Routers.stackRoots.dispatch(
        //   StackActions.reset({
        //     index: 0,
        //     actions: [
        //       NavigationActions.navigate({routeName: 'MyPage'}),
        //     ]
        //   })
        // )
        this.props.navigation.replace('MyPage')
        break;
    }
    this.setState({index: tab})
  }

  render() {
    const {index} = this.props
    return (
      <ImageBackground
        style={styles.tabBarComponent}
        source={require('../res/toolbar_bg_white.png')}
        resizeMode={'stretch'}
        fadeDuration={0}>
        <TouchableOpacity
          style={styles.tabItem}
          activeOpacity={1}
          onPress={() => this.onSelectTab(0)}>
          <View style={[styles.tabIcon, {backgroundColor: index === 1 ? '#000' : '#ffc040'}]}/>
          <Text style={[styles.tabFont, {color: index === 1 ? '#000' : '#ffc040'}]}>{'tab1'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          activeOpacity={1}
          onPress={() => this.onSelectTab(1)}>
          <View style={[styles.tabIcon, {backgroundColor: index === 2 ? '#000' : '#ffc040'}]}/>
          <Text style={[styles.tabFont, {color: index === 2 ? '#000' : '#ffc040'}]}>{'tab2'}</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

export default withNavigation(CTabBottom)

const styles = StyleSheet.create({
  tabBarComponent: {
    position: 'absolute',
    bottom: 0,
    zIndex: 100000,
    width: width,
    height: 85,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderWidth: 5,
    borderColor: '#e4393c',
    backgroundColor: '#ff6446',
  },
  tabItem: {
    flex: 1,
    height: 55,
    paddingTop: 6,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: Size.screen.pixel,
    borderRightColor: '#eaeaea',
  },
  tabIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#eaeaea',
    borderRadius: 10,
    marginBottom: 5,
  },
  tabFont: {
    fontSize: 11,
    color: '#eaeaea'
  }
});