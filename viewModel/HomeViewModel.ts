import { useLanguage } from "@/context/LanguageContext"
import { useState } from "react"
import { speakText, stopSpeaking } from "@/utils/TtsHelper"

export const useHomeViewModel = () => {
    const [text, setText] = useState('')
    const [rate, setRate] = useState(1.0)
    const [pitch, setPitch] = useState(1.0)
    const { language } = useLanguage()

    const onPressSpeak = () => {
        speakText(text, rate, pitch, language)
    }

    const onPressStop = () => {
        stopSpeaking()
    }

    const onPressClear = () => {
        setText('')
    }

    const onRateChange = (value: number) => {
        setRate(Math.max(0.5, Math.min(2.0, value)))
    }

    const onPitchChange = (value: number) => {
        setPitch(Math.max(0.5, Math.min(2.0, value)))
    }

    return {
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
    }
}
