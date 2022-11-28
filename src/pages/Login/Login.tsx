import { SafeAreaView } from "react-native";
import WebView from "react-native-webview";

export default function Login() {
  return (
    <SafeAreaView
      className="w-full h-full bg-neutral-300 dark:bg-black">
      <WebView
        source={{ uri: "https://google.com" }}
        onLoad={console.log("loaded webview")}
      />
    </SafeAreaView>
  )
}
