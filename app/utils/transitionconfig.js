/**
 * Created by hebao on 2017/6/15.
 * refer to : http://www.reactnativediary.com/2016/12/20/navigation-experimental-custom-transition-2.html
 * 其中关于
 * inputRange: [index - 1, index, index + 0.99, index + 1]
 * outputRange: [1, 1, 0.3, 0]
 * 的一些注解
 *
 * screen: G   D
 * index:  0   1
 *
 * index => 0 -> 1， 从 G screen 跳转到 D screen，此时的动画展现应该为，G screen 渐变透明，D screen 透明度保持为1，
 * 则此时 index 为0 ，
 * inputRange 为：[-1, 0, 0.99, 1]
 * outputRange 为：[1, 1, 0.3, 0]
 * 所以此时 G screen 的 position index 的映射为： 0 -> 1 ，opacity 映射为1 -> 0，同时 D screen 无透明推入
 *
 * 然后此时的 index 变更为 1
 *
 * index => 1 -> 0，从 D screen 回转到 G screen , 此时的动画展现应该为，D screen 透明度仍然保持为1，G screen 从透明恢复到不透明，
 * 此时的 index 为1，
 * inputRange 为：[0, 1, 1.99, 2]
 * outputRange 为：[1, 1, 0.3, 0]
 * 所以此时 D screen 的 position index 的映射为： 1 -> 0 ，opacity 映射为1 -> 1，也即 D screen 保持透明推出，
 * 然后，由于之前 G screen 的 position index 从 0 - > 1 时的 opacity 映射为 1 -> 0 , 所以，当 index 从 1 -> 0 时，opacity 会遵从 0 -> 1 变化，也即 G screen 从透明恢复到不透明
 *
 * 然后循环往复。
 *
 * 其中：opacity 选项的 inputRange 需要使用四段， 也即 [1, 1, 0.3, 0]，这是为了被完全覆盖的层的透明度也调整为全透明，因为半透明的层的状态维护开销很大。（至于其他，日后视情况再考虑）
 * 然后断层使用 0.99 就可以了，也即 [index - 1, index, index + 0.99, index + 1]，同样是为了避免太过精确导致的开销
 *
 */
import {I18nManager, Easing, Animated, Platform} from 'react-native';

// Define scene transition params
const transitionSpec = {
  duration: 350,
  easing: Easing.out(Easing.poly(5)), // decelerate
  timing: Animated.timing,
  useNativeDriver: true
};

const transitionSpecTransX = {
  duration: 350,
  easing: Easing.easeInEaseOut, // decelerate
  timing: Animated.timing,
  useNativeDriver: true
};

const IOSTransitionSpec = ({
  duration: 500,
  easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
  timing: Animated.timing,
  useNativeDriver: true
});

export const Android_Default = () => {
  return {
    transitionSpec,
    // Define scene interpolation, eq. custom transition
    screenInterpolator: (sceneProps) => {
      //part-1: prepare for some params
      const {position, scene} = sceneProps;
      const {index} = scene;
      const inputRange = [index - 1, index, index + 0.99, index + 1];

      //part-2: define transition animation
      const opacity = position.interpolate({
        inputRange,
        outputRange: [0, 1, 1, 0],
      });
      const translateY = position.interpolate({
        inputRange,
        outputRange: [50, 0, 0, 0],
      });

      //part-3 return
      return {
        opacity,
        transform: [
          {translateY}
        ]
      };
    }
  }
};

export const IOS_Default = () => {
  return {
    IOSTransitionSpec,
    // Define scene interpolation, eq. custom transition
    screenInterpolator: (sceneProps) => {
      //part-1: prepare for some params
      const {position, scene, layout} = sceneProps;
      const {index} = scene;
      const width = layout.initWidth;
      const inputRange = [index - 1, index, index + 1];
      const outputRange = I18nManager.isRTL ? [-width, 0, 30] : [width, 0, -30];

      //part-2: define transition animation
      const opacity = position.interpolate({
        inputRange: ([
          index - 1,
          index - 0.99,
          index,
          index + 0.99,
          index + 1,
        ]),
        outputRange: ([0, 1, 1, 0.3, 0]),
      });
      const translateY = 0;
      const translateX = position.interpolate({
        inputRange,
        outputRange,
      });

      //part-3 return
      return {
        opacity,
        transform: [
          {translateX},
          {translateY}
        ]
      };
    }
  }
};

export const Horizontal_RToL_Scale_Opacity_TranslateX = () => {
  return {
    transitionSpec,
    // Define scene interpolation, eq. custom transition
    screenInterpolator: (sceneProps) => {
      //part-1: prepare for some params
      const {position, scene, layout} = sceneProps;
      const {index} = scene;
      const width = layout.initWidth;
      const inputRange = [index - 1, index, index + 0.999, index + 1];
      const outputRange = I18nManager.isRTL ? [-width, 0, 10, 10] : [width, 0, -10, -10];

      //part-2: define transition animation
      const opacity = position.interpolate({
        inputRange,
        outputRange: [1, 1, 0.3, 0],
      });
      const scale = position.interpolate({
        inputRange,
        outputRange: ([1, 1, 0.95, 0.95]),
      });
      const translateX = position.interpolate({
        inputRange,
        outputRange,
      });

      //part-3 return
      return {
        opacity,
        transform: [
          {scale},
          {translateX}
        ]
      };
    }
  }
};

