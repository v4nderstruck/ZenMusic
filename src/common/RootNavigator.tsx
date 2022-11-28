import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useState } from "react";
import SignIn from "../pages/SignIn/SignIn";
import { AppContext, AppCtxType } from "./AppContextProvider";
import AppNavigator from "./AppNavigator";

const RootStack = createNativeStackNavigator();

export default function RootNavigator() {
  const { getAppState } = useContext(AppContext) as AppCtxType;

  return (
    <RootStack.Navigator screenOptions={{
      headerShown: false,
    }}>
      {getAppState()?.signIn == "NOT_SIGNED_IN" ? (
        <RootStack.Screen name="SignInPage" component={SignIn} />
      ) : (
        <RootStack.Screen name="AppInternalPages" component={AppNavigator} />
      )
      }
    </RootStack.Navigator>
  )
}

