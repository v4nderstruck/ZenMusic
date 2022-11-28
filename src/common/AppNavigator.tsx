import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';
import Explore from '../pages/Explore/Explore';
import Library from '../pages/Library/Library';
import Search from '../pages/Search/Search';
import Icon from 'react-native-vector-icons/Ionicons'
import theme from './theme_styles';
import Home from '../pages/Home/Home';
// slate-900 "rgb(15 23 42)"
// neutral-300 "rgb(212 212 212)" 

const Tab = createBottomTabNavigator();
export default function AppNavigator() {
  const colorTheme = theme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let RenderIconName;
          switch (route.name) {
            case 'Home':
              RenderIconName = "ios-home-outline";
              break;
            case 'Explore':
              RenderIconName = "ios-compass-outline";
              break;
            case 'Library':
              RenderIconName = "ios-musical-notes-outline";
              break;
            case 'Search':
              RenderIconName = "ios-search-outline";
              break;
          }
          return <Icon name={RenderIconName} color={color} size={size} />
        },
        tabBarStyle: {
          backgroundColor: colorTheme.backgroundColor,
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 0,
        },
        headerShown: false,
      })
      }
    >
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name='Library' component={Library} />
      <Tab.Screen name='Search' component={Search} />
    </ Tab.Navigator >
  );
}
