import { Button, Text, TouchableOpacity, View } from "react-native";
import { MusicCard } from "../../../api/types";
import Icon from 'react-native-vector-icons/Ionicons';

export interface HeaderBarProps {
  // what about adding like 
  title: String,
  navigation: any,
}

function compactString(t: String, len: number): String {
  if (t.length > len) {
    return `${t.slice(0, len)}...`;
  } else {
    return t;
  }
}

export default function HeaderBar({ title, navigation }: HeaderBarProps) {
  return (
    <View className="ml-3 mr-3 w-full flex flex-row justify-between items-center">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-circle-outline" size={42} color="white" />
      </TouchableOpacity>
      <Text className="text-neutral-900 dark:text-slate-50 text-xl font-semibold">
        {compactString(title, 24)}
      </Text>
      <TouchableOpacity className="mr-3">
        <Icon name="heart-outline" size={42} color="white" />
      </TouchableOpacity>
    </View>
  )
}
