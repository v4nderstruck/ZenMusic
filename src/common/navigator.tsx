import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useColorScheme, View } from 'react-native';
import Explore from '../pages/Explore/Explore';
import Home from '../pages/Home/Home';
import Library from '../pages/Library/Library';
import Search from '../pages/Search/Search';
import Icon from 'react-native-vector-icons/Ionicons'
// slate-900 "rgb(15 23 42)"
// neutral-300 "rgb(212 212 212)" 

const Tab = createBottomTabNavigator();
export default function Navigator() {
  const darkModeBGColor = useColorScheme() === "dark" ? "rgb(15, 23, 42)" : "rgb(212, 212, 212)";
  const darkModeFontColor = useColorScheme() === "dark" ? "rgb(212, 212, 212)" : "rgb(15,23,42)";
  console.log(darkModeBGColor);
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
