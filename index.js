/** @format */

import {AppRegistry} from 'react-native';
import App from './app/pages/index';
import {name as appName} from './app.json';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Class RCTCxxModule']);
AppRegistry.registerComponent(appName, () => App);
