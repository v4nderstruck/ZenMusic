import { createContext, useMemo, useReducer } from "react";
import CookieManager, { CookieManagerStatic } from "@react-native-cookies/cookies";

export interface AppStateType {
  cookieStore: any,
  signIn: "NOT_SIGNED_IN" | "SIGNED_IN",
}

export interface AppActions {
  type: "SIGN_IN_SUCCESS",
}

export const AppContext = createContext();

export interface AppCtxType {
  signIn: () => void;
  getCookieStore: () => CookieManagerStatic | undefined;
  setCookieStore: (cookies: any) => void
  getAppState: () => AppStateType | undefined;
}

export default function AppContextProvider({ children }: any) {
  const [appState, dispatch]: [AppStateType | undefined, any] = useReducer(
    (prevState: AppStateType, action: any) => {
      console.log("Received action ", action)
      switch (action.type) {
        case 'SIGN_IN_SUCCESS':
          console.log("Update to signed in state")
          return { ...prevState, signIn: "SIGNED_IN" } as AppStateType
        case 'UPDATE_COOKIE_STORE':
          console.log("Updating Cookie Store")
          return { ...prevState, cookieStore: action.payload } as AppStateType
      }
    },
    {
      signIn: "NOT_SIGNED_IN",
      cookieStore: {},
    } as AppStateType
  );

  const appCtx: AppCtxType = {
    signIn: async () => {
      //! todo: verify sign in success 
      console.log("Verified Login! Navigating to App");
      dispatch({ type: "SIGN_IN_SUCCESS" });
    },
    getCookieStore: () => {
      return appState?.cookieStore;
    },
    setCookieStore: (cookies: any) => {
      dispatch({ type: "UPDATE_COOKIE_STORE", payload: cookies })
    },
    getAppState: () => {
      return appState
    },
  };

  const ctx = useMemo(() => appCtx, [appState]);

  return (
    <AppContext.Provider value={ctx}>
      {children}
    </AppContext.Provider>
  )
}
