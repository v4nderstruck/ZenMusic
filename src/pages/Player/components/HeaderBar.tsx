import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export interface HeaderBarProps {
  // what about adding like
  navigation: any;
}

export default function HeaderBar({navigation}: HeaderBarProps) {
  return (
    <View className="w-full flex flex-row justify-between items-center">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="chevron-back-outline" size={42} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        className="mr-3"
        onPress={() => navigation.navigate('PlaylistPage')}>
        <MaterialIcon name="playlist-play" size={42} color="white" />
      </TouchableOpacity>
    </View>
  );
}
