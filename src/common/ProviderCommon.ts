import { YT_DOMAIN } from './constants';
import sha1 from 'crypto-js/sha1';

export function pickGuard<Type>(
  obj: any,
  selectors: String[],
  validator: (item: any) => boolean,
): Type | null {
  try {
    return cherryPick(obj, selectors, validator);
  } catch (e) {
    console.log(e);
    return null;
  }
}

// pass a list of nested selectors (field name), function will traverse obj and pick the
// value if that field checked against the type. Returns PickError if not of type or
// not in obj. The validator lambda will be used to check the obj before return.
export function cherryPick<Type>(
  obj: any,
  selectors: String[],
  validator: (item: any) => boolean,
): Type {
  let pObj = obj;
  for (let i = 0; i < selectors.length; i++) {
    const selector = selectors[i];
    if (pObj[selector as string] !== undefined) {
      pObj = pObj[selector as string];
    } else {
      //console.log("Err: ", pObj, `Selector tree [${selectors}]`);
      throw new Error(`PickError: Field ${selector} does not exists.`);
    }

    if (i == selectors.length - 1) {
      if (validator(pObj)) {
        return pObj as Type;
      }
      throw new Error(`PickError: validator returned false on ${pObj}`);
    }
  }
  throw new Error('PickError: Tried to pick with empty selectors list.');
}

export interface ProviderContext {
  cookie: String;
  sapisid: String;
  payload: String;
}

export class HttpProviderCommon {
  endpoint_: String;

  constructor(endpoint: String) {
    this.endpoint_ = endpoint;
  }

  craftAuthToken(cookie: String) {
    const now = Date.now();
    const hash = `SAPISIDHASH ${now}_${sha1(
      now.toString() + ' ' + cookie + ' ' + YT_DOMAIN,
    )
      } `;
    return hash;
  }

  async fetchEndPoint(context: ProviderContext): Promise<any> {
    const res = await fetch(this.endpoint_ as string, {
      method: 'POST',
      headers: {
        Referer: YT_DOMAIN,
        Origin: YT_DOMAIN,
        authorization: this.craftAuthToken(context.sapisid),
        Cookie: context.cookie as string,
        'Content-Type': 'application/json',
      },
      body: context.payload as string,
    });
    console.log('fetch ', this.endpoint_, ' returned ', res.status);
    if (res.status != 200) {
      return null;
    }
    return res.json();
  }

  updateEnpoint(key: String, value: String) {
    if (value !== "" && key !== "")
      this.endpoint_ = this.endpoint_ + `&${key}=${value}`;
  }
}
