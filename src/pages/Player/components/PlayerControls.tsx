import { Slider } from '@miblanchard/react-native-slider';
import { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

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
  const [playState, setPlayState] = useState<boolean>();
  useTrackPlayerEvents([Event.PlaybackState], async event => {
    if (event.type == Event.PlaybackState) {
      if (event.state === State.Playing) {
        setPlayState(true);
      } else {
        setPlayState(false);
      }
    }
  });
  useEffect(() => {
    const getPlayer = async () => {
      const currentPlayerState = await TrackPlayer.getState();
      if (currentPlayerState) {
        setPlayState(currentPlayerState == State.Playing ? true : false);
      }
    }
    getPlayer()
  }, [])

  return (
    <View className="w-full flex flex-col items-center">
      <View className="w-[90%] items-stretch">
        <Slider
          value={20}
          trackStyle={{
            backgroundColor: 'white',
          }}
        />
      </View>
      <View className="mt-6 w-[90%] flex flex-row justify-between">
        <TouchableOpacity>
          <Icon name="ios-repeat" size={24} color="white" />
        </TouchableOpacity>
        <View className="flex flex-row gap-2">
          <TouchableOpacity
            onPress={() => playbackControls(playbackControlsActions.ActionSkipPrev)}
          >
            <Icon name="play-skip-back-sharp" size={36} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              playbackControls(
                playState
                  ? playbackControlsActions.ActionPause
                  : playbackControlsActions.ActionPlay,
              );
            }}>
            {playState ? (
              <Icon name="pause" size={42} color="white" />
            ) : (
              <Icon name="play" size={42} color="white" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => playbackControls(playbackControlsActions.ActionSkip)}
          >
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
