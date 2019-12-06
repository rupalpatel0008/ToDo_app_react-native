import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../modules/auth/LoginScreen';
import RegisterScreen from '../modules/auth/RegisterScreen';
import HomeScreen from '../modules/home/HomeScreen';
import SplashScreen from '../screens/splash/SplashScreen';

const AuthStack = createStackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    RegisterScreen: { screen: RegisterScreen }
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LoginScreen'
  }
);

const HomeStack = createStackNavigator(
  {
    HomeScreen: { screen: HomeScreen }
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'HomeScreen'
  }
);

// Manifest of possible screens
const PrimaryNav = createSwitchNavigator(
  {
    SplashScreen,
    AuthStack,
    HomeStack
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'SplashScreen',
    navigationOptions: {
      //   headerStyle: styles.header
    }
  }
);

export default createAppContainer(PrimaryNav);
