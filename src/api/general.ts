import { CookieManagerStatic } from '@react-native-cookies/cookies';
import sha1 from 'crypto-js/sha1';

export interface ReqContext {
  cookies: CookieManagerStatic
}

export function getAuthToken(cookie: any) {
  const now = Date.now();
  const hash = `SAPISIDHASH ${now}_${sha1(now.toString() + ' ' + cookie.SAPISID.value + ' ' + 'https://music.youtube.com')}`
  return hash;
}

export function getCookies(cookie: any) {
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
  return cookieStr;
}
