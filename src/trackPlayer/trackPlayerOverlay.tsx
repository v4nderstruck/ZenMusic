/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {NavigationContext} from '@react-navigation/native';
import {useContext, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import TrackPlayer, {
  Event,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/Ionicons';
import TrackProgress from './TrackProgress';
import FastImage from 'react-native-fast-image';

interface TrackItem {
  title: String;
  artist: String;
  artworkUrl: String;
  watchUrl: String;
}
enum playbackControlsActions {
  ActionPlay,
  ActionPause,
  ActionSkip,
  ActionSkipPrev,
}

const playbackControls = (controls: playbackControlsActions) => {
  switch (controls) {
    case playbackControlsActions.ActionPlay:
      TrackPlayer.play();
      break;
    case playbackControlsActions.ActionPause:
      TrackPlayer.pause();
      break;
    case playbackControlsActions.ActionSkip:
      TrackPlayer.skipToNext();
      break;
    case playbackControlsActions.ActionSkipPrev:
      TrackPlayer.skipToPrevious();
      break;
  }
};

export default function TrackPlayerOverlay() {
  const [musicCard, setMusicCard] = useState<TrackItem>();
  const playState = usePlaybackState();
  const [duration, setDuration] = useState(0);
  const progress = useProgress();
  const navigation = useContext(NavigationContext);

  useTrackPlayerEvents(
    [
      Event.PlaybackTrackChanged,
      Event.PlaybackState,
      Event.PlaybackError,
      Event.PlaybackQueueEnded,
    ],
    async event => {
      if (
        event.type === Event.PlaybackTrackChanged &&
        event.nextTrack != null
      ) {
        const currentTrack = await TrackPlayer.getTrack(event.nextTrack);
        if (currentTrack) {
          const {title, artist, artwork, url} = currentTrack;
          const mc: TrackItem = {
            title: title || '',
            artist: artist || '',
            artworkUrl: artwork?.toString() || '',
            watchUrl: url.toString() || '',
          };
          setDuration(currentTrack.duration || Number.MAX_VALUE);
          setMusicCard(mc);
        }
      } else if (event.type === Event.PlaybackError) {
        console.log('Playbackerror', event.code, event.message);
      } else if (event.type === Event.PlaybackQueueEnded) {
        setMusicCard(undefined);
      }
    },
  );

  useEffect(() => {
    const fetchData = async () => {
      const currenTrackIndex = await TrackPlayer.getCurrentTrack();
      const currentTrack =
        currenTrackIndex !== null
          ? await TrackPlayer.getTrack(currenTrackIndex)
          : null;
      if (currentTrack) {
        const {title, artist, artwork, url} = currentTrack;
        const mc: TrackItem = {
          title: title || '',
          artist: artist || '',
          artworkUrl: artwork?.toString() || '',
          watchUrl: url.toString() || '',
        };
        setDuration(currentTrack.duration || Number.MAX_VALUE);
        setMusicCard(mc);
      }
    };
    fetchData();
  }, []); // again, because of mounting

  if (musicCard) {
    return (
      <View className="flex flex-col w-full">
        <TrackProgress progress={progress.position} max={duration} />
        <View className="flex flex-row gap-2 items-center w-full">
          <View>
            <FastImage
              source={{uri: `${musicCard.artworkUrl}`}}
              style={{width: 42, height: 42}}
            />
          </View>
          <View className="w-[60%] overflow-hidden flex flex-col">
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate('PlayerPage');
              }}>
              <Text
                className="text-neutral-100 font-semibold"
                numberOfLines={1}>
                {musicCard.title}
              </Text>
              <Text className="text-gray-400" numberOfLines={1}>
                {musicCard.artist}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="absolute right-0 flex flex-row items-center">
            <TouchableOpacity
              onPress={() =>
                playbackControls(playbackControlsActions.ActionSkipPrev)
              }>
              <Icon name="play-skip-back-sharp" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                playbackControls(
                  playState === State.Playing
                    ? playbackControlsActions.ActionPause
                    : playbackControlsActions.ActionPlay,
                );
              }}>
              {playState === State.Playing ? (
                <Icon name="pause" size={36} color="white" />
              ) : (
                <Icon name="play" size={36} color="white" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                playbackControls(playbackControlsActions.ActionSkip)
              }>
              <Icon name="play-skip-forward-sharp" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  return <></>;
}
