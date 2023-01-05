import TrackPlayer from 'react-native-track-player';
import ItemInfoProvider from '../common/Providers/ItemInfoProvider';
import {Item} from '../common/Providers/MusicShelfProvider';
import PlaylistProvider from '../common/Providers/PlaylistProvider';
import TrackProvider from '../common/Providers/TrackProvider';

export function startPlayerHandler(item: Item, navigation: any) {
  (async () => {
    navigation.navigate('PlayerPage');
    try {
      let playGo = true;
      await TrackPlayer.reset();
      let upcoming = null;
      if (item.action.action === 'watch') {
        ItemInfoProvider.setWatchId(item.action.watchId as string);
        upcoming = await ItemInfoProvider.fetch();
        if (upcoming !== null) {
          const trackItem = await TrackProvider.fetch(item);
          if (trackItem == null) {
            return;
          }
          await TrackPlayer.add([trackItem]);
          await TrackPlayer.play();
          playGo = false;
        }
      }
      PlaylistProvider.setPlaylistId(
        upcoming?.playlistId || item.action.browseId,
      );
      const playlistItems = await PlaylistProvider.fetch('');
      for (const p of playlistItems.items) {
        const track = await TrackProvider.fetch(p);
        if (track) {
          await TrackPlayer.add([track]);
          if (playGo) {
            await TrackPlayer.play();
            playGo = false;
          }
        }
      }
      return;
    } catch (e) {
      console.log('Click handler ', e);
    }
  })();
}
