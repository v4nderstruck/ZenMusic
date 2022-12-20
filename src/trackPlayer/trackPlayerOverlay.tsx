import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/Ionicons';

interface TrackItem {
  title: String,
  artist: String,
  artworkUrl: String,
  watchUrl: String,
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
  const [playState, setPlayState] = useState(false);
  useTrackPlayerEvents(
    [
      Event.PlaybackTrackChanged,
      Event.PlaybackState,
      Event.PlaybackError,
      Event.PlaybackQueueEnded,
    ],
    async event => {
      if (event.type == Event.PlaybackState) {
        setPlayState(event.state === State.Playing ? true : false);
      } else if (
        event.type == Event.PlaybackTrackChanged &&
        event.nextTrack != null
      ) {
        const currentTrack = await TrackPlayer.getTrack(event.nextTrack);
        if (currentTrack !== undefined) {
          const { title, artist, artwork, url } = currentTrack!;
          const mc: TrackItem = {
            title: title || "",
            artist: artist || "",
            artworkUrl: artwork?.toString() || "",
            watchUrl: url.toString() || "",
          };
          console.log("trackoverlay ", mc);
          setMusicCard(mc);
        }
      } else if (event.type == Event.PlaybackError) {
        console.log(event.code, event.message);
      } else if (event.type == Event.PlaybackQueueEnded) {
        setMusicCard(undefined);
      }
    },
  );

  useEffect(() => {
    const fetchData = async () => {
      const currenTrackIndex = await TrackPlayer.getCurrentTrack();
      if (currenTrackIndex) {
        const currentTrack = await TrackPlayer.getTrack(currenTrackIndex);
        if (currentTrack !== undefined) {
          const { title, artist, artwork, url } = currentTrack!;
          const mc: TrackItem = {
            title: title || "",
            artist: artist || "",
            artworkUrl: artwork?.toString() || "",
            watchUrl: url.toString() || "",
          };
          console.log("trackoverlay ", mc);
          setMusicCard(mc);
        }
      }
      const currentPlayerState = await TrackPlayer.getState();
      if (currentPlayerState) {
        setPlayState(currentPlayerState == State.Playing ? true : false);
      }
    };

    fetchData();
  }, []); // again, because of mounting

  if (musicCard) {
    return (
      <View className="flex flex-row gap-2 items-center w-full">
        <View>
          <Icon name="ios-musical-notes-outline" color="white" size={42} />
        </View>
        <View className="w-[60%] overflow-hidden flex flex-col">
          <Text className="text-neutral-100 font-semibold" numberOfLines={1}>{musicCard.title}</Text>
          <Text className="text-gray-400" numberOfLines={1}>{musicCard.artist}</Text>
        </View>
        <View className="absolute right-0 flex flex-row items-center">
          <TouchableOpacity
            onPress={() => playbackControls(playbackControlsActions.ActionSkipPrev)}
          >
            <Icon name="play-skip-back-sharp" size={28} color="white" />
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
              <Icon name="pause" size={36} color="white" />
            ) : (
              <Icon name="play" size={36} color="white" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => playbackControls(playbackControlsActions.ActionSkip)}
          >
            <Icon name="play-skip-forward-sharp" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return <></>;
}
