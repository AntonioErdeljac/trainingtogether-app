import { AppRegistry } from 'react-native';

import src from './src';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => src);
