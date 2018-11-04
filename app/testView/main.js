/**
 * 依赖库
 */
import React, {Component} from 'react'
import {StackNavigator, TabNavigator} from 'react-navigation'

/**
 * 页面
 */
import TabBarComponent from "./tabBarComponent"
// import Tab1 from "./tab1"
// import Tab2 from "./tab2"
// import Tab3 from "./tab3"
// import Tab4 from "./tab4"
import Page1 from "./page1"
import Page2 from "./page2"
import Page3 from "./page3"
import Page4 from "./page4"

const TabStack = TabNavigator({
  // Tab1: {screen: Tab1},
  // Tab2: {screen: Tab2},
  // Tab3: {screen: Tab3},
  // Tab4: {screen: Tab4},
}, {
  tabBarComponent: TabBarComponent,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  lazy: true,
})

/**
 * StackNavigator 路由区域
 */
const MainStack = StackNavigator({
  TabStack: {screen: TabStack},
  Page1: {screen: Page1},
  Page2: {screen: Page2},
  Page3: {screen: Page3},
  Page4: {screen: Page4},
}, {
  headerMode: 'none',
  navigationOptions: {gesturesEnabled: true},
  transitionConfig: FadeToTheLeft,
  initialRouteName: 'Me',
})

export default class MainPage extends Component {
  componentDidMount() {
    Routers.navMain = this._navMain
  }

  render() {
    return <MainStack ref={ref => this._navMain = ref}/>
  }
}
