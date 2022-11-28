import { createContext, useMemo, useReducer } from "react";
import CookieManager from "@react-native-cookies/cookies";

export interface AppStateType {
  signIn: "NOT_SIGNED_IN" | "SIGNED_IN",
}

export interface AppActions {
  type: "SIGN_IN_SUCCESS",
}

export const AppContext = createContext();

export interface AppCtxType {
  signIn: () => void;
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
      }
    },
    {
      signIn: "NOT_SIGNED_IN"
    } as AppStateType
  );

  const appCtx: AppCtxType = {
    signIn: async () => {
      //! todo: verify sign in success 

      console.log("Verified Login! Navigating to App");
      dispatch({ type: "SIGN_IN_SUCCESS" });
    },
    getAppState: () => {
      console.log("update appstate with ", appState)
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
