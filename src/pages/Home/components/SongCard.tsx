import { View, Text, Image } from "react-native";
import FastImage from "react-native-fast-image";
import { MusicCard } from "../../../api/types";

export interface SongCardProbs {
  id: String,
  title: String,
  artist: String,
  duration: number,
  clicks: number,
}

function compactClicks(n: number): String {
  if (n < 1000)
    return `${n}`;
  if (n < 1_000_000) {
    let i = Math.round((n / 1000) * 10) / 10;
    return `${i}K`
  }
  if (n < 1_000_000_000) {
    let i = Math.round((n / 1_000_000) * 10) / 10;
    return `${i}M`
  }
  let i = Math.round((n / 1_000_000_000) * 10) / 10;
  return `${i}B`
}

function compactString(t: String, len: number): String {
  if (t.length > len) {
    return `${t.slice(0, len)}...`;
  } else {
    return t;
  }
}

function compactTime(t: number): String {
  let hours = Math.floor(t / 3600);
  let min = Math.floor((t - (hours * 3600)) / 60);
  let seconds = (t - (hours * 3600) - (min * 60));

  let str_hours = hours.toString().padStart(2, '0');
  let str_min = min.toString().padStart(2, '0');
  let str_seconds = seconds.toString().padStart(2, '0');
  if (hours > 0) {
    return `${str_hours}:${str_min}:${str_seconds}`;
  }
  return `${str_min}:${str_seconds}`;
}

export default function SongCard({ item, index, separators }: any) {

  const { title, id, subtitle, thumbnailUrl } = item as MusicCard;
  return (
    <View className="w-64 h-44 flex flex-col overflow-hidden 
      border-0 border-solid border-slate-300 dark:border-slate-200 rounded-sm">
      <View className="h-[75%] w-full flex flex-col justify-end items-end">
        {thumbnailUrl ? (
          <FastImage source={{
            uri: thumbnailUrl
          }}
            className="absolute w-full h-full rounded-sm"
          />
        ) : (

          <Image source={require("../mock/rick_astley_mock.jpeg")}
            className="absolute w-full h-full rounded-sm"
          />
        )}
      </View>
      <View className="mt-2">
        <Text className="text-black dark:text-neutral-200 font-semibold">{compactString(title, 30)}</Text>
        <View className="flex flex-row justify-between w-full">
          <Text className="text-black dark:text-neutral-200 font-thin">{compactString(subtitle, 45)}</Text>
        </View>
      </View>
    </View>
  );
}
