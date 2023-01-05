import store, {RootState} from '../../states/Store';
import {APIKEY} from '../constants';
import {
  HttpProviderCommon,
  pickGuard,
  ProviderContext,
} from '../ProviderCommon';

const endpointUrl = `https://music.youtube.com/youtubei/v1/search?key=${APIKEY}&prettyPrint=false`;
const defaultEndpointPayload = {
  query: '',
  context: {
    client: {
      clientName: 'WEB_REMIX',
      clientVersion: '1.20221128.01.00',
    },
  },
};

const providerCommon = new HttpProviderCommon(endpointUrl);
export interface SearchResultItem {
  type: 'watch' | 'browse';
  watchId: string;
  broweseId: string;
  title: string;
  subtitle: string;
  artworkURL: string;
}

export interface SearchResult {
  title: string;
  results: SearchResultItem[];
}

function pickResultTitle(content: any): string | null {
  const runs: any[] | null = pickGuard(
    content,
    ['musicShelfRenderer', 'title', 'runs'],
    Array.isArray,
  );
  if (runs == null) {
    return null;
  }
  return runs.map(s => s.text).join('');
}

function pickResultItems(content: any): SearchResultItem[] | null {
  function pickTitles(cont: any): [string | null, string | null] {
    const flexColumns: any[] | null = pickGuard(
      cont,
      ['musicResponsiveListItemRenderer', 'flexColumns'],
      Array.isArray,
    );
    if (flexColumns == null) {
      return [null, null];
    }
    const titles: [string | null, string | null] = [null, null];
    for (let i = 0; i < 2; i++) {
      const text: any[] | null = pickGuard(
        flexColumns[i],
        ['musicResponsiveListItemFlexColumnRenderer', 'text', 'runs'],
        Array.isArray,
      );
      if (text == null) {
        titles[i] = null;
        continue;
      }
      titles[i] = text.map(s => s.text).join('');
    }
    return titles;
  }
  function pickArtwork(cont: any): string {
    const thumbnails: any[] | null = pickGuard(
      cont,
      [
        'musicResponsiveListItemRenderer',
        'thumbnail',
        'musicThumbnailRenderer',
        'thumbnail',
        'thumbnails',
      ],
      Array.isArray,
    );
    if (thumbnails == null) {
      return '';
    }
    return thumbnails[0].url;
  }
  const r_contents: any[] | null = pickGuard(
    content,
    ['musicShelfRenderer', 'contents'],
    Array.isArray,
  );
  if (r_contents == null) {
    return null;
  }
  const items: SearchResultItem[] = [];
  for (const r_content of r_contents) {
    const watchId: string | null = pickGuard(
      r_content,
      ['musicResponsiveListItemRenderer', 'playlistItemData', 'videoId'],
      _s => true,
    );
    const titles = pickTitles(r_content);
    if (titles[0] == null && titles[1] == null) {
      continue;
    }
    const artwork = pickArtwork(r_content);
    items.push({
      type: watchId == null ? 'browse' : 'watch',
      watchId: watchId == null ? '' : watchId,
      broweseId: '',
      title: titles[0] == null ? '' : titles[0],
      subtitle: titles[1] == null ? '' : titles[1],
      artworkURL: artwork,
    });
  }
  return items;
}

function pickSearchResults(obj: any): SearchResult[] | null {
  const tabs: any[] | null = pickGuard(
    obj,
    ['contents', 'tabbedSearchResultsRenderer', 'tabs'],
    Array.isArray,
  );
  if (tabs == null) {
    return null;
  }
  const contents: any[] | null = pickGuard(
    tabs[0],
    ['tabRenderer', 'content', 'sectionListRenderer', 'contents'],
    Array.isArray,
  );
  if (contents == null) {
    return null;
  }
  const results: SearchResult[] = [];
  for (const content of contents) {
    const title = pickResultTitle(content);
    const items = pickResultItems(content);
    if (title == null || items == null) {
      continue;
    }
    results.push({title: title, results: items});
  }
  return results;
}

export default {
  async fetch(query: string): Promise<SearchResult[] | null> {
    const state: RootState = store.getState();

    defaultEndpointPayload.query = query;
    const ctx: ProviderContext = {
      cookie: state.session.cookieHeader,
      sapisid: state.session.SAPISID,
      payload: JSON.stringify(defaultEndpointPayload),
    };

    const obj = await providerCommon.fetchEndPoint(ctx);
    return pickSearchResults(obj);
  },
};
