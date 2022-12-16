import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface SessionIfc {
  sessionVerified: boolean;
  cookieHeader: String;
  SAPISID: String;
}

const initialState: SessionIfc = {
  sessionVerified: false,
  cookieHeader: '',
  SAPISID: '',
};

function formatSessionCookie(cookie: any): String {
  let cookieStr = '';
  try {
    cookieStr += 'SAPISID=' + cookie.SAPISID.value + '; ';
    cookieStr += 'SID=' + cookie.SID.value + '; ';
    cookieStr += 'HSID=' + cookie.HSID.value + '; ';
    cookieStr += 'SSID=' + cookie.SSID.value + '; ';
    cookieStr += 'APISID=' + cookie.APISID.value + '; ';
    cookieStr += 'SIDCC=' + cookie.SIDCC.value + '; ';
    cookieStr += 'LOGIN_INFO=' + cookie.LOGIN_INFO.value + '; ';
    cookieStr += '__Secure-1PSID' + cookie['__Secure-1PSID'].value + '; ';
    cookieStr += '__Secure-3PSID' + cookie['__Secure-3PSID'].value + '; ';
    cookieStr += '__Secure-1PAPISID' + cookie['__Secure-1PAPISID'].value + '; ';
    cookieStr += '__Secure-3PAPISID' + cookie['__Secure-3PAPISID'].value + '; ';
    cookieStr += '__Secure-1PSIDCC' + cookie['__Secure-1PSIDCC'].value + '; ';
    cookieStr += '__Secure-3PSIDCC' + cookie['__Secure-3PSIDCC'].value + ';';
  } catch (error) {
    console.log('Failed to format session cookie ', error);
  }
  return cookieStr;
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setCookie: (state: any, action: PayloadAction<any>) => {
      state.cookieHeader = formatSessionCookie(action.payload);
      try {
        state.SAPISID = action.payload.SAPISID.value;
      } catch (error) {
        console.log('Failed to set SAPISID cookie ', error);
      }
    },
    verifySession: state => {
      state.sessionVerified =
        state.SAPISID !== '' && state.cookieHeader != '' ? true : false;
    },
  },
});

export const {setCookie, verifySession} = sessionSlice.actions;
export default sessionSlice;
