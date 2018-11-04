/**
 * Created by bird-mac on 2018/6/25.
 */
import React, {Component} from 'react';
import BXSafeAreaView from '../components/BXSafeAreaView/BXSafeAreaView'
import Util from '../utility/util'
import CommonSize from '../utility/size'
import BXStandard from '../styles/standard'
import {
  View
} from 'react-native'
import Svg, {Defs, Stop, G, Path, LinearGradient, Line, Text} from 'react-native-svg'

const angle = (PI * 2) * 0.2    //角度
const radius = 68  //路径长度
const shape_h = radius + radius * sin(2 * angle - PI / 2)   //shape height
const text_p = 7    //文字padding
const text_h = 25   //文字height

const art_s = {       //art size
  width: CommonSize.width,
  height: shape_h + 2 * (text_p + text_p)
}

export default class Score extends Component {

  constructor() {
    super()

    _items = [
      {
        title: '个人信息',
        anchor: 'middle',
        x_d: 0,
        y_d: -text_p
      },
      {
        title: '财产状况',
        anchor: 'start',
        x_d: text_p,
        y_d: 0
      },
      {
        title: '信用情况',
        anchor: 'start',
        x_d: 0,
        y_d: text_p
      },
      {
        title: '收入状况',
        anchor: 'end',
        x_d: 0,
        y_d: text_p
      },
      {
        title: '偿还能力',
        anchor: 'end',
        x_d: -text_p,
        y_d: 0
      }
    ]
    _points = []
  }

  componentWillMount() {
    this._caluatePoints();
  }

  _caluatePoints() {
    //first point
    this._points.push({x: art_s.width * 0.5, y: art_s.height * 0.5 - radius})
    //other five points
    this._items.forEach((item, index) => {
      if (index !== 0)
        this._points.push({x: cos(index * angle - PI / 2) * radius, y: sin(index * angle - PI / 2) * radius})
    })
  }

  render() {
    return (
      <BXSafeAreaView>
        <Svg width={art_s.width} height={art_s.height}>
          {
            this._items.map((item, index) => {
              return <Text key={index} stroke={BXStandard.color.wgray_main} fontSize={BXStandard.font.Small1}
                           textAnchor={item.anchor}
                           x={this._points[index].x + item.x_d} y={this._points[index].y + item.y_d}>{item.title}</Text>
            })
          }
        </Svg>
      </BXSafeAreaView>
    )
  }
}
