import { Text, SafeAreaView, View } from "react-native";
import { MusicCard } from "../../api/types";
import HeaderBar from "./components/HeaderBar";


export default function Player({ route, navigation }: any) {
  const { title } = route.params as MusicCard;
  return (
    <SafeAreaView className="w-full h-full bg-neutral-300 dark:bg-black">
      <View className="w-full">
        <HeaderBar title={title} navigation={navigation} />
      </View>

    </SafeAreaView>
  )
}
