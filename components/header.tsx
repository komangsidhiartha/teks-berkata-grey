import { Text, View } from "react-native"
import "../app/global.css"
import { useLanguage } from "@/context/LanguageContext"
import CustomButton from "./CustomButton"

const Header = () => {
    const { language, setLanguage } = useLanguage()

    const onPressLanguage = () => {
        setLanguage(language === "en-US" ? "id-ID" : "en-US")
    }

    const title = language === "en-US" ? "EN" : "ID"

    return (
        <View className="flex-row justify-between items-center">
            <View>
                <Text className="text-xl font-bold text-gray-500" >
                    TeksBerkata
                </Text>
                <Text className="text-xs text-gray-500">Offline text-to-speech using your device's voices.</Text>
            </View>
            <CustomButton onPress={onPressLanguage}>{title}</CustomButton>
        </View>
    )
}

export default Header