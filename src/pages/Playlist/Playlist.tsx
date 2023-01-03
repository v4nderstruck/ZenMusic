import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import TrackPlayerOverlay from '../../trackPlayer/trackPlayerOverlay';
import Header from './components/Header';
import MusicItem from './components/MusicItem';

interface PlaylistItem {
  index: number;
  active: boolean;
  title: string;
  artist: string;
  duration: number;
  artwork: string;
}

export default function Playlist() {
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const tracks = await TrackPlayer.getQueue();
      const currentTrack = await TrackPlayer.getCurrentTrack();
      const tPlaylist: PlaylistItem[] = [];
      tracks.forEach((item, index) => {
        tPlaylist.push({
          active: index === currentTrack,
          index: index,
          title: item.title || '',
          artist: item.artist || '',
          duration: item.duration || 0,
          artwork: item.artwork?.toString() || '',
        });
      });
      setPlaylist(tPlaylist);
    };
    fetchData();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (
      event.track !== undefined &&
      event.track !== null &&
      event.nextTrack !== undefined &&
      event.nextTrack !== null
    ) {
      const newPlaylist = playlist;
      newPlaylist[event.track].active = false;
      newPlaylist[event.nextTrack].active = true;
      setPlaylist([...newPlaylist]);
    }
  });
  return (
    <SafeAreaView className="w-full h-full bg-black">
      <Header />
      <View className="h-4" />
      <FlatList
        extraData={playlist}
        data={playlist}
        ItemSeparatorComponent={() => <View className="h-4" />}
        keyExtractor={item => item.index.toString()}
        renderItem={({item}) => (
          <View className="ml-4">
            <MusicItem
              artwork={item.artwork}
              queueIndex={item.index}
              title={item.title}
              artist={item.artist}
              duration={item.duration}
              active={item.active}
            />
          </View>
        )}
      />
      <View className="absolute bottom-0 left-0 bg-black w-full z-10">
        <TrackPlayerOverlay />
      </View>
    </SafeAreaView>
  );
}
