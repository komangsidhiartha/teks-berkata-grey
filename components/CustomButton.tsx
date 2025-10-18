import { Pressable, Text } from "react-native"

// Props type
interface CustomButtonProps {
    className?: string
    children: React.ReactNode
    onPress?: (() => void) | null
    textClassName?: string
    disabled?: boolean
}

const CustomButton = ({
    className,
    children,
    onPress,
    textClassName,
    disabled
}: CustomButtonProps) => {
    return (
        <Pressable
            className={`py-2 px-4 rounded-full ${disabled ? 'bg-gray-200' : 'bg-blue-200'} text-white ${className}`}
            onPress={onPress}
            disabled={disabled}
        >
            <Text className={`${disabled ? 'text-gray-600' : 'text-blue-600'} text-center ${textClassName}`}>
                {children}
            </Text>
        </Pressable>
    )
}

export default CustomButton