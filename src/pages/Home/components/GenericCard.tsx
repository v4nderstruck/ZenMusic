import { Text, View } from "react-native";
import { Item } from "../../../common/Providers/MusicShelfProvider";

export interface GenericCardProps {
  item: Item,
  mini?: boolean
}

export default function GenericCard({ item }: GenericCardProps) {
  return (
    <View>
      <Text className="text-indigo-100">{item.title}</Text>
    </View>
  )
}
