import store, {RootState} from '../../states/Store';
import {APIKEY} from '../constants';
import {
  HttpProviderCommon,
  pickGuard,
  ProviderContext,
} from '../ProviderCommon';
import {Item} from './MusicShelfProvider';

const endpointUrl = `https://music.youtube.com/youtubei/v1/next?key=${APIKEY}&prettyPrint=false`;

const defaultEndpointPayload = {
  isAudioOnly: true,
  playlistId: '',
  continuation: '',
  context: {
    client: {
      clientName: 'WEB_REMIX',
      clientVersion: '1.20221128.01.00',
    },
  },
};

export interface Playlist {
  items: Item[];
}

function pickPlaylist(obj: any): Playlist {
  function pickArtworkUrl(item: any): String {
    const thumbnails: any[] | null = pickGuard(
      item,
      ['playlistPanelVideoRenderer', 'thumbnail', 'thumbnails'],
      Array.isArray,
    );
    if (thumbnails == null) {
      return '';
    }
    return thumbnails[0].url as String;
  }
  function pickTitle(item: any): String {
    const runs: any[] | null = pickGuard(
      item,
      ['playlistPanelVideoRenderer', 'title', 'runs'],
      Array.isArray,
    );
    if (runs == null) {
      return 'Unknown Title';
    }
    return runs[0].text as String;
  }
  function pickArtist(item: any): String {
    const runs: any[] | null = pickGuard(
      item,
      ['playlistPanelVideoRenderer', 'shortBylineText', 'runs'],
      Array.isArray,
    );
    if (runs == null) {
      return 'Unknown Artist';
    }
    return runs.map(i => i.text).join(' ');
  }
  function pickWatchId(item: any): String {
    const watchId: String | null = pickGuard(
      item,
      ['playlistPanelVideoRenderer', 'videoId'],
      _i => true,
    );
    return watchId || '';
  }
  function pickPlaylistId(item: any): String {
    const playlistId: String | null = pickGuard(
      item,
      [
        'playlistPanelVideoRenderer',
        'navigationEndpoint',
        'watchEndpoint',
        'playlistId',
      ],
      _i => true,
    );
    return playlistId || '';
  }

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
  if (tabs == null) {
    return {items: []};
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
    return {items: []};
  }

  const playlist: Playlist = {
    items: [],
  };
  for (const content of contents) {
    const item: Item = {
      displayType: 'compact',
      title: pickTitle(content),
      subtitle: pickArtist(content),
      artworkUrl: pickArtworkUrl(content),
      action: {
        action: 'watch',
        browseId: '',
        watchId: pickWatchId(content),
        playlistId: pickPlaylistId(content),
      },
    };
    playlist.items.push(item);
  }
  return playlist;
}

const providerCommon = new HttpProviderCommon(endpointUrl);

export default {
  setPlaylistId(id: String) {
    defaultEndpointPayload.playlistId = id as string;
  },

  // seems take ctoken can simply a random string?
  async fetch(ctoken: string): Promise<Playlist> {
    defaultEndpointPayload.continuation = ctoken;
    if (defaultEndpointPayload.playlistId === '') {
      return {items: []};
    }

    const state: RootState = store.getState();

    const ctx: ProviderContext = {
      cookie: state.session.cookieHeader,
      sapisid: state.session.SAPISID,
      payload: JSON.stringify(defaultEndpointPayload),
    };

    const obj = await providerCommon.fetchEndPoint(ctx);
    return pickPlaylist(obj);
  },
};
