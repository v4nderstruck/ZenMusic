import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Account, MusicShelf} from '../../api/types';
import {AppContext, AppCtxType} from '../../common/AppContextProvider';
import TopBar from '../../common/components/TopBar';
import SongCard from './components/SongCard';
import {getUserName} from './data';
import accountProvider from '../../api/accountProvider';
import musicShelfProvider from '../../api/musicShelfProvider';
import {ReqContext} from '../../api/general';
import ReactNativeConfig from '../../../react-native.config';
import {NavigationProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import TrackPlayer from 'react-native-track-player';
import TrackPlayerOverlay from '../../trackPlayer/trackPlayerOverlay';

// import theme from '../../common/theme_styles';

export type HomeParams = {};

export type HomeProps = NativeStackScreenProps<HomeParams, 'MainPage'>;

function refreshFeed(
  {layoutMeasurement, contentOffset, contentSize}: any,
  triggerContinuation: () => void,
) {
  const paddingToBottom = 0;
  if (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  ) {
    console.log('trigger continuation!');
    triggerContinuation();
  }
}

export default function Home({navigation}: HomeProps) {
  const [accountDisplay, setAccountDisplayState]: [Account, any] = useState({
    username: '',
    pbThumbnailUrl: '',
  });
  const [musicShelfs, setMusicShelfs]: [MusicShelf[], any] = useState([]);
  const [continuation, setContinuation] = useState({token: '', fetch: 0});
  const appCtx = useContext(AppContext) as AppCtxType;
  useEffect(() => {
    const fetchData = async () => {
      const ctx: ReqContext = {
        cookies: appCtx.getCookieStore()!,
      };
      const account = await accountProvider.fetch(ctx);
      setAccountDisplayState(account);
    };
    fetchData();
  }, [appCtx]);

  useEffect(() => {
    const fetchData = async () => {
      const ctx: ReqContext = {
        cookies: appCtx.getCookieStore()!,
      };

      const [musicShelf, ctoken] = await musicShelfProvider.fetch(
        ctx,
        'Home',
        continuation.token,
      );
      console.log('next token ', ctoken);
      setMusicShelfs(musicShelf ? musicShelfs.concat(musicShelf) : musicShelfs);
      setContinuation({token: ctoken, fetch: continuation.fetch});
    };
    fetchData();
  }, [appCtx, continuation.fetch]);

  const triggerRefresh = () => {
    setContinuation({...continuation, fetch: continuation.fetch + 1});
  };

  return (
    <SafeAreaView className="w-full h-full bg-neutral-300 dark:bg-black flex flex-1">
      <View className="w-full absolute bottom-0 bg-black z-[1]">
        <TrackPlayerOverlay />
      </View>
      <View className="">
        <View className="mt-5">
          <Text className="text-neutral-900 dark:text-slate-50 text-base font-thin">
            Hello <Text className="">{accountDisplay.username}</Text>
          </Text>
        </View>

        <FlatList
          onEndReached={() => {
            triggerRefresh();
          }}
          keyExtractor={item => item.title}
          ItemSeparatorComponent={() => <View style={{height: 12}} />}
          showsVerticalScrollIndicator={false}
          className="w-full overflow-hidden"
          data={musicShelfs}
          renderItem={({item}) => {
            if (item.cards.length == 0) {
              return;
            }
            return (
              <View
                className="mt-3"
                key={'musicShelf-' + item.title.toString()}>
                <Text className="text-neutral-900 dark:text-sky-50 text-lg font-semibold">
                  {item.title}
                </Text>
                <View className="mt-2">
                  <FlatList
                    horizontal
                    data={item.cards}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() => {
                          const trackObject = {
                            url: `https://y.com.sb/latest_version?id=${item.id}&itag=140`,
                            artwork: item.thumbnailUrl,
                            title: item.title,
                            artist: item.subtitle,
                          };
                          (async () => {
                            TrackPlayer.reset();
                            await TrackPlayer.add([trackObject]);
                            await TrackPlayer.play();
                          })();
                          navigation.navigate('PlayerPage');
                        }}>
                        <SongCard item={item} />
                      </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => <View style={{width: 16}} />}
                    showsHorizontalScrollIndicator={false}
                    className="h-44 overflow-hidden"
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
