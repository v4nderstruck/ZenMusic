import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from '../../pages/Home/Home'
import Login from "../../pages/Login/Login";

const HomeStack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <HomeStack.Screen name="LoginPage" component={Login} />
      <HomeStack.Screen name="HomePage" component={Home} />
    </HomeStack.Navigator>
  )
}
