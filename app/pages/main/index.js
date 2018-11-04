/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View,
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */
import {createBottomTabNavigator} from "react-navigation";

/** 自定义组建的引用 */


/** 工具类的引用 */
import {Horizontal_RToL_TranslateX} from '../../utils/transitionconfig';
import {Routers} from "../../store/routes";

/** 常量声明 */

const MainStack = createBottomTabNavigator(
  {
    InstalmentPage: {screen: InstalmentPage},
    SettingPage: {screen: SettingPage},
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        // const { routeName } = navigation.state;
        // let iconName;
        // if (routeName === 'Home') {
        //   iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        // } else if (routeName === 'Settings') {
        //   iconName = `ios-options${focused ? '' : '-outline'}`;
        // }
        //
        // // You can return any component that you like here! We usually use an
        // // icon component from react-native-vector-icons
        // return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
)


export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    Routers.mainStackRoots = this._MainStackRoots
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

  render() {
    return <MainStack ref={ref => this._MainStackRoots = ref}/>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});