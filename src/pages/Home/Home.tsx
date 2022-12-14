import { useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import UserProvider, { User } from "../../common/Providers/UserProvider";

export default function Home() {
  const [user, setUser] = useState<User>({ username: "" });

  useEffect(() => {
    const fetchData = async () => {
      const user_ = await UserProvider.fetch()
      setUser(user_);
    };
    fetchData()
  }, [])

  return (
    <SafeAreaView className="w-full h-full bg-black">
      <View className="w-full h-full bg-black">
        <Text className="text-2xl font-bold text-neutral-200">Hello
          <Text className="text-indigo-800">{" " + user.username}</Text>
        </Text>
      </View>
    </SafeAreaView>
  )

}
