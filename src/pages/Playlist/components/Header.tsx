/* eslint-disable react-native/no-inline-styles */
import {NavigationContext} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Header() {
  const [nextTrack, setNextTrack] = useState<Track | null>(null);
  const [queueLength, setQueueLength] = useState<number>(0);
  const navigation = useContext(NavigationContext);

  useEffect(() => {
    const fetchData = async () => {
      const current = await TrackPlayer.getCurrentTrack();
      if (current === undefined || current === null) {
        return;
      }
      const next = await TrackPlayer.getTrack(current + 1);
      const queue = await TrackPlayer.getQueue();
      setNextTrack(next);
      setQueueLength(queue.length);
    };
    fetchData();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.nextTrack !== undefined && event.nextTrack !== null) {
      const next = await TrackPlayer.getTrack(event.nextTrack + 1);
      setNextTrack(next);
    }
  });
  return (
    <View className="flex flex-col gap-2">
      <View className="self-start">
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Icon name="ios-chevron-back-outline" color="white" size={36} />
        </TouchableOpacity>
      </View>
      <View className="flex flex-row gap-4">
        <FastImage
          className="rounded-md"
          source={{uri: nextTrack?.artwork?.toString() || ''}}
          style={{width: 112, height: 112}}
        />
        <View className="grow flex flex-col">
          <View className="relative flex flex-row items-center">
            <Text className="text-gray-300 font-thin">{queueLength} Songs</Text>
            <TouchableOpacity className="ml-4 grow flex flex-row items-center justify-end">
              <Text className="text-gray-300 font-thin">More</Text>
              <Icon name="ellipsis-vertical" color="gray" size={14} />
            </TouchableOpacity>
          </View>
          <Text className="text-gray-50 font-bold text-3xl">Up Next</Text>
          <Text numberOfLines={1} className="text-gray-50">
            {nextTrack?.title} - {nextTrack?.artist}
          </Text>
          <View className="flex flex-row mt-1">
            <TouchableOpacity
              className="flex flex-row p-1 items-center bg-gray-800
                opacity-70 rounded-md">
              <Icon name="ios-shuffle-outline" color="white" size={24} />
              <Text className="text-gray-50">Shuffle</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