export const Horizontal_RToL_Opacity_TranslateX = () => {
  return {
    transitionSpec,
    // Define scene interpolation, eq. custom transition
    screenInterpolator: (sceneProps) => {
      //part-1: prepare for some params
      const {position, scene, layout} = sceneProps;
      const {index} = scene;
      const width = layout.initWidth;
      const inputRange = [index - 1, index, index + 0.999, index + 1];
      const outputRange = I18nManager.isRTL ? [-width, 0, 10, 10] : [width, 0, -10, -10];

      //part-2: define transition animation
      const opacity = position.interpolate({
        inputRange,
        outputRange: [1, 1, 0.3, 0],
      });
      const translateX = position.interpolate({
        inputRange,
        outputRange,
      });

      //part-3 return
      return {
        opacity,
        transform: [
          {translateX},
        ]
      };
    }
  }
};

export const Horizontal_RToL_Opacity = () => {
  return {
    transitionSpec,
    // Define scene interpolation, eq. custom transition
    screenInterpolator: (sceneProps) => {
      //part-1: prepare for some params
      const {position, scene, layout} = sceneProps;
      const {index} = scene;
      const width = layout.initWidth;
      const inputRange = [index - 1, index, index + 0.999, index + 1];
      const outputRange = I18nManager.isRTL ? [-width, 0, 0, 0] : [width, 0, 0, 0];

      //part-2: define transition animation
      const opacity = position.interpolate({
        inputRange,
        outputRange: [1, 1, 0.3, 0],
      });
      const translateX = position.interpolate({
        inputRange,
        outputRange,
      });

      //part-3 return
      return {
        // opacity,
        transform: [
          {translateX},
        ]
      };
    }
  }
};

export const Horizontal_RToL_Scale_Opacity = () => {
  return {
    transitionSpec,
    // Define scene interpolation, eq. custom transition
    screenInterpolator: (sceneProps) => {
      //part-1: prepare for some params
      const {position, scene, layout} = sceneProps;
      const {index} = scene;
      const width = layout.initWidth;
      const inputRange = [index - 1, index, index + 0.999, index + 1];
      const outputRange = I18nManager.isRTL ? [-width, 0, 0, 0] : [width, 0, 0, 0];

      //part-2: define transition animation
      const opacity = position.interpolate({
        inputRange,
        outputRange: [1, 1, 0.3, 0],
      });
      const scale = position.interpolate({
        inputRange,
        outputRange: ([1, 1, 0.95, 0.95]),
      });
      const translateX = position.interpolate({
        inputRange,
        outputRange,
      });

      //part-3 return
      return {
        opacity,
        transform: [
          {scale},
          {translateX}
        ]
      };
    }
  }
};

export const FadeIn = () => {
  return {
    transitionSpec,
    // Define scene interpolation, eq. custom transition
    screenInterpolator: (sceneProps) => {
      //part-1: prepare for some params
      const {position, scene} = sceneProps;
      const {index} = scene;
      const inputRange = [index - 1, index, index + 1];

      //part-2: define transition animation
      const opacity = position.interpolate({
        inputRange,
        outputRange: [0, 1, 0],
      });

      //part-3 return
      return {
        opacity
      };
    }
  }
};

export const FadeToTheLeft = () => {//navigator 的默认动画
  return {
    transitionSpec: {
      duration: 260,
      easing: Easing.bezier(0.27, 0.58, 0.38, 1),
      timing: Animated.spring,
      //spring config (ps: View /node_modules/react-navigation/src/views/Transitioner.js)
      velocity: 1.5,  // Velocity makes it move
      tension: 200, // Slow
      friction: 26,  // Oscillate a lot
      useNativeDriver: true, //RN 0.43 以上支持
    },
    // Define scene interpolation, eq. custom transition
    screenInterpolator: (sceneProps) => {
      //part-1: prepare for some params
      const {position, scene, layout} = sceneProps;
      const {index} = scene;
      const {initWidth} = layout;

      //part-2: define transition animation
      //透明度
      const opacity = position.interpolate({
        inputRange: [index - 1, index, index + 0.99, index + 1],
        outputRange: [1, 1, 0.6, 0],
      });

      //缩放
      const scale = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [1, 1, 0.97],
      });

      //横向位移
      const _width = Math.round(initWidth * 0.3);
      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [initWidth, 0, -_width],
      });

      //part-3 return
      return {
        // opacity,
        transform: [
          // {scale},
          {translateX},
        ]
      };
    }
  }
};

/** 水平方向过页面切换动画，配合透明度 */
export const Horizontal_RToL_TranslateX = () => {
  if (Platform.OS === 'android') return FadeToTheLeft();
  return {
    transitionSpecTransX,
    // Define scene interpolation, eq. custom transition
    screenInterpolator: (sceneProps) => {
      //part-1: prepare for some params
      const {position, scene, layout} = sceneProps;
      const {index} = scene;
      const width = layout.initWidth;
      const inputRange = [
        index - 1,
        index,
        index + 0.999,
        index + 1
      ];

      const outputRange = I18nManager.isRTL ? [-width, 0, width * 2 / 5, width * 2 / 5] : [width, 0, -width * 2 / 5, -width * 2 / 5];

      // part-2: define transition animation
      const opacity = position.interpolate({
        inputRange,
        outputRange: [1, 1, 0.3, 0],
      });

      const translateX = position.interpolate({
        inputRange,
        outputRange,
      });

      // part-3 return
      return {
        opacity,
        transform: [
          {translateX},
        ]
      };
    }
  }
};
