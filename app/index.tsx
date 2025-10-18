import { Text, TextInput, View } from "react-native"
import "./global.css"
import Slider from "@react-native-community/slider"

import { useHomeViewModel } from "@/viewModel/HomeViewModel";
import CustomButton from "@/components/CustomButton";

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
    <View className="flex-1 p-4 bg-white" >
      <View className="flex-[2] p-4 flex-col gap-4 bg-white shadow-lg rounded-lg">
        <TextInput
          placeholder="Enter text to speak"
          className="border border-gray-300 bg-gray-100 rounded-lg p-2 flex-1"
          value={text}
          onChangeText={setText}
          multiline
          textAlignVertical="top"
          numberOfLines={5}
          maxLength={4000}
        />
        <View className="flex-row justify-between">
          <CustomButton onPress={onPressClear}>Clear</CustomButton>
          <Text className="text-gray-500 pr-4">{text.length} / 4000</Text>
        </View>
      </View>

      <View className="flex-1 my-4 p-4 flex-col bg-white shadow-lg rounded-lg">
        <Text>Playback</Text>
        <View className="flex-row justify-between">
          <Text className="pt-4 ml-4">Rate</Text>
          <Text className="pt-4 mr-4">{rate.toFixed(1)}</Text>
        </View>
        <View className="flex-row justify-center items-center mx-16">
          <CustomButton className="py-1 px-6" onPress={() => onRateChange(rate - 0.1)}>-</CustomButton>
          <View className="w-full">
            <Slider
              className="w-full"
              minimumValue={0.5}
              maximumValue={2}
              step={0.1}
              value={rate}
              onValueChange={onRateChange} />
          </View>
          <CustomButton className="py-1 px-6" onPress={() => onRateChange(rate + 0.1)}>+</CustomButton>
        </View>
        <View className="flex-row justify-between">
          <Text className="pt-4 ml-4">Pitch</Text>
          <Text className="pt-4 mr-4">{pitch.toFixed(1)}</Text>
        </View>
        <View className="flex-row justify-center items-center mx-16">
          <CustomButton className="py-1 px-6" onPress={() => onPitchChange(pitch - 0.1)}>-</CustomButton>
          <View className="w-full">
            <Slider
              className="w-full"
              minimumValue={0.5}
              maximumValue={2}
              step={0.1}
              value={pitch}
              onValueChange={onPitchChange} />
          </View>
          <CustomButton className="py-1 px-6" onPress={() => onPitchChange(pitch + 0.1)}>+</CustomButton>
        </View>
        <View className="flex-row gap-4 mt-4">
          <CustomButton onPress={onPressSpeak}>Speak</CustomButton>
          <CustomButton onPress={onPressStop}>Stop</CustomButton>
        </View>
      </View>
    </View>
  )
}

export default Home