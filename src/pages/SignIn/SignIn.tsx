import {SafeAreaView, Text, View} from 'react-native';
import WebView from 'react-native-webview';
import CookieManager from '@react-native-cookies/cookies';
import {useDispatch} from 'react-redux';
import {setSession} from '../../states/SessionSlice';
import {formatSessionCookie} from './utils';

const HardcodedYTMLoginLink =
  'https://accounts.google.com/ServiceLogin?ltmpl=music&service=youtube&uilel=3&passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den-GB%26next%3Dhttps%253A%252F%252Fmusic.youtube.com%252F%253Fcbrd%253D1%26feature%3D__FEATURE__&hl=en-GB';

export default function SignIn() {
  let webviewRef: any = null;

  const dispatch = useDispatch();

  const dispatchLogin = (event: any) => {
    if (event.url.includes('https://music.youtube.com')) {
      CookieManager.getAll(true).then(res => {
        webviewRef?.stopLoading();
        const formatCookie = formatSessionCookie(res);
        dispatch(setSession(formatCookie));
      });
    }
  };

  return (
    <SafeAreaView className="w-full h-full bg-black">
      <View className="w-full h-12 bg-black">
        <Text className="text-slate-50 font-bold text-xl ml-2">
          Sign On: Youtube Music
        </Text>
      </View>
      <WebView
        ref={ref => (webviewRef = ref)}
        cacheEnabled={false}
        source={{uri: HardcodedYTMLoginLink}}
        onNavigationStateChange={dispatchLogin}
      />
    </SafeAreaView>
  );
}
