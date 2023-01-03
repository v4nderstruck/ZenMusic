import React from 'react';
import {SafeAreaView, View} from 'react-native';
import HeaderBar from './components/HeaderBar';
import MusicCarousel from './components/MusicCarousel';
import PlayerControls from './components/PlayerControls';

export default function Player({navigation}: any) {
  return (
    <SafeAreaView className="w-full h-full bg-black">
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
