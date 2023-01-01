import {APIKEY} from '../constants';
import {
  cherryPick,
  HttpProviderCommon,
  ProviderContext,
} from '../ProviderCommon';
import store, {RootState} from '../../states/Store';

const userEndpointUrl = `https://music.youtube.com/youtubei/v1/account/account_menu?key=${APIKEY}&prettyPrint=false`;
const userEndpointPayload = {
  context: {
    client: {
      clientName: 'WEB_REMIX',
      clientVersion: '1.20221128.01.00',
    },
  },
};
const providerCommon = new HttpProviderCommon(userEndpointUrl);

export interface User {
  username: String;
}

function pickUsername(obj: any): String {
  try {
    var actions: any[] = cherryPick(obj, ['actions'], Array.isArray);
  } catch (e) {
    return '';
  }

  try {
    var runs: any[] = cherryPick(
      actions[0],
      [
        'openPopupAction',
        'popup',
        'multiPageMenuRenderer',
        'header',
        'activeAccountHeaderRenderer',
        'accountName',
        'runs',
      ],
      Array.isArray,
    );
  } catch (e) {
    return '';
  }

  try {
    var username: String = cherryPick(runs[0], ['text'], item => {
      return typeof item === 'string' || item instanceof String;
    });
    return username;
  } catch (e) {
    return '';
  }
}

export default {
  async fetch(): Promise<User> {
    const state: RootState = store.getState();
    const ctx: ProviderContext = {
      cookie: state.session.cookieHeader,
      sapisid: state.session.SAPISID,
      payload: JSON.stringify(userEndpointPayload),
    };

    var user: User = {
      username: '',
    };
    const obj = await providerCommon.fetchEndPoint(ctx);
    user.username = pickUsername(obj);
    return user;
  },
};
