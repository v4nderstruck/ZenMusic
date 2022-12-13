/// <reference types="nativewind/types" />
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/common/RootNavigator';
import TrackPlayer from 'react-native-track-player';
import {Provider} from 'react-redux';
import store from './src/States/Store';
import playbackService from './src/trackPlayer/playbackService';
const App = () => {
  // CookieManager.clearAll(true).then(res => {
  //   console.log("Debug: clear cash bro")
  // })

  TrackPlayer.registerPlaybackService(() => playbackService);

  (async () => {
    await TrackPlayer.setupPlayer();
  })();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
};
export default App;
