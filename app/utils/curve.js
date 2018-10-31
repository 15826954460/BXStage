/**
 * Created by hebao on 2018/3/29.
 */
import {Easing} from 'react-native';

export const easeOutQuart = function (t, b, c, d) {
  t /= d;
  t--;
  return -c * (t * t * t * t - 1) + b;
};

export const LinearOutSlowInInterpolator = function () {
  return Easing.bezier(0.0, 0.0, 0.2, 1)
}

export const easeInQuart = function () {
  return Easing.bezier(0.4, 0.0, 1, 1)
}

export const FastOutLinearInInterpolator = function () {
  return Easing.bezier(0.4, 0.0, 1, 1)
}

export const easeInOut = function () {
  return Easing.bezier(.42, 0, .58, 1)
}
