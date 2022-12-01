import { CookieManagerStatic } from "@react-native-cookies/cookies";
import { APIKEY } from "../common/apikey";
import { getAuthToken, getCookies } from "./general";
// 01.12.2022 - required by whatever pre-check youtube music does
const magicAPI_String = `
{
  "context": {
    "client": {
      "clientName": "WEB_REMIX",
      "clientVersion": "1.20221128.01.00"
    }
  }
}
`;

export class AccountApi {
  username: String;

  constructor() {
    this.username = "Guest";
  }

  async fetch(cookies: CookieManagerStatic) {
    const response = await fetch(
      `https://music.youtube.com/youtubei/v1/account/account_menu?key=${APIKEY}&prettyPrint=false`,
      {
        method: 'POST',
        headers: new Headers({
          'Referer': 'https://music.youtube.com',
          'Origin': 'https://music.youtube.com',
          'authorization': getAuthToken(cookies),
          'Cookie': getCookies(cookies),
          'Content-Type': 'application/json'
        }),
        body: magicAPI_String
      });
    const obj = await response.json();

    // 01.12.2022 - current youtube music API response
    // todo add catch
    this.username = obj.actions[0].openPopupAction.popup.multiPageMenuRenderer.header.activeAccountHeaderRenderer.accountName.runs[0].text;
  }
}

