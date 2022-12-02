import { APIKEY } from "../common/apikey";
import { getAuthToken, getCookies, ReqContext } from "./general";
import { defaultReqPayloadContext, MusicCard, MusicShelf, ReqPayload } from "./types"

const apiEndpoint = "https://music.youtube.com/youtubei/v1/browse"

async function internalFetch(ctx: ReqContext, req: ReqPayload): Promise<MusicShelf[] | null> {
  const response = await fetch(
    `${apiEndpoint}?key=${APIKEY}&prettyPrint=false`,
    {
      method: 'POST',
      headers: {
        'Referer': 'https://music.youtube.com',
        'Origin': 'https://music.youtube.com',
        'authorization': getAuthToken(ctx.cookies),
        'Cookie': getCookies(ctx.cookies),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req),
    }
  );
  try {
    const obj = await response.json();
    // interate over shelf objects
    let musicShelfs: MusicShelf[] = [];
    for (const shelf of obj.contents
      .singleColumnBrowseResultsRenderer
      .tabs[0]
      .tabRenderer
      .content
      .sectionListRenderer
      .contents) {
      let musicShelf: MusicShelf = {
        title: shelf.musicCarouselShelfRenderer
          .header
          .musicCarouselShelfBasicHeaderRenderer
          .title
          .runs[0]
          .text,
        cards: []
      };

      for (const card of shelf.musicCarouselShelfRenderer.contents) {
        try {
          const musicCard: MusicCard = {
            title: card.musicTwoRowItemRenderer.title.runs[0].text,
            videoId: card.musicTwoRowItemRenderer.navigationEndpoint.watchEndpoint.videoId,
            artist: card.musicTwoRowItemRenderer.subtitle.runs[0].text, // more precise checks on this
            views: card.musicTwoRowItemRenderer.subtitle.runs[2].text, // more precise checks on this

          };
          musicShelf.cards.push(musicCard);
        } catch (e) {
          continue;
        }
      }
      musicShelfs.push(musicShelf);
    }
    return musicShelfs;
  } catch (error) {
    console.log("Failed to get browse ", error);
    return null;
  }
  return null;
}

export default {
  fetch(ctx: ReqContext, tab: String): Promise<MusicShelf[] | null> {
    let reqPayload: ReqPayload;
    switch (tab) {
      case "Home":
        reqPayload = {
          browseId: "FEmusic_home",
          context: defaultReqPayloadContext
        };
        break;
      case "Explore":
        reqPayload = {
          browseId: "FEmusic_explore",
          context: defaultReqPayloadContext
        };
        break;
      case "Library":
        reqPayload = {
          browseId: "FEmusic_liked_playlists",
          context: defaultReqPayloadContext
        };
        break;
      default:
        return new Promise(() => { return null; });
    }
    return internalFetch(ctx, reqPayload);
  },
}
