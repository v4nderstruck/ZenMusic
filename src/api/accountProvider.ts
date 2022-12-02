import { CookieManagerStatic } from "@react-native-cookies/cookies";
import { APIKEY } from "../common/apikey";
import { getAuthToken, getCookies, ReqContext } from "./general";
import { Account, ReqPayload, defaultReqPayloadContext } from "./types";


const apiEndpoint = "https://music.youtube.com/youtubei/v1/account/account_menu"


async function internalFetch(ctx: ReqContext, payload: ReqPayload): Promise<Account> {
  const response = await fetch(
    `${apiEndpoint}?key=${APIKEY}&prettyPrint=false`,
    {
      method: 'POST',
      headers: new Headers({
        'Referer': 'https://music.youtube.com',
        'Origin': 'https://music.youtube.com',
        'authorization': getAuthToken(ctx.cookies),
        'Cookie': getCookies(ctx.cookies),
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(payload),
    });

  // 01.12.2022 - current youtube music API response, maybe use a better(more flexible) filtering here 
  let res: Account = {
    username: "Guest",
    pbThumbnailUrl: ""
  };

  try {
    const obj = await response.json();
    res.username = obj.actions[0]
      .openPopupAction
      .popup
      .multiPageMenuRenderer
      .header
      .activeAccountHeaderRenderer
      .accountName
      .runs[0]
      .text;
    res.pbThumbnailUrl = obj.actions[0]
      .openPopupAction
      .popup
      .multiPageMenuRenderer
      .header
      .activeAccountHeaderRenderer
      .accountPhoto
      .thumbnails
      .url;
  } catch (error) {
    console.log("Getting Account failed ", error);
  }
  return res;
}

export default {
  fetch(ctx: ReqContext): Promise<Account> {
    const reqPayload: ReqPayload = {
      context: defaultReqPayloadContext
    };
    return internalFetch(ctx, reqPayload);
  }
}
