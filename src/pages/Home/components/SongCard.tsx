import { View, Text, Image } from "react-native";

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
  const { id, title, artist, duration, clicks } = item;
  return (
    <View className="w-48 h-40 flex flex-col overflow-hidden 
      border-0 border-solid border-slate-300 dark:border-slate-200 rounded-sm">
      <View className="h-[75%] w-full flex flex-col justify-end items-end">
        <Image source={require("../mock/rick_astley_mock.jpeg")}
          className="absolute w-full h-full rounded-sm"
        />
        <View className="bg-gray-700/60 rounded-lg p-0.5 pl-1 pr-1 m-2">

          <Text className="text-neutral-200">{compactTime(duration)}</Text>
        </View>
      </View>
      <View className="mt-2">
        <Text className="text-black dark:text-neutral-200 font-semibold">{compactString(title, 25)}</Text>
        <View className="flex flex-row justify-between w-full">
          <Text className="text-black dark:text-neutral-200 font-thin">{compactString(artist, 15)}</Text>
          <Text className="text-black dark:text-neutral-200 font-thin">{compactClicks(clicks)} views</Text>
        </View>
      </View>
    </View>
  );
}
