/**
 * @format
 */

// https://github.com/uuidjs/uuid#getrandomvalues-not-supported
import 'react-native-get-random-values';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
