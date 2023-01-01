/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Slider} from '@miblanchard/react-native-slider';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {Text, View} from 'react-native';

export interface PlayerProgressProps {
  duration: number;
}

const progressControls = (value: number | number[]) => {
  if (typeof value === 'number') {
    TrackPlayer.seekTo(value);
  } else {
    TrackPlayer.seekTo(value[0]);
  }
};

const toTimeFormat = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return `${minutes === 0 ? '-' : minutes}:${
    seconds < 10 ? '0' + seconds.toString() : seconds
  }`;
};

export default function PlayerProgress({duration}: PlayerProgressProps) {
  const progress = useProgress();
  return (
    <View>
      <Slider
        value={progress.position}
        minimumValue={0}
        maximumValue={duration}
        step={1}
        onSlidingComplete={progressControls}
        containerStyle={{
          width: '100%',
        }}
        trackStyle={{
          backgroundColor: 'white',
        }}
        minimumTrackTintColor="rgb(55, 48, 163)"
        thumbStyle={{
          backgroundColor: 'rgb(165, 180, 252)',
          width: 15,
          height: 15,
        }}
      />
      <View className="flex flex-row justify-between w-full">
        <Text className="text-gray-300">
          {toTimeFormat(Math.floor(progress.position))}
        </Text>
        <Text className="text-gray-300">{toTimeFormat(duration)}</Text>
      </View>
    </View>
  );
}
