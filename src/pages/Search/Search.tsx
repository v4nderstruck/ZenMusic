import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import ResultSection from './components/ResultSection';

export default function SearchPage({route, navigation}: any) {
  const search = route.params;
  return (
    <SafeAreaView className="w-full h-full bg-black">
      <View className="w-full flex flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="ios-chevron-back-outline" color="white" size={36} />
        </TouchableOpacity>
        <View className="grow flex flex-row justify-center">
          <Text className="text-white font-bold text-2xl">Results</Text>
        </View>
      </View>
      <FlatList
        data={search.search}
        ItemSeparatorComponent={() => <View className="h-10" />}
        renderItem={({item}) => (
          <View className="ml-4">
            <ResultSection title={item.title} results={item.results} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
