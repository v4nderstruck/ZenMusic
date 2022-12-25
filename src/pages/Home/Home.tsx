import { useEffect, useState } from 'react';
import { ScrollView, SafeAreaView, View, Text, FlatList } from 'react-native';
import MusicShelfProvider, {
  MusicShelf,
} from '../../common/Providers/MusicShelfProvider';
import UserProvider, { User } from '../../common/Providers/UserProvider';
import TrackPlayerOverlay from '../../trackPlayer/trackPlayerOverlay';
import QuickSearch from './components/QuickSearch';
import ShelfRenderer from './components/ShelfRenderer';

export default function Home() {
  const [user, setUser] = useState<User>({ username: '' });
  const [musicShelf, setMusicShelf] = useState<MusicShelf[]>([]);
  const [verticalMomentum, setVerticalMomentum] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      const user_ = await UserProvider.fetch();
      const music_ = await MusicShelfProvider.fetch();
      setMusicShelf(music_);
      setUser(user_);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView className="w-full h-full bg-black">
      <View className="w-full h-full bg-black">
        <View className='absolute bottom-0 left-0 bg-black pt-2 w-full z-10'>
          <TrackPlayerOverlay />
        </View>
        <FlatList
          ListHeaderComponent={() => {
            return (
              <View className='relative z-50'>
                <Text className="text-2xl font-bold text-neutral-200">
                  Hello
                  <Text className="text-indigo-800">{' ' + user.username}</Text>
                </Text>
                <View className='relative z-50' >
                  <QuickSearch />
                </View>
              </View>
            );
          }}
          ListHeaderComponentStyle={{ zIndex: 99 }}
          onMomentumScrollBegin={() => setVerticalMomentum(true)}
          onEndReached={({ distanceFromEnd }) => {
            if (verticalMomentum && distanceFromEnd <= 0) {
              MusicShelfProvider.fetch().then(music_ => {
                console.log(music_);
                setMusicShelf(musicShelf.concat(music_));
              });
              setVerticalMomentum(false);
            }
          }}
          keyExtractor={(item) => `${item.title}`}
          data={musicShelf}
          renderItem={({ item }) => {
            return (
              <View className="relative z-[5] mt-6">
                <Text className="text-indigo-100 font-semibold text-xl">
                  {item.title}
                </Text>
                <View className="mt-2">
                  <ShelfRenderer
                    shelf={item.msItem}
                    renderStyle={item.renderStyle}
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
