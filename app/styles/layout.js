/**
 * Created by hebao on 2018/3/22.
 */
const Layout = {
  /**字体大小**/
  font: {
    Title1: 30,
    Title2: 20,
    Title3: 18,
    Title4: 17,

    Subtle1: 16,
    Subtle2: 15,

    Body1: 14,
    Body2: 13,

    Small1: 12,
    Small2: 11,

    /**按钮文字字号**/
    btn_bottom: 17,
    btn_l: 17,
    btn_m: 16,
    btn_xs: 16,
    btn_s: 13,
    btn_input: 14
  },

  /** 字重 */
  fontWeight: {
    Thin: '100',
    UltraLight: '200',
    Light: '300',
    Regular: '400',
    Medium: '500',
    Semibold: '600',
    Bold: '700',
    Heavy: '800',
    Black: '900'
  },

  fontFamily: {
    android: 'sans-serif-medium',
    ios: 'PingFang SC'
  },

  /** 颜色值 **/
  color: {
    /**app通用色**/
    white_bg: '#ffffff',
    white_nvg: '#ffffff',
    white_bar: '#fafafa',

    gray_bg: '#f9f9f9',
    gray_press: '#f2f2f2',
    gray_line: '#eaeaea',
    green_status: '#dfdfdf',

    yellow_main: '#ffc040',
    red_main: '#ff6446',
    gray_status: '#41c557',
    green_itembg: '#83de8b',
    black: '#000000',

    orange_gradient_start: '#ff684a',//橙色渐变块渐变色起始色
    orange_gradient_end: '#f94133',//橙色渐变块渐变色结束色

    /**app按钮色**/
    // btno_start: '#ffaf0a',//橙色按钮普通状态渐变色起始色
    // btno_end: '#ff4631',//橙色按钮普通状态渐变色结束色
    // btno_p_start: '#ffa100',//橙色按钮按下状态渐变色起始色
    // btno_p_end: '#ff3820',//橙色按钮按下状态渐变色结束色
    // btno_d_start: '#ffd785',//橙色按钮不可点渐变色起始色
    // btno_d_end: '#ffa398',//橙色按钮不可点渐变色结束色

    /**app文字色**/
    wblack: '#000000',
    wgray_bar: '#aaaaaa',
    wgray_main: '#b8b8b8',
    wgray_sub: '#d9d9d9',
    wwhite: '#ffffff',
    wwhite_alpha: 'rgba(255,255,255,.65)',
    wred: '#f85f30',
    worange: '#ffa015',
    wgreen: '#41c557'
  },

  /** 间距规范 **/
  gap: {
    gap_edge: 12,
  },

  /** 布局属性 **/
  layout: {
    ccc: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    ccfs: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    ccfe: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    cfsc: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    cfsfs: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
    },
    cfsfe: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-end'
    },
    cfec: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    cfefs: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
    },
    cfefe: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    rcc: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    rcfs: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start'
    },
    rcfe: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end'
    },
    rfsc: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    rfsfs: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
    },
    rfsfe: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-end'
    },
    rfec: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    rfefs: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
    },
    rfefe: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
    },
    rsbc: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    rsac: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    rsbfs: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    },
    csbc: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    csbfs: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  },
}

export {Layout}