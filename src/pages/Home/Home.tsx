import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, View, Text, FlatList } from 'react-native';
import { Account, MusicShelf } from '../../api/types';
import { AppContext, AppCtxType } from '../../common/AppContextProvider';
import TopBar from '../../common/components/TopBar';
import SongCard from './components/SongCard';
import { getUserName } from './data';
import accountProvider from '../../api/accountProvider';
import musicShelfProvider from '../../api/musicShelfProvider';
import { ReqContext } from '../../api/general';
import ReactNativeConfig from '../../../react-native.config';

// import theme from '../../common/theme_styles';

const mockRecommendedData = [
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
];

export default function Home() {
  const [accountDisplay, setAccountDisplayState]: [Account, any] = useState({ username: "", pbThumbnailUrl: "" });
  const [musicShelfs, setMusicShelfs]: [MusicShelf[], any] = useState([]);
  const appCtx = useContext(AppContext) as AppCtxType;
  useEffect(() => {
    const fetchData = async () => {
      const ctx: ReqContext = {
        cookies: appCtx.getCookieStore()!
      };
      const account = await accountProvider.fetch(ctx);
      const musicShelf = await musicShelfProvider.fetch(ctx, "Home");
      console.log(musicShelf);
      setMusicShelfs(musicShelf ? musicShelf : []);
      setAccountDisplayState(account);
    };
    fetchData();

  }, [appCtx]);



  return (
    <SafeAreaView className="w-full h-full bg-neutral-300 dark:bg-black">
      <ScrollView>

        <View className="h-16 w-full">
          <View className="mt-5">
            <Text className="text-neutral-900 dark:text-slate-50 text-base font-thin">

              Hello <Text className="">
                {accountDisplay.username}
              </Text>
            </Text>
          </View>

          <React.StrictMode>
            {musicShelfs.map((shelf: MusicShelf, shelfIndex) => {
              if (shelf.cards.length == 0) {
                return;
              }

              return (
                <View className="mt-3" key={"musicShelf-" + shelfIndex.toString()} >
                  <Text key={"musicShelf-" + shelfIndex.toString()}
                    className="text-neutral-900 dark:text-sky-50 text-lg font-semibold">{shelf.title}</Text>
                  <View className="mt-2" >
                    <FlatList horizontal
                      key={"musicShelf-" + shelfIndex.toString()}
                      data={shelf.cards}
                      renderItem={SongCard}
                      keyExtractor={(item) => item.id}
                      ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
                      showsHorizontalScrollIndicator={false}
                      className="h-44 overflow-hidden"
                    />
                  </View>
                </View>
              )
            })}

          </React.StrictMode>
        </View>

      </ScrollView>
    </SafeAreaView >
  );
}
