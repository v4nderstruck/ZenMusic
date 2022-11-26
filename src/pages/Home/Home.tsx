import React from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import TopBar from '../../common/components/TopBar';

// import theme from '../../common/theme_styles';

export default function Home() {
  return (
    <SafeAreaView className="w-full h-full bg-neutral-300 dark:bg-black">
      <ScrollView>
        <TopBar title="ZenMusic" username="zensayyy" />
      </ScrollView>
    </SafeAreaView>
  );
}
