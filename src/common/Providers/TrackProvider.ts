import {Track} from 'react-native-track-player';
import store, {RootState} from '../../states/Store';
import {
  HttpProviderCommon,
  pickGuard,
  ProviderContext,
} from '../ProviderCommon';
import {Item} from './MusicShelfProvider';

const MUSIC_API_ENDPOINT = 'https://invidio.xamh.de/latest_version';
const ITAG = 140;
const INFO_API_ENDPOINT =
  'https://music.youtube.com/youtubei/v1/player?key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30&prettyPrint=false';

const defaultEndpointPayload = {
  videoId: '',
  context: {
    client: {
      clientName: 'WEB_REMIX',
      clientVersion: '1.20221128.01.00',
    },
  },
};

function pickDuration(obj: any): number {
  return (
    parseInt(
      pickGuard(obj, ['videoDetails', 'lengthSeconds'], _i => true) as string,
      10,
    ) || Number.MAX_VALUE
  );
}

function pickArtist(obj: any): string {
  return (
    (pickGuard(obj, ['videoDetails', 'author'], _i => true) as string) || ''
  );
}

function pickTitle(obj: any): string {
  return (
    (pickGuard(obj, ['videoDetails', 'title'], _i => true) as string) || ''
  );
}

function pickArtwork(obj: any): string {
  const tb: any[] | null = pickGuard(
    obj,
    ['videoDetails', 'thumbnail', 'thumbnails'],
    _i => true,
  );
  if (!tb) {
    return '';
  }
  return tb[0].url as string;
}

const providerCommon = new HttpProviderCommon(INFO_API_ENDPOINT);
export default {
  async fetch(item: Item): Promise<Track | null> {
    const state: RootState = store.getState();
    defaultEndpointPayload.videoId = item.action.watchId as string;

    const ctx: ProviderContext = {
      cookie: state.session.cookieHeader,
      sapisid: state.session.SAPISID,
      payload: JSON.stringify(defaultEndpointPayload),
    };

    try {
      const obj = await providerCommon.fetchEndPoint(ctx);

      const track: Track = {
        url:
          MUSIC_API_ENDPOINT + '?id=' + item.action.watchId + '&itag=' + ITAG,
        duration: pickDuration(obj),
        title: pickTitle(obj),
        artist: pickArtist(obj),
        artwork: pickArtwork(obj),
      };
      return track;
    } catch (e) {
      console.log('TrackProvider ', e);
      return null;
    }
  },
};
