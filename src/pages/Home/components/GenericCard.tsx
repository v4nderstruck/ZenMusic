import React from 'react';
import {NavigationContext} from '@react-navigation/native';
import {useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import TrackPlayer from 'react-native-track-player';
import ItemInfoProvider from '../../../common/Providers/ItemInfoProvider';
import {Item} from '../../../common/Providers/MusicShelfProvider';
import PlaylistProvider from '../../../common/Providers/PlaylistProvider';
import TrackProvider from '../../../common/Providers/TrackProvider';

export interface GenericCardProps {
  item: Item;
  mini?: boolean;
}

function clickHandler(item: Item, navigation: any) {
  (async () => {
    navigation.navigate('PlayerPage');
    try {
      let playGo = true;
      await TrackPlayer.reset();
      let upcoming = null;
      if (item.action.action === 'watch') {
        ItemInfoProvider.setWatchId(item.action.watchId as string);
        upcoming = await ItemInfoProvider.fetch();
        if (upcoming !== null) {
          const trackItem = await TrackProvider.fetch(item);
          if (trackItem == null) {
            return;
          }
          await TrackPlayer.add([trackItem]);
          await TrackPlayer.play();
          playGo = false;
        }
      }
      PlaylistProvider.setPlaylistId(
        upcoming?.playlistId || item.action.browseId,
      );
      const playlistItems = await PlaylistProvider.fetch('');
      for (const p of playlistItems.items) {
        const track = await TrackProvider.fetch(p);
        if (track) {
          await TrackPlayer.add([track]);
          if (playGo) {
            await TrackPlayer.play();
            playGo = false;
          }
        }
      }
      return;
    } catch (e) {
      console.log('Click handler ', e);
    }
  })();
}

export default function GenericCard({item, mini}: GenericCardProps) {
  const navigation = useContext(NavigationContext);
  const [sizeX, sizeY] = mini
    ? [200, 150]
    : item.displayType === 'compact'
    ? [140, 160]
    : [180, 160];
  if (mini) {
    return (
      <View
        className="overflow-hidden mb-2"
        style={{width: sizeX, height: sizeY / 4}}>
        <TouchableOpacity onPress={() => clickHandler(item, navigation)}>
          <View className="flex flex-row gap-2">
            <FastImage
              source={{uri: `${item.artworkUrl}`}}
              style={{width: 36, height: 36}}
            />
            <View className="flex flex-col">
              <Text
                numberOfLines={1}
                className="text-neutral-100 font-bold text-xs">
                {item.title}
              </Text>
              <Text
                numberOfLines={1}
                className="text-gray-200 font-thin text-xs">
                {item.subtitle}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View className="overflow-hidden" style={{width: sizeX, height: sizeY}}>
      <TouchableOpacity onPress={() => clickHandler(item, navigation)}>
        <FastImage
          source={{uri: `${item.artworkUrl}`}}
          style={{width: sizeX, height: sizeY - 30}}
        />
        <Text numberOfLines={1} className="text-neutral-100 font-bold text-xs">
          {item.title}
        </Text>
        <Text numberOfLines={1} className="text-gray-200 font-thin text-xs">
          {item.subtitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
