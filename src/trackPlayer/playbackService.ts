import TrackPlayer, {Event} from 'react-native-track-player';

export default async function playbackService() {
  TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, async event => {
    // manually go to next track because streaming library does not
    // know proper duration
    if (event.track !== null && event.track !== undefined) {
      // memo this? dunno how compute intensive it is
      const track = await TrackPlayer.getTrack(event.track);
      if (track != null && track.duration !== undefined) {
        if (track.duration <= event.position) {
          await TrackPlayer.skipToNext();
        }
      }
    }
  });
}
