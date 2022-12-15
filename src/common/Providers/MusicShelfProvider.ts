import store, { RootState } from "../../states/Store";
import { APIKEY } from "../constants";
import { HttpProviderCommon, pickGuard, ProviderContext } from "../ProviderCommon";

const endpointUrl = `https://music.youtube.com/youtubei/v1/browse?key=${APIKEY}&prettyPrint=false`;

const defaultEndpointPayload = {
  browsId: "FEmusic_home",
  context: {
    client: {
      clientName: 'WEB_REMIX',
      clientVersion: '1.20221128.01.00',
    }
  }
};

const providerCommon = new HttpProviderCommon(endpointUrl);

export interface ItemAction {
  action: "browse" | "watch",
  browseId: String,
  watchId: String,
  playlistId: String,
}

export interface Item {
  displayType: "max" | "compact",
  artworkUrl: String,
  title: String,
  subtitle: String,
  action: ItemAction,
}

export interface MusicShelf {
  title: String,
  renderStyle: "scroll" | "stack",
  msItem: Item[]
}

function pickMSTitle(obj: any): String {
  const runs: any[] | null = pickGuard(obj, ["musicCarouselShelfRenderer", "header",
    "musicCarouselShelfBasicHeaderRenderer", "title", "runs"], Array.isArray);
  if (runs) {
    return runs[0].text;
  }
  return "";
}

function pickMSRenderStyle(itemList: any): "scroll" | "stack" {
  if (itemList.musicResponsiveListItemRenderer !== undefined) {
    return "stack";
  }
  return "scroll";
}

function pickMSAction(item: any): ItemAction {
}

function pickMSItemList(itemList: any[]): Item[] {
  const parsedItems: Item[] = [];
  for (const item of itemList) {
    if (item.musicResponsiveListItemRenderer !== undefined) {
      // display stacked,
      const thisItem: Item = {
        displayType: "compact",
        title: (() => {
          const flex: any[] | null = pickGuard(item, ["musicResponsiveListItemRenderer", "flexColumns"], Array.isArray);
          if (!flex)
            return "" as String;
          const runs: any[] | null = pickGuard(flex[0], ["musicResponsiveListItemFlexColumnRenderer", "text", "runs"], Array.isArray);
          if (!runs)
            return "" as String;
          return runs[0].text as String;
        })(),
        subtitle: (() => {
          const flex: any[] | null = pickGuard(item, ["musicResponsiveListItemRenderer", "flexColumns"], Array.isArray);
          if (!flex)
            return "" as String;
          return flex.slice(1).map((it) => {
            const runs: any[] | null = pickGuard(it, ["musicResponsiveListItemFlexColumnRenderer", "text", "runs"], Array.isArray);
            if (!runs)
              return "";
            return runs[0].text;
          }).join(" ") as String;
        })(),
        artworkUrl: (() => {
          const art: any[] | null = pickGuard(item,
            ["musicResponsiveListItemRenderer", "thumbnail", "musicThumbnailRenderer", "thumbnail", "thumbnails"],
            Array.isArray);
          if (!art)
            return "" as String;
          return art[0].url as String;
        })(),
        action: pickMSAction(item)
      };
      parsedItems.push(thisItem);
    }
    if (item.musicTwoRowItemRenderer !== undefined) {
      const thisItem: Item = {
        displayType: "compact",
        title: (() => {
          const runs: any[] | null = pickGuard(item, ["musicTwoRowItemRenderer", "title", "runs"], Array.isArray);
          if (!runs)
            return "" as String;
          return runs[0].text as String;
        })(),
        subtitle: (() => {
          const runs: any[] | null = pickGuard(item, ["musicTwoRowItemRenderer", "subtitle", "runs"], Array.isArray);
          if (!runs)
            return "" as String;
          return runs.map((it) => it.text).join(" ") as String;
        })(),
        artworkUrl: (() => {
          const arts: any[] | null = pickGuard(item,
            ["musicTwoRowItemRenderer", "thumbnailRenderer", "musicThumbnailRenderer",
              "thumbnail", "thumbnails"], Array.isArray);
          if (!arts)
            return "" as String;
          return arts[0].text as String;
        })(),
        action: pickMSAction(item)
      }
    }
  }
  return parsedItems;
}

function pickContinuationToken(obj: any): String {
  return "";
}

export default {
  fetch(): Promise<MusicShelf[]> {
    const state: RootState = store.getState();
    const ctx: ProviderContext = {
      cookie: state.session.cookieHeader,
      sapisid: state.session.SAPISID,
      payload: JSON.stringify(defaultEndpointPayload),
    };

    const obj = providerCommon.fetchEndPoint(ctx);
    const newShelf: any[] | null = pickGuard(obj, ["contents", "singleColumnBrowseResultsRenderer", "tabs"], Array.isArray);
    const continuationShelf: any[] | null = pickGuard(obj, ["continuationContents", "sectionListContinuation", "contents"], Array.isArray)

    const musicShelfList: MusicShelf[] = [];
    if (newShelf) {
      const contents: any[] | null = pickGuard(newShelf[0], ["tabRenderer", "content", "sectionListRenderer", "contents"], Array.isArray);
      if (contents) {
        for (const content of contents) {
          const itemList: any[] | null = pickGuard(content, ["musicCarouselShelfRenderer", "contents"], Array.isArray);
          if (itemList) {
            const musicShelf: MusicShelf = {
              title: pickMSTitle(content),
              renderStyle: pickMSRenderStyle(content),
              msItem: pickMSItemList(itemList)
            };
            musicShelfList.push(musicShelf)
          }
        }
      }
    }
    else if (continuationShelf) {
      for (const content of continuationShelf) {
        const itemList: any[] | null = pickGuard(content, ["musicCarouselShelfRenderer", "contents"], Array.isArray);
        if (itemList) {
          const musicShelf: MusicShelf = {
            title: pickMSTitle(content),
            renderStyle: pickMSRenderStyle(content),
            msItem: pickMSItemList(itemList)
          };
          musicShelfList.push(musicShelf)
        }
      }
    }
    return musicShelfList;
  }
}
