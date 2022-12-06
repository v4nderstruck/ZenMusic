import { Text, View } from "react-native"
import FastImage from "react-native-fast-image"

function compactString(t: String, len: number): String {
  if (t.length > len) {
    return `${t.slice(0, len)}...`;
  } else {
    return t;
  }
}

export interface MusicCarouselProps {
  thumbnailUrl: String,
  title: String,
  subtitle: String,
}

export default function MusicCarousel({ title, subtitle, thumbnailUrl }: MusicCarouselProps) {
  return (
    <View className="w-full h-full flex flex-col items-center">
      <FastImage
        className="w-[80%] h-[75%] rounded-lg"
        source={{
          uri: `${thumbnailUrl}`
        }}
      />
      <View className="mt-4">
        <Text className="text-black dark:text-neutral-200 font-semibold">{compactString(title, 45)}</Text>
      </View>
      <View className="mt-1">
        <Text className="text-black dark:text-neutral-200 font-thin">{compactString(subtitle, 50)}</Text>
      </View>
    </View>
  )
}
