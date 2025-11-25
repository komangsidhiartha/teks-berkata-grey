import { useLanguage } from "@/context/LanguageContext"
import { useState } from "react"
import { speakText, stopSpeaking } from "@/utils/TtsHelper"
import { useSettingsStore } from "@/store/useSettingsStore"

export const useHomeViewModel = () => {
    const { speechRate, pitch, setSpeechRate, setPitch } = useSettingsStore();
    const [text, setText] = useState('')
    const [isSpeaking, setIsSpeaking] = useState(false)
    const { language } = useLanguage()

    const onPressSpeak = () => {
        setIsSpeaking(true)
        speakText(text, speechRate, pitch, language, () => setIsSpeaking(false))
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
        const newRate = Math.max(0.5, Math.min(2.0, value));
        setSpeechRate(newRate);
    }

    const onPitchChange = (value: number) => {
        const newPitch = Math.max(0.5, Math.min(2.0, value));
        setPitch(newPitch);
    }

    return {
        text,
        setText,
        speechRate,
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
