import { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList } from 'react-native';
import MusicShelfProvider, { MusicShelf } from '../../common/Providers/MusicShelfProvider';
import UserProvider, { User } from '../../common/Providers/UserProvider';
import GenericCard from './components/GenericCard';
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
        <Text className="text-2xl font-bold text-neutral-200">
          Hello
          <Text className="text-indigo-800">{' ' + user.username}</Text>
        </Text>
        <FlatList
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
          keyExtractor={(item, index) => `${item.title}`}
          data={musicShelf}
          renderItem={({ item, index, separators }) => {
            return (
              <View className='mt-6'>
                <Text className='text-indigo-100 font-semibold text-xl'>{item.title}</Text>
                <View className='mt-2'>
                  <ShelfRenderer shelf={item.msItem} renderStyle={item.renderStyle} />
                </View>
              </View>
            )
          }}
        />
      </View>
    </SafeAreaView>
  );
}
