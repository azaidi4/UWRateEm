import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/LoginScreen';

export default AuthStack = createStackNavigator({ SignIn: LoginScreen, SignUp: SignupScreen });
