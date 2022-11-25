import React from 'react';
import { Text, View } from 'react-native';

export interface TopBarProps {
  title: String
}
export default function TopBar({ title }: TopBarProps) {

  return (
    <View className="h-16 w-full ">
      <Text className="text-slate-50 ml-6 text-xl font-bold">{title}</Text>
    </View>
  );
}
