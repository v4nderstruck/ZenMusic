import { Slider } from "@miblanchard/react-native-slider";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

export default function PlayerControls() {
  const [playState, setPlayState] = useState(false);
  return (
    <View className="w-full w-full flex flex-col items-center">
      <View className="w-[90%] items-stretch">
        <Slider value={20}
          trackStyle={{
            backgroundColor: "white"
          }} />
      </View>
      <View className="w-[90%] flex flex-row justify-between">
        <TouchableOpacity>
          <Icon name="ios-repeat" size={24} color="white" />
        </TouchableOpacity>
        <View className="mt-8 flex flex-row gap-2">
          <TouchableOpacity>
            <Icon name="play-skip-back-sharp" size={36} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            {playState ? (
              <Icon name="pause" size={42} color="white" />
            ) : (
              <Icon name="play" size={42} color="white" />
            )}
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="play-skip-forward-sharp" size={36} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Icon name="add-sharp" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )

}
