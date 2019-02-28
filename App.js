import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import AuthLoadingScreen from './screens/auth/AuthLoadingScreen';
import AuthStack from './navigation/AuthStack'
import AppStack from './navigation/AppStack'

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));