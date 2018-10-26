import React from 'react';
import {
  Text
} from 'react-native';

import TakeOut from '../pages/takeOut/takeOut';
import Search from '../pages/search/search';
import Order from '../pages/order/order';
import My from '../pages/my/my';
// import TabBarItem from './components/TabBarItem';

import {createBottomTabNavigator} from 'react-navigation';

import Size from '../styles/size';
import Layout from "../styles/layout";

const baseWidth = 325 // 设计图的基准 ip6 为基准
const baseFont = 12 // 默认为 12 像素

const BottomTab = createBottomTabNavigator({
    TakeOut: {
      screen: TakeOut,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, tintColor}) => {
          // return <TabBarItem
          // tintColor={tintColor}
          // focused={focused}
          // 默认没有选中时的图标
          // focusImage={require('../../../res/images/ic_favorite.png')}
          // // 选中后的图标
          // blurImage={require('../../../res/images/ic_favorite.png')}
          // />
          return <Text>{'TakeOut'}</Text>
        },
      }),
    },
    Search: {
      screen: Search,
      navigationOptions:({navigation}) => ({
        tabBarIcon: ({focused, tintColor}) => {
          return <Text>{'Search'}</Text>
        }
      })
    },
    Order:  {
      screen: Order,
      navigationOptions:({navigation}) => ({
        tabBarIcon: ({focused, tintColor}) => {
          return <Text>{'Order'}</Text>
        }
      })
    },
    My: {
      screen: My,
      navigationOptions:({navigation}) => ({
        tabBarIcon: ({focused, tintColor}) => {
          return <Text>{'My'}</Text>
        }
      })
    },
  },
  {
    navigationOptions:({navigation}) => ({
    }),
    // 手动定义选项卡的循序，如果 createBottomTabNavigator 顺序是对的也可以不用设置
    order: ['TakeOut', 'Search', 'Order', 'My'],
    tabBarOptions: {
      activeTintColor: Layout.color.active_tint_color, // 活动选项卡的标签和图标颜色。
      inactiveTintColor: Layout.color.inactive_tint_color, // 非活动选项卡的标签和图标颜色
      activeBackgroundColor: Layout.color.bottom_tab_bg, // 活动选项卡的背景颜色。
      inactiveBackgroundColor: Layout.color.bottom_tab_bg, // 非活动选项卡的背景颜色。
      showIcon: true, // 是否显示选项卡的图标，默认为true。
      labelStyle: {
        fontSize: (Size.width > baseWidth) ? (Size.width / baseWidth * baseFont) : baseFont,
      },
      style: {
        backgroundColor: Layout.color.bottom_tab_bg,
        // borderTopWidth: 0, // 该属性控制默认的线
      },
      allowFontScaling: false,
    },
  });