import { Text, View } from "react-native"
import "./global.css"

const Home = () => {
  return (
    <View className="flex-1 p-8 bg-white" >
      <Text className="text-xl font-bold text-blue-500" >
        TeksBerkata
      </Text>
      <Text>Offline text-to-speech using your device's voices.</Text>
    </View>
  )
}

export default Home