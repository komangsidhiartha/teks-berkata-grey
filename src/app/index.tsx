import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { Slider } from '@expo/ui/community/slider';

import { useHomeViewModel } from '@/viewModel/HomeViewModel';
import { CustomButton } from '@/components/CustomButton';

export default function HomeScreen() {
  const {
    text,
    setText,
    speechRate,
    pitch,
    isSpeaking,
    onPressSpeak,
    onPressStop,
    onPressClear,
    onRateChange,
    onPitchChange,
  } = useHomeViewModel();

  const handleSpeak = () => {
    Keyboard.dismiss();
    onPressSpeak();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Input Card */}
            <View style={styles.cardTop}>
              <TextInput
                placeholder="Enter text to speak"
                placeholderTextColor="#9CA3AF"
                style={styles.textInput}
                value={text}
                onChangeText={setText}
                multiline
                textAlignVertical="top"
                maxLength={4000}
              />
              <View style={styles.inputFooter}>
                <CustomButton size="small" onPress={onPressClear}>
                  Clear
                </CustomButton>
                <Text style={styles.counterText}>{text.length} / 4000</Text>
              </View>
            </View>

            {/* Playback Controls Card */}
            <View style={styles.cardBottom}>
              <Text style={styles.sectionTitle}>Playback</Text>

              {/* Rate Controls */}
              <View style={styles.controlHeader}>
                <Text style={styles.controlLabel}>Rate</Text>
                <Text style={styles.controlValue}>{speechRate.toFixed(1)}</Text>
              </View>
              <View style={styles.sliderRow}>
                <CustomButton
                  size="small"
                  style={styles.stepButton}
                  onPress={() => onRateChange(speechRate - 0.1)}
                >
                  -
                </CustomButton>
                <View style={styles.sliderContainer}>
                  <Slider
                    minimumValue={0.5}
                    maximumValue={2.0}
                    step={0.1}
                    value={speechRate}
                    onValueChange={onRateChange}
                    style={styles.slider}
                  />
                </View>
                <CustomButton
                  size="small"
                  style={styles.stepButton}
                  onPress={() => onRateChange(speechRate + 0.1)}
                >
                  +
                </CustomButton>
              </View>

              {/* Pitch Controls */}
              <View style={styles.controlHeader}>
                <Text style={styles.controlLabel}>Pitch</Text>
                <Text style={styles.controlValue}>{pitch.toFixed(1)}</Text>
              </View>
              <View style={styles.sliderRow}>
                <CustomButton
                  size="small"
                  style={styles.stepButton}
                  onPress={() => onPitchChange(pitch - 0.1)}
                >
                  -
                </CustomButton>
                <View style={styles.sliderContainer}>
                  <Slider
                    minimumValue={0.5}
                    maximumValue={2.0}
                    step={0.1}
                    value={pitch}
                    onValueChange={onPitchChange}
                    style={styles.slider}
                  />
                </View>
                <CustomButton
                  size="small"
                  style={styles.stepButton}
                  onPress={() => onPitchChange(pitch + 0.1)}
                >
                  +
                </CustomButton>
              </View>

              {/* Speak / Stop Buttons */}
              <View style={styles.actionRow}>
                <CustomButton
                  style={styles.actionButton}
                  disabled={isSpeaking || !text.trim()}
                  onPress={handleSpeak}
                >
                  Speak
                </CustomButton>
                <CustomButton
                  style={styles.actionButton}
                  disabled={!isSpeaking}
                  onPress={onPressStop}
                >
                  Stop
                </CustomButton>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    gap: 16,
  },
  cardTop: {
    minHeight: 220,
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      },
    }),
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  inputFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 13,
    color: '#9CA3AF',
    paddingRight: 4,
  },
  cardBottom: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    gap: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      },
    }),
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
  },
  controlHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginTop: 4,
  },
  controlLabel: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
  },
  controlValue: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepButton: {
    width: 36,
    height: 36,
    paddingVertical: 0,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
  },
});
