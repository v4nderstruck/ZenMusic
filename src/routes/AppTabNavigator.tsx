import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ExploreNavigator from '../pages/Explore/ExploreNavigator';
import HomeNavigator from '../pages/Home/HomeNavigator';
import LibraryNavigator from '../pages/Library/LibraryNavigator';
import SettingsNavigator from '../pages/Settings/SettingsNavigator';

const Tab = createBottomTabNavigator();

export default function AppTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, size }) => {
          let RenderIconName;

          switch (route.name) {
            case 'HomeStackNav':
              RenderIconName = 'ios-home-outline';
              break;
            case 'ExploreStackNav':
              RenderIconName = 'ios-compass-outline';
              break;
            case 'LibraryStackNav':
              RenderIconName = 'ios-musical-notes-outline';
              break;
            case 'SettingsStackNav':
              RenderIconName = 'ios-settings-outline';
              break;
          }
          const colorFocus = focused ? '#4F46E5' : '#C7D2FE';
          return <Icon name={RenderIconName} color={colorFocus} size={size} />;
        },
        tabBarStyle: {
          height: 80,
          backgroundColor: 'black',
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 0,
        },
        headerShown: false,
      })}>
      <Tab.Screen name="HomeStackNav" component={HomeNavigator} />
      <Tab.Screen name="ExploreStackNav" component={ExploreNavigator} />
      <Tab.Screen name="LibraryStackNav" component={LibraryNavigator} />
      <Tab.Screen name="SettingsStackNav" component={SettingsNavigator} />
    </Tab.Navigator>
  );
}
