import store, { RootState } from "../../states/Store";
import { APIKEY } from "../constants";
import { HttpProviderCommon, pickGuard, ProviderContext } from "../ProviderCommon";

const endpointUrl = `https://music.youtube.com/youtubei/v1/music/get_search_suggestions?key=${APIKEY}&prettyPrint=false`;

const defaultEndpointPayload = {
  input: "",
  context: {
    client: {
      clientName: 'WEB_REMIX',
      clientVersion: '1.20221128.01.00',
    },
  },
};


const providerCommon = new HttpProviderCommon(endpointUrl);

function pickSuggestionList(obj: any): SearchSuggestion[] {
  function pickText(item: any): String {
    const suggest: any[] | null = pickGuard(
      item,
      ["suggestion", "runs"],
      Array.isArray
    );
    if (suggest == null)
      return ""
    return suggest.map(i => i.text).join("") as String
  }

  function pickSuggest(item: any): SearchSuggestion | null {
    const historySuggest: any | null = pickGuard(
      item,
      ["historySuggestionRenderer"],
      (_it) => true
    );
    const newSuggest: any | null = pickGuard(
      item,
      ["searchSuggestionRenderer"],
      (_it) => true
    );
    const g = historySuggest || newSuggest || null;
    if (g == null)
      return null

    const res: SearchSuggestion = {
      text: pickText(g),
      query: pickGuard(g, ["navigationEndpoint", "searchEndpoint", "query"], (_) => true) || ""
    }
    return res
  }

  const contents: any[] | null = pickGuard(obj, ["contents"], Array.isArray);
  if (contents == null)
    return []
  const suggestions: any[] | null = pickGuard(
    contents[0],
    ["searchSuggestionsSectionRenderer", "contents"],
    Array.isArray
  );
  if (suggestions == null)
    return []

  const res = []
  for (const item of suggestions) {
    const s = pickSuggest(item)
    if (s)
      res.push(s)
  }
  return res;
}

export interface SearchSuggestion {
  text: String,
  query: String,
}

export default {
  async fetch(input: String): Promise<SearchSuggestion[]> {
    defaultEndpointPayload.input = input as string;
    const state: RootState = store.getState();

    const ctx: ProviderContext = {
      cookie: state.session.cookieHeader,
      sapisid: state.session.SAPISID,
      payload: JSON.stringify(defaultEndpointPayload),
    };

    try {
      const obj = await providerCommon.fetchEndPoint(ctx);
      return pickSuggestionList(obj)
    } catch (e) {
      console.log(e)
      return []
    }

  }
}
