import { Text, SafeAreaView, View } from "react-native";
import { MusicCard } from "../../api/types";
import HeaderBar from "./components/HeaderBar";
import MusicCarousel from "./components/MusicCarousel";
import PlayerControls from "./components/PlayerControls";


export default function Player({ route, navigation }: any) {
  const { id, title, thumbnailUrl, subtitle } = route.params as MusicCard;
  return (
    <SafeAreaView className="w-full h-full bg-neutral-300 dark:bg-black">
      <HeaderBar navigation={navigation} />
      <View className="mt-12 w-full h-[65%]">
        <MusicCarousel thumbnailUrl={thumbnailUrl} title={title} subtitle={subtitle} />
      </View>
      <View className="w-full h-[20%]">
        <PlayerControls />
      </View>
    </SafeAreaView>
  )
}
