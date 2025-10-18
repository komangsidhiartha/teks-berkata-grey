import { Pressable, Text } from "react-native"

// Props type
interface CustomButtonProps {
    className?: string
    children: React.ReactNode
    onPress: () => void
    textClassName?: string
}

const CustomButton = ({
    className,
    children,
    onPress,
    textClassName
}: CustomButtonProps) => {
    return (
        <Pressable
            className={`py-2 px-4 rounded-full bg-blue-200 text-white ${className}`}
            onPress={onPress}
        >
            <Text className={`text-blue-600 text-center ${textClassName}`}>
                {children}
            </Text>
        </Pressable>
    )
}

export default CustomButton