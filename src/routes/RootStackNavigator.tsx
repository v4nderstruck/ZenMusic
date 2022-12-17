import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import SignInPage from '../pages/SignIn/SignIn';

import {RootState} from '../states/Store';
import AppTabNavigator from './AppTabNavigator';

const RootStack = createNativeStackNavigator();

export default function RootStackNavigator() {
  const loginState = useSelector(
    (state: RootState) => state.session.sessionVerified,
  );

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!loginState ? (
        <RootStack.Screen name="SignInPage" component={SignInPage} />
      ) : (
        <RootStack.Screen name="AppTabNavigator" component={AppTabNavigator} />
      )}
    </RootStack.Navigator>
  );
}
