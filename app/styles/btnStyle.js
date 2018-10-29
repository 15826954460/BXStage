import {Dimensions} from "react-native";
import {Util} from '../utils/util';
const {width, height} = Dimensions.get('window')
const BtnStyle = {
  color: {
    /**app通用色**/
    orange_gradient_start: '#ff684a',//橙色渐变块渐变色起始色
    orange_gradient_end: '#f94133',//橙色渐变块渐变色结束色

    /**app按钮色**/
    btno_start: '#ffaf0a',//橙色按钮普通状态渐变色起始色
    btno_end: '#ff4631',//橙色按钮普通状态渐变色结束色
    btno_p_start: '#ffa100',//橙色按钮按下状态渐变色起始色
    btno_p_end: '#ff3820',//橙色按钮按下状态渐变色结束色
    btno_d_start: '#ffd785',//橙色按钮不可点渐变色起始色
    btno_d_end: '#ffa398',//橙色按钮不可点渐变色结束色
  },
  button: {
    btn_l: {
      height: 44,
      borderRadius: 22,
      width: width - 24,
      marginHorizontal: 12,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    btn_m: {
      height: 36,
      borderRadius: 18,
      width: 180,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    btn_s: {
      height: 34,
      borderRadius: 17,
      minWidth: 115,
      paddingHorizontal: 12,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    btn_xs: {
      height: 36,
      borderRadius: 18,
      width: 110,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    btn_input: {
      width: 68,
      height: 25,
      borderRadius: 12.5,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    btn_bottom:{
      width: width - (Util.isIPhoneX() ? 24 : 0),
      height: 44,
      borderRadius: Util.isIPhoneX() ? 22 : 0,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    btn_list: {
      height: 30,
      borderRadius: 15,
      width: 64,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }
  }
}
export {BtnStyle}