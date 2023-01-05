/* eslint-disable react-native/no-inline-styles */
import {NavigationContext} from '@react-navigation/native';
import React, {useContext} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Item} from '../../../common/Providers/MusicShelfProvider';
import {
  SearchResult,
  SearchResultItem,
} from '../../../common/Providers/SearchProvider';
import {startPlayerHandler} from '../../../trackPlayer/handlers';

interface ItemProps {
  item: SearchResultItem;
  navigation: any;
}

const ResultItem = ({item, navigation}: ItemProps) => {
  const clickHandler = () => {
    const convertItem: Item = {
      action: {
        action: 'watch',
        browseId: '',
        watchId: item.watchId,
        playlistId: '',
      },
      displayType: 'compact',
      artworkUrl: item.artworkURL,
      subtitle: item.subtitle,
      title: item.title,
    };
    startPlayerHandler(convertItem, navigation);
  };
  return (
    <TouchableOpacity
      className="flex flex-row gap-6 items-center"
      onPress={() => clickHandler()}>
      <View
        className="relative overflow-hidden flex h-10 w-10 bg-gray-900 rounded-md justify-center
        items-center">
        <FastImage
          source={{uri: item.artworkURL}}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        />
      </View>
      <View className="flex flex-col">
        <Text numberOfLines={1} className="text-gray-50 font-bold">
          {item.title}
        </Text>
        <Text numberOfLines={1} className="text-gray-200">
          {item.subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function ResultSection({title, results}: SearchResult) {
  const navigation = useContext(NavigationContext);
  return (
    <View>
      <Text className="text-gray-50 text-xl mb-4">{title}</Text>

      <FlatList
        ItemSeparatorComponent={() => <View className="h-4" />}
        data={results}
        keyExtractor={item => item.watchId + item.title + item.subtitle}
        renderItem={({item}) => (
          <ResultItem item={item} navigation={navigation} />
        )}
      />
    </View>
  );
}
