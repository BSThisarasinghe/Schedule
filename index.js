import {AppRegistry} from 'react-native';
import App from './src/App';
import bgMessaging from './src/bgMessaging';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
