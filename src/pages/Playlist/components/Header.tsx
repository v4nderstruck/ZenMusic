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
import PlaylistProvider from '../../../common/Providers/PlaylistProvider';
import TrackProvider from '../../../common/Providers/TrackProvider';

export interface HeaderProps {
  triggerRender: (arg0: any) => void;
}
export default function Header({triggerRender}: HeaderProps) {
  const [nextTrack, setNextTrack] = useState<Track | null>(null);
  const [queueLength, setQueueLength] = useState<number>(0);
  const navigation = useContext(NavigationContext);

  const loadMoreHandler = () => {
    const fch = async () => {
      console.log('hander activated');
      let r = (Math.random() + 1).toString(36).substring(2);
      const playlistItems = await PlaylistProvider.fetch(r);
      console.log(playlistItems);
      for (const p of playlistItems.items) {
        const track = await TrackProvider.fetch(p);
        if (track) {
          await TrackPlayer.add([track]);
        }
      }
      triggerRender(Math.random());
    };
    fch();
  };
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
            <TouchableOpacity
              className="ml-6 grow flex flex-row items-center"
              onPress={loadMoreHandler}>
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
