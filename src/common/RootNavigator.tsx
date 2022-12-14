import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../pages/SignIn/SignIn';
import AppNavigator from './AppNavigator';

const RootStack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {getAppState()?.signIn == 'NOT_SIGNED_IN' ? (
        <RootStack.Screen name="SignInPage" component={SignIn} />
      ) : (
        <RootStack.Screen name="AppInternalPages" component={AppNavigator} />
      )}
    </RootStack.Navigator>
  );
}
