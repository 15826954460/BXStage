import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ImageBackground} from 'react-native';

import {Size} from '../styles/size'
const {width, pixel} = Size.screen

export default class TabBarComponent extends Component {
  onSelectTab = (tab) => {
    let {index} = this.props.navigation.state;
    if (index === tab) return;
    switch (tab) {
      case 0:
        this.props.navigation.navigate('Tab1');
        break;
      case 1:
        this.props.navigation.navigate('Tab2');
        break;
      case 2:
        this.props.navigation.navigate('Tab3');
        break;
      case 3:
        this.props.navigation.navigate('Tab4');
        break;
    }
  }

  render() {
    let {index} = this.props.navigation.state;
    return (
      <ImageBackground
        style={Styles.tabBarComponent}
        source={require('../res/toolbar_bg_white.png')}
        resizeMode={'stretch'}
        fadeDuration={0}>
        <TouchableOpacity
          style={Styles.tabItem}
          activeOpacity={1}
          onPress={() => this.onSelectTab(0)}>
          <View style={[Styles.tabIcon, {backgroundColor: index === 0 ? '#feafea' : '#eaeaea'}]}/>
          <Text style={[Styles.tabFont, {color: index === 0 ? '#feafea' : '#eaeaea'}]}>{'tab1'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.tabItem}
          activeOpacity={1}
          onPress={() => this.onSelectTab(1)}>
          <View style={[Styles.tabIcon, {backgroundColor: index === 1 ? '#feafea' : '#eaeaea'}]}/>
          <Text style={[Styles.tabFont, {color: index === 1 ? '#feafea' : '#eaeaea'}]}>{'tab2'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.tabItem}
          activeOpacity={1}
          onPress={() => this.onSelectTab(2)}>
          <View style={[Styles.tabIcon, {backgroundColor: index === 2 ? '#feafea' : '#eaeaea'}]}/>
          <Text style={[Styles.tabFont, {color: index === 2 ? '#feafea' : '#eaeaea'}]}>{'tab3'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Styles.tabItem, {borderWidth: 0}]}
          activeOpacity={1}
          onPress={() => this.onSelectTab(3)}>
          <View style={[Styles.tabIcon, {backgroundColor: index === 3 ? '#feafea' : '#eaeaea'}]}/>
          <Text style={[Styles.tabFont, {color: index === 3 ? '#feafea' : '#eaeaea'}]}>{'tab4'}</Text>
        </TouchableOpacity>
      </ImageBackground>
    )
  }
}

const Styles = StyleSheet.create({
  tabBarComponent: {
    position: 'absolute',
    bottom: 0,
    width,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  tabItem: {
    flex: 1,
    height: 55,
    paddingTop: 6,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: pixel,
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
})
