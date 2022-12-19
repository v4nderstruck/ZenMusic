import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';

interface MusicCarouselProps {
  artwork: String;
  title: String;
  artist: String;
}

export default function MusicCarousel() {
  const [musicCarousel, setMusicCarousel] = useState<MusicCarouselProps>();
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    console.log(event);
    const currentTrack = event.nextTrack;
    if (event.type === Event.PlaybackTrackChanged && currentTrack != null) {
      const track = await TrackPlayer.getTrack(currentTrack);
      console.log(track);
      const { title, artist, artwork } = track || {};
      const mc = {
        title: title || "",
        artist: artist || "",
        artwork: artwork?.toString() || "",
      };
      setMusicCarousel(mc);
    }
  });
  useEffect(() => {
    const fetchData = async () => {
      const currentTrack = await TrackPlayer.getCurrentTrack();
      if (currentTrack != null) {
        const track = await TrackPlayer.getTrack(currentTrack);
        console.log(track);
        const { title, artist, artwork } = track || {};
        const mc = {
          title: title || "",
          artist: artist || "",
          artwork: artwork?.toString() || "",
        };
        setMusicCarousel(mc);
      }
    };
    fetchData();
  }, []); // inital fetch because hook not existing yet??

  if (musicCarousel) {
    console.log(musicCarousel);
    return (
      <View className="w-full h-full flex flex-col items-center">
        <FastImage
          className="w-[80%] h-[75%] rounded-lg"
          source={{
            uri: `${musicCarousel.artwork}`,
          }}
        />
        <View className="mt-4 overflow-hidden">
          <Text className="text-black dark:text-neutral-200 font-semibold">
            {musicCarousel.title}
          </Text>
        </View>
        <View className="mt-1 overflow-hidden">
          <Text className="text-black dark:text-neutral-200 font-thin">
            {musicCarousel.artist}
          </Text>
        </View>
      </View>
    );
  }
  return <></>;
}
