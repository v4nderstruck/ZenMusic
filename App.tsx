/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import AppContextProvider from './src/common/AppContextProvider';
import RootNavigator from './src/common/RootNavigator';
import CookieManager from '@react-native-cookies/cookies';

const App = () => {

  // CookieManager.clearAll(true).then(res => {
  //   console.log("Debug: clear cash bro")
  // })

  return (
    <AppContextProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AppContextProvider>
  );
};
export default App;
