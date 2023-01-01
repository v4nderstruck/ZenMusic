/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import TrackPlayer, {
  Event,
  State,
  usePlaybackState,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import PlayerProgress from './PlayerProgress';

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

export default function PlayerControls() {
  const playState = usePlaybackState();
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const index = await TrackPlayer.getCurrentTrack();
      const track = index !== null ? await TrackPlayer.getTrack(index) : null;
      console.log('init track', index, track);
      if (track) {
        console.log('init track', track.duration);
        setDuration(track.duration || 0);
      }
    };
    fetchData();
  }, []);
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (
      event.type === Event.PlaybackTrackChanged &&
      event.nextTrack != null &&
      event.nextTrack !== undefined
    ) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const trackDuration = track
        ? track.duration || Number.MAX_VALUE
        : Number.MAX_VALUE;
      setDuration(trackDuration);
    }
  });
  return (
    <View className="w-full flex flex-col items-center">
      <View className="w-[90%] flex items-stretch">
        <PlayerProgress duration={duration} />
      </View>
      <View className="mt-6 w-[90%] flex flex-row justify-between">
        <TouchableOpacity>
          <Icon name="ios-repeat" size={24} color="white" />
        </TouchableOpacity>
        <View className="flex flex-row gap-2">
          <TouchableOpacity
            onPress={() =>
              playbackControls(playbackControlsActions.ActionSkipPrev)
            }>
            <Icon name="play-skip-back-sharp" size={36} color="white" />
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
              <Icon name="pause" size={42} color="white" />
            ) : (
              <Icon name="play" size={42} color="white" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              playbackControls(playbackControlsActions.ActionSkip)
            }>
            <Icon name="play-skip-forward-sharp" size={36} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <MaterialIcon name="playlist-add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
