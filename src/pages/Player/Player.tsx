import {useState} from 'react';
import {Text, SafeAreaView, View} from 'react-native';
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {MusicCard} from '../../api/types';
import HeaderBar from './components/HeaderBar';
import MusicCarousel from './components/MusicCarousel';
import PlayerControls from './components/PlayerControls';

export interface TrackProps {
  artwork: String;
  title: String;
  artist: String;
}

export default function Player({route, navigation}: any) {
  return (
    <SafeAreaView className="w-full h-full bg-neutral-300 dark:bg-black">
      <HeaderBar navigation={navigation} />
      <View className="mt-12 w-full h-[65%]">
        <MusicCarousel />
      </View>
      <View className="w-full h-[20%]">
        <PlayerControls />
      </View>
    </SafeAreaView>
  );
}
