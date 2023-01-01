import store, {RootState} from '../../states/Store';
import {APIKEY} from '../constants';
import {
  HttpProviderCommon,
  pickGuard,
  ProviderContext,
} from '../ProviderCommon';

const endpointUrl = `https://music.youtube.com/youtubei/v1/next?key=${APIKEY}&prettyPrint=false`;

const defaultEndpointPayload = {
  isAudioOnly: true,
  videoId: '',
  context: {
    client: {
      clientName: 'WEB_REMIX',
      clientVersion: '1.20221128.01.00',
    },
  },
};

export interface UpcomingInfo {
  playlistId: String;
}

function pickPlaylistId(obj: any): UpcomingInfo | null {
  function internalPickPlaylistId(contents: any): String | null {
    const plId: String | null = pickGuard(
      contents,
      [
        'automixPreviewVideoRenderer',
        'content',
        'automixPlaylistVideoRenderer',
        'navigationEndpoint',
        'watchPlaylistEndpoint',
        'playlistId',
      ],
      _i => true,
    );
    return plId;
  }

  // pick down to content for playlistId
  const tabs: any[] | null = pickGuard(
    obj,
    [
      'contents',
      'singleColumnMusicWatchNextResultsRenderer',
      'tabbedRenderer',
      'watchNextTabbedResultsRenderer',
      'tabs',
    ],
    Array.isArray,
  );
  if (tabs === null) {
    return null;
  }

  const contents: any[] | null = pickGuard(
    tabs[0],
    [
      'tabRenderer',
      'content',
      'musicQueueRenderer',
      'content',
      'playlistPanelRenderer',
      'contents',
    ],
    Array.isArray,
  );
  if (contents == null) {
    return null;
  }
  const playlistId = internalPickPlaylistId(contents[contents.length - 1]);
  if (playlistId == null) {
    return null;
  }

  const upcoming: UpcomingInfo = {
    playlistId: playlistId,
  };
  return upcoming;
}

const providerCommon = new HttpProviderCommon(endpointUrl);
export default {
  setWatchId(id: string) {
    defaultEndpointPayload.videoId = id;
  },

  async fetch(): Promise<UpcomingInfo | null> {
    if (defaultEndpointPayload.videoId === '') {
      return null;
    }

    const state: RootState = store.getState();

    const ctx: ProviderContext = {
      cookie: state.session.cookieHeader,
      sapisid: state.session.SAPISID,
      payload: JSON.stringify(defaultEndpointPayload),
    };

    try {
      const obj = await providerCommon.fetchEndPoint(ctx);
      return pickPlaylistId(obj);
    } catch (e) {
      console.log('ItemInfoProvider', e);
      return null;
    }
  },
};
