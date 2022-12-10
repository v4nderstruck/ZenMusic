
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import TrackPlayer, { Event, State, useTrackPlayerEvents } from 'react-native-track-player';
import { MusicCard } from '../api/types';
import Icon from 'react-native-vector-icons/Ionicons';

enum playbackControlsActions {
  ActionPlay,
  ActionPause
}

const playbackControls = (controls: playbackControlsActions) => {
  switch (controls) {
    case playbackControlsActions.ActionPlay:
      (async () => await TrackPlayer.play())();
      break;
    case playbackControlsActions.ActionPause:
      (async () => await TrackPlayer.pause())();
      break;
  }
}

function compactString(t: String, len: number): String {
  if (t.length > len) {
    return `${t.slice(0, len)}...`;
  } else {
    return t;
  }
}

export default function TrackPlayerOverlay() {
  const [musicCard, setMusicCard] = useState<MusicCard>();
  const [playState, setPlayState] = useState(false);
  useTrackPlayerEvents([Event.PlaybackTrackChanged,
  Event.PlaybackState,
  Event.PlaybackError,
  Event.PlaybackQueueEnded], async event => {
    if (event.type == Event.PlaybackState) {
      setPlayState(event.state === State.Playing ? true : false);
    }
    else if (event.type == Event.PlaybackTrackChanged && event.nextTrack != null) {
      const currentTrack = await TrackPlayer.getTrack(event.nextTrack);
      if (currentTrack !== undefined) {
        const { title, artist, artwork, url } = currentTrack!;
        const mc: MusicCard = {
          title: compactString(title!, 34),
          subtitle: compactString(artist!, 34),
          thumbnailUrl: artwork!,
          id: url!
        };
        console.log("Updated Overlay component", mc);
        setMusicCard(mc);
      }
    }
    else if (event.type == Event.PlaybackError) {
      console.log(event.code, event.message);
    }
    else if (event.type == Event.PlaybackQueueEnded) {
      setMusicCard(null);
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      const currenTrackIndex = await TrackPlayer.getCurrentTrack();
      if (currenTrackIndex) {
        const currentTrack = await TrackPlayer.getTrack(currenTrackIndex);
        if (currentTrack !== undefined) {
          const { title, artist, artwork, url } = currentTrack!;
          const mc: MusicCard = {
            title: title!,
            subtitle: artist!,
            thumbnailUrl: artwork!,
            id: url!
          };
          console.log("Updated Overlay component", mc);
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
      <View >
        <View className="flex flex-row gap-2 items-center w-full">
          <View>
            <Icon name="ios-musical-notes-outline" color="white" size={42} />
          </View>
          <View className="flex flex-col">
            <Text className="text-neutral-100">{musicCard.title}</Text>
            <Text className="text-neutral-100">{musicCard.subtitle}</Text>
          </View>
          <View className="absolute right-0 flex flex-row items-center">
            <TouchableOpacity>
              <Icon name="play-skip-back-sharp" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              playbackControls(playState ? playbackControlsActions.ActionPause : playbackControlsActions.ActionPlay);
            }}>
              {playState ? (
                <Icon name="pause" size={36} color="white" />
              ) : (
                <Icon name="play" size={36} color="white" />
              )}
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="play-skip-forward-sharp" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  return (<></>)
}
