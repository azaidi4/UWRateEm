import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';

export default AuthStack = createStackNavigator({ SignIn: LoginScreen, SignUp: SignupScreen });
