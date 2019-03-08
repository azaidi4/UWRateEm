import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import AuthLoadingScreen from './screens/auth/AuthLoadingScreen';
import AuthStack from './navigation/AuthStack'
import AppStack from './navigation/AppStack'
import AnonStack from './navigation/AnonStack';

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Anon: AnonStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));