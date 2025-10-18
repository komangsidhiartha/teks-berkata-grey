import { useLanguage } from "@/context/LanguageContext"
import { useState } from "react"
import { speakText, stopSpeaking } from "@/utils/TtsHelper"

export const useHomeViewModel = () => {
    const [text, setText] = useState('')
    const [rate, setRate] = useState(1.0)
    const [pitch, setPitch] = useState(1.0)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const { language } = useLanguage()

    const onPressSpeak = () => {
        setIsSpeaking(true)
        speakText(text, rate, pitch, language, () => setIsSpeaking(false))
    }

    const onPressStop = () => {
        initiateStopSpeaking()
    }

    const initiateStopSpeaking = () => {
        stopSpeaking()
        setIsSpeaking(false)
    }

    const onPressClear = () => {
        initiateStopSpeaking()
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
        isSpeaking,
        onPressSpeak,
        onPressStop,
        onPressClear,
        onRateChange,
        onPitchChange
    }
}
