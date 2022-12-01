import CookieManager, { CookieManagerStatic } from "@react-native-cookies/cookies";
import { APIKEY } from "../../common/apikey";
import sha1 from 'crypto-js/sha1';

function getAuthTokenHash(cookie: any) {
  // console.log(cookie.SAPISID)
  // console.log(cookie.SID)
  // console.log(cookie.HSID)
  // console.log(cookie.SSID)
  // console.log(cookie.APISID)
  // console.log(cookie.SIDCC)
  // console.log(cookie.LOGIN_INFO)
  // console.log(cookie["__Secure-1PSID"])
  // console.log(cookie["__Secure-3PSID"])
  // console.log(cookie["__Secure-1PAPISID"])
  // console.log(cookie["__Secure-3PAPISID"])
  // console.log(cookie["__Secure-1PSIDCC"])
  // console.log(cookie["__Secure-3PSIDCC"])
  const now = Date.now();
  console.log(cookie.SAPISID.value)
  const hash = `SAPISIDHASH ${now}_${sha1(now.toString() + ' ' + cookie.SAPISID.value + ' ' + 'https://music.youtube.com')}`
  console.log(hash)
  return hash;
}

function getCookies(cookie: any) {
  let cookieStr = "";
  cookieStr += "SAPISID=" + cookie.SAPISID.value + "; ";
  cookieStr += "SID=" + cookie.SID.value + "; ";
  cookieStr += "HSID=" + cookie.HSID.value + "; ";
  cookieStr += "SSID=" + cookie.SSID.value + "; ";
  cookieStr += "APISID=" + cookie.APISID.value + "; ";
  cookieStr += "SIDCC=" + cookie.SIDCC.value + "; ";
  cookieStr += "LOGIN_INFO=" + cookie.LOGIN_INFO.value + "; ";
  cookieStr += "__Secure-1PSID" + cookie["__Secure-1PSID"].value + "; ";
  cookieStr += "__Secure-3PSID" + cookie["__Secure-3PSID"].value + "; ";
  cookieStr += "__Secure-1PAPISID" + cookie["__Secure-1PAPISID"].value + "; ";
  cookieStr += "__Secure-3PAPISID" + cookie["__Secure-3PAPISID"].value + "; ";
  cookieStr += "__Secure-1PSIDCC" + cookie["__Secure-1PSIDCC"].value + "; ";
  cookieStr += "__Secure-3PSIDCC" + cookie["__Secure-3PSIDCC"].value + ";";
  console.log(cookieStr)
  return cookieStr;
}

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

export async function getUserName(cookie: any) {
  const response = await fetch(
    `https://music.youtube.com/youtubei/v1/account/account_menu?key=${APIKEY}&prettyPrint=false`,
    {
      method: 'POST',
      headers: new Headers({
        'Referer': 'https://music.youtube.com',
        'Origin': 'https://music.youtube.com',
        'authorization': getAuthTokenHash(cookie),
        'Cookie': getCookies(cookie),
        'Content-Type': 'application/json'
      }),
      body: magicAPI_String
    });
  console.log(response);
  console.log(await response.json());
}
