import React from 'react';
import { FlatList, Text, View } from 'react-native';
import SongCard, { SongCardProbs } from '../../pages/Home/components/SongCard';

export interface TopBarProps {
  title: String,
  username: String

}

const mockRecommendedData: SongCardProbs[] = [
  {
    id: "0",
    title: "Never gonna give you up",
    artist: "Rick Astley",
    duration: 189,
    clicks: 10000000,
  },
  {
    id: "2",
    title: "Never gonna give you up",
    artist: "Rick Astley",
    duration: 3789,
    clicks: 10000000,
  },
  {
    id: "3",
    title: "Never gonna give you up",
    artist: "Rick Astley very very",
    duration: 189,
    clicks: 10000000,
  },
  {
    id: "4",
    title: "Never gonna give you up very very very very long",
    artist: "Rick Astley",
    duration: 189,
    clicks: 10000000,
  },
]

export default function TopBar({ title, username }: TopBarProps) {

  return (
    <View className="h-16 w-full">
      <View className="mt-5">
        <Text className="text-neutral-900 dark:text-slate-50 text-base font-thin">
          Hello <Text className="">
            {username}!
          </Text>
        </Text>
      </View>

      <View className="mt-3">
        <Text className="text-neutral-900 dark:text-sky-50 text-lg font-semibold">Recommended</Text>
        <View className="mt-2">
          <FlatList horizontal
            data={mockRecommendedData}
            renderItem={SongCard}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
            showsHorizontalScrollIndicator={false}
            className="h-44 overflow-hidden"
          />
        </View>
      </View>

    </View>
  );
}
