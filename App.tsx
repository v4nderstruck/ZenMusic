/// <reference types="nativewind/types" />
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';
import {Provider} from 'react-redux';
import store from './src/states/Store';
import playbackService from './src/trackPlayer/playbackService';
import RootStackNavigator from './src/routes/RootStackNavigator';
const App = () => {
  // CookieManager.clearAll(true).then(res => {
  //   console.log("Debug: clear cash bro")
  // })

  TrackPlayer.registerPlaybackService(() => playbackService);

  (async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({progressUpdateEventInterval: 1});
  })();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </Provider>
  );
};
export default App;
