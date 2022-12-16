import { Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { Item } from "../../../common/Providers/MusicShelfProvider";

export interface GenericCardProps {
  item: Item,
  mini?: boolean
}

export default function GenericCard({ item, mini }: GenericCardProps) {
  const [sizeX, sizeY] = mini ? [200, 100] : (item.displayType === "compact" ? [140, 160] : [180, 160]);
  return (
    <View className="overflow-hidden" style={{ width: sizeX, height: sizeY }}>
      <TouchableOpacity>
        <FastImage
          source={{ uri: `${item.artworkUrl}` }}
          style={{ width: sizeX, height: sizeY - 30 }}
        />
        <Text className="text-neutral-100 font-bold text-xs">{item.title}</Text>
        <Text className="text-gray-200 font-thin text-xs">{item.subtitle}</Text>
      </TouchableOpacity>
    </View>
  )
}
