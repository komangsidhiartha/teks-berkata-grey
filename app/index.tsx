import { Text, TextInput, View } from "react-native"
import "./global.css"
import { Button } from "@react-navigation/elements"
import Slider from "@react-native-community/slider"

import { useHomeViewModel } from "@/viewModel/HomeViewModel";

const Home = () => {

  const {
    text,
    setText,
    rate,
    pitch,
    language,
    onPressSpeak,
    onPressStop,
    onPressClear,
    onRateChange,
    onPitchChange
  } = useHomeViewModel()

  return (
    <View className="flex-1 p-8 bg-white" >
      <View className="flex-[2] p-4 flex-col gap-4 bg-white shadow-lg rounded-lg">
        <TextInput
          placeholder="Enter text to speak"
          className="border border-gray-300 bg-gray-100 rounded-lg p-2 flex-1"
          value={text}
          onChangeText={setText}
          multiline
          textAlignVertical="top"
          numberOfLines={5}
        />
        <View className="flex-row justify-end">
          <Button onPress={onPressClear}>Clear</Button>
        </View>
      </View>

      <View className="flex-1 my-4 p-4 flex-col bg-white shadow-lg rounded-lg">
        <Text>Playback</Text>
        <View className="flex-row justify-between">
          <Text className="pt-4 ml-4">Rate</Text>
          <Text className="pt-4 mr-4">{rate.toFixed(1)}</Text>
        </View>
        <View className="flex-row justify-center items-center mx-16">
          <Button onPress={() => onRateChange(rate - 0.1)}>-</Button>
          <View className="w-full">
            <Slider
              className="w-full"
              minimumValue={0.5}
              maximumValue={2}
              step={0.1}
              value={rate}
              onValueChange={onRateChange} />
          </View>
          <Button onPress={() => onRateChange(rate + 0.1)}>+</Button>
        </View>
        <View className="flex-row justify-between">
          <Text className="pt-4 ml-4">Pitch</Text>
          <Text className="pt-4 mr-4">{pitch.toFixed(1)}</Text>
        </View>
        <View className="flex-row justify-center items-center mx-16">
          <Button onPress={() => onPitchChange(pitch - 0.1)}>-</Button>
          <View className="w-full">
            <Slider
              className="w-full"
              minimumValue={0.5}
              maximumValue={2}
              step={0.1}
              value={pitch}
              onValueChange={onPitchChange} />
          </View>
          <Button onPress={() => onPitchChange(pitch + 0.1)}>+</Button>
        </View>
        <View className="flex-row gap-4 mt-4">
          <Button onPress={onPressSpeak}>Speak</Button>
          <Button onPress={onPressStop}>Stop</Button>
        </View>
      </View>
    </View>
  )
}

export default Home