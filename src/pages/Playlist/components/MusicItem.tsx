/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import TrackPlayer from 'react-native-track-player';
import Icon from 'react-native-vector-icons/Ionicons';

export interface MusicItemProps {
  queueIndex: number;
  title: string;
  artist: string;
  duration: number;
  active?: boolean;
  artwork: string;
}

const toTimeFormat = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return `${minutes === 0 ? '-' : minutes}:${
    seconds < 10 ? '0' + seconds.toString() : seconds
  }`;
};

const clickHandler = (index: number) => {
  TrackPlayer.skip(index);
};

export default function MusicItem({
  queueIndex,
  title,
  artist,
  duration,
  active,
  artwork,
}: MusicItemProps) {
  const [renderPlaying, setRenderPlaying] = useState<boolean>(active || false);
  useEffect(() => {
    setRenderPlaying(active || false);
  }, [active]);
  return (
    <TouchableOpacity
      className="flex flex-row gap-6 items-center"
      onPress={() => clickHandler(queueIndex)}>
      <View
        className="relative overflow-hidden flex h-10 w-10 bg-gray-900 rounded-md justify-center
        items-center">
        {renderPlaying ? (
          <View
            className="absolute flex z-10 left-2 top-2 w-6 h-6 rounded-xl bg-indigo-600
          justify-center items-center">
            <Icon name="stats-chart-sharp" size={18} color="white" />
          </View>
        ) : (
          <FastImage
            source={{uri: artwork}}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          />
        )}
      </View>
      <View className="flex flex-col">
        <Text numberOfLines={1} className="text-gray-50 font-bold">
          {title}
        </Text>
        <Text numberOfLines={1} className="text-gray-200">
          {artist} • {toTimeFormat(duration)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
