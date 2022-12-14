import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Explore from '../pages/Explore/Explore';
import Library from '../pages/Library/Library';
import Search from '../pages/Search/Search';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeNavigator from '../pages/Home/HomeNavigator';

const Tab = createBottomTabNavigator();
export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({_focused, color, size}) => {
          let RenderIconName;
          switch (route.name) {
            case 'Home':
              RenderIconName = 'ios-home-outline';
              break;
            case 'Explore':
              RenderIconName = 'ios-compass-outline';
              break;
            case 'Library':
              RenderIconName = 'ios-musical-notes-outline';
              break;
            case 'Search':
              RenderIconName = 'ios-search-outline';
              break;
          }
          return <Icon name={RenderIconName} color={color} size={size} />;
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
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Library" component={Library} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
}
