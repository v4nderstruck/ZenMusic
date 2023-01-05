import React from 'react';
import {NavigationContext} from '@react-navigation/native';
import {useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Item} from '../../../common/Providers/MusicShelfProvider';
import {startPlayerHandler} from '../../../trackPlayer/handlers';

export interface GenericCardProps {
  item: Item;
  mini?: boolean;
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
        <TouchableOpacity onPress={() => startPlayerHandler(item, navigation)}>
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
      <TouchableOpacity onPress={() => startPlayerHandler(item, navigation)}>
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
