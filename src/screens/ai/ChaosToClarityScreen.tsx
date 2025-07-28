import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, TextInput, Animated, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import {
  NebulaGradient,
  NebulaAnimated,
  NebulaCard,
  NebulaButton,
  NebulaText,
  Icon,
  ICON_NAMES,
} from '../../components/core';

const { width: screenWidth } = Dimensions.get('window');

// Modern navigation configuration (smaller design)
const navigationTabs = [
  {
    id: 'home',
    icon: ICON_NAMES.HOME,
    label: 'Home',
    route: 'Home',
  },
  {
    id: 'checkin',
    icon: ICON_NAMES.CHECKIN,
    label: 'Check-in',
    route: 'Checkin',
  },
  {
    id: 'insights',
    icon: ICON_NAMES.INSIGHTS,
    label: 'Insights',
    route: 'Insights',
  },
  {
    id: 'chaos',
    icon: ICON_NAMES.CHAOS,
    label: 'Clarity',
    route: 'ChaosToClarity',
  },
  {
    id: 'emergency',
    icon: ICON_NAMES.EMERGENCY,
    label: 'Emergency',
    route: 'Emergency',
  },
];

interface ChaosToClarityScreenProps {
  hideNavigation?: boolean;
  navigateToScreen?: (screenId: string) => void;
}

const ChaosToClarityScreen: React.FC<ChaosToClarityScreenProps> = ({
  hideNavigation = false,
  navigateToScreen,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('chaos');
  const [isRecording, setIsRecording] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // Animation references for professional scanner effect
  const navAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const gridOpacityAnim = useRef(new Animated.Value(0.3)).current;
  const recordPulseAnim = useRef(new Animated.Value(1)).current;

  // Animate navigation and scanner effects on mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(navAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false,
          }),
        ])
      ),
      // Professional scanner line animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ),
      // Grid breathing effect
      Animated.loop(
        Animated.sequence([
          Animated.timing(gridOpacityAnim, {
            toValue: 0.6,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(gridOpacityAnim, {
            toValue: 0.3,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, []);

  // Recording pulse animation
  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(recordPulseAnim, {
            toValue: 1.1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(recordPulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      recordPulseAnim.setValue(1);
    }
  }, [isRecording]);

  const handleTabPress = (tab: (typeof navigationTabs)[0]) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setActiveTab(tab.id);
    if (tab.id !== 'chaos') {
      if (navigateToScreen) {
        // Map route names to correct screen IDs
        const screenIdMap: { [key: string]: string } = {
          Home: 'home',
          Checkin: 'checkin',
          Insights: 'insights',
          Emergency: 'emergency',
          ChaosToClarity: 'chaos',
        };
        const screenId = screenIdMap[tab.route] || tab.id;
        console.log('🧭 AI Screen navigating to:', screenId, 'from route:', tab.route);
        navigateToScreen(screenId);
      } else {
        navigation.navigate(tab.route as never);
      }
    }
  };

  const handleRecord = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsRecording(!isRecording);
  };

  const handleCamera = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsScanning(true);

    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 2000);
  };

  const lastScanResults = [
    { id: 1, icon: 'time', text: 'Dentist Tuesday', color: '#EC4899' },
    { id: 2, icon: 'lightbulb', text: 'Project idea', color: '#9F7AEA' },
    { id: 3, icon: 'home', text: 'Buy milk', color: '#F59E0B' },
    { id: 4, icon: 'phone', text: 'Call mom', color: '#10B981' },
    { id: 5, icon: 'edit', text: 'Write report', color: '#06B6D4' },
  ];

  // Grid component for scanner overlay
  const ScannerGrid = () => {
    const gridSize = 20;
    const rows = Math.ceil(288 / gridSize); // 288px height
    const cols = Math.ceil((screenWidth - 60) / gridSize); // account for padding

    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: gridOpacityAnim,
        }}>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <View
            key={`row-${rowIndex}`}
            style={{
              position: 'absolute',
              top: rowIndex * gridSize,
              left: 0,
              right: 0,
              height: 1,
              backgroundColor: '#9F7AEA',
              opacity: 0.4,
            }}
          />
        ))}
        {Array.from({ length: cols }).map((_, colIndex) => (
          <View
            key={`col-${colIndex}`}
            style={{
              position: 'absolute',
              left: colIndex * gridSize,
              top: 0,
              bottom: 0,
              width: 1,
              backgroundColor: '#9F7AEA',
              opacity: 0.4,
            }}
          />
        ))}
      </Animated.View>
    );
  };

  return (
    <NebulaGradient variant="background" style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingBottom: 100 + insets.bottom,
            paddingHorizontal: 30,
            paddingTop: 40,
          }}
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={200} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={400} iterationCount={1}>
              <View style={{ marginBottom: 40, alignItems: 'center' }}>
                <NebulaText
                  size="2xl"
                  weight="bold"
                  variant="primary"
                  align="center"
                  style={{ marginBottom: 8 }}>
                  Chaos → Clarity
                </NebulaText>
                <NebulaText size="base" variant="secondary" align="center">
                  Show me your chaos, I&apos;ll find the tasks hiding in there
                </NebulaText>
              </View>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* Professional Scanner View */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={600} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={800} iterationCount={1}>
              <TouchableOpacity
                onPress={handleCamera}
                activeOpacity={0.9}
                style={{ marginBottom: 40 }}>
                <NebulaCard
                  variant="default"
                  style={{
                    height: 288,
                    padding: 0,
                    overflow: 'hidden',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    borderWidth: 2,
                    borderColor: isScanning
                      ? 'rgba(159, 122, 234, 0.6)'
                      : 'rgba(159, 122, 234, 0.2)',
                  }}>
                  {/* Background Gradient */}
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(159, 122, 234, 0.05)',
                    }}
                  />

                  {/* Professional Grid Overlay */}
                  <ScannerGrid />

                  {/* Scanner Line */}
                  <Animated.View
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      height: 2,
                      backgroundColor: '#9F7AEA',
                      shadowColor: '#9F7AEA',
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.8,
                      shadowRadius: 8,
                      transform: [
                        {
                          translateY: scanLineAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 284], // 288 - 4 for line height
                          }),
                        },
                      ],
                    }}
                  />

                  {/* Scanner Content */}
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10,
                    }}>
                    <View
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        backgroundColor: 'rgba(159, 122, 234, 0.15)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 16,
                        borderWidth: 2,
                        borderColor: 'rgba(159, 122, 234, 0.3)',
                      }}>
                      <Icon 
                        name={isScanning ? 'search' : 'camera'}
                        size={32}
                        color="rgba(255, 255, 255, 0.8)"
                      />
                    </View>
                    <NebulaText
                      size="sm"
                      variant={isScanning ? 'primary' : 'secondary'}
                      weight={isScanning ? 'medium' : 'regular'}
                      align="center">
                      {isScanning ? 'Scanning for tasks...' : 'Tap to capture'}
                    </NebulaText>
                  </View>

                  {/* Corner Brackets */}
                  <View style={{ position: 'absolute', top: 16, left: 16 }}>
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        borderTopWidth: 2,
                        borderLeftWidth: 2,
                        borderColor: '#9F7AEA',
                        opacity: 0.6,
                      }}
                    />
                  </View>
                  <View style={{ position: 'absolute', top: 16, right: 16 }}>
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        borderTopWidth: 2,
                        borderRightWidth: 2,
                        borderColor: '#9F7AEA',
                        opacity: 0.6,
                      }}
                    />
                  </View>
                  <View style={{ position: 'absolute', bottom: 16, left: 16 }}>
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        borderBottomWidth: 2,
                        borderLeftWidth: 2,
                        borderColor: '#9F7AEA',
                        opacity: 0.6,
                      }}
                    />
                  </View>
                  <View style={{ position: 'absolute', bottom: 16, right: 16 }}>
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        borderBottomWidth: 2,
                        borderRightWidth: 2,
                        borderColor: '#9F7AEA',
                        opacity: 0.6,
                      }}
                    />
                  </View>
                </NebulaCard>
              </TouchableOpacity>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* OR Divider */}
          <NebulaAnimated animation="fadeIn" duration={600} delay={1400} iterationCount={1}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 40,
              }}>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }}
              />
              <NebulaText size="base" variant="tertiary" style={{ marginHorizontal: 20 }}>
                OR
              </NebulaText>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }}
              />
            </View>
          </NebulaAnimated>

          {/* Voice Record Button */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={1600} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={1800} iterationCount={1}>
              <View style={{ alignItems: 'center', marginBottom: 40 }}>
                <TouchableOpacity
                  onPress={handleRecord}
                  activeOpacity={0.8}
                  style={{ marginBottom: 16 }}>
                  <Animated.View
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: 48,
                      backgroundColor: isRecording ? '#EC4899' : '#9F7AEA',
                      alignItems: 'center',
                      justifyContent: 'center',
                      shadowColor: isRecording ? '#EC4899' : '#9F7AEA',
                      shadowOffset: { width: 0, height: 8 },
                      shadowOpacity: 0.4,
                      shadowRadius: 24,
                      elevation: 12,
                      transform: [{ scale: recordPulseAnim }],
                    }}>
                    <NebulaText size="2xl">{isRecording ? '⏸' : '🎤'}</NebulaText>
                  </Animated.View>
                </TouchableOpacity>
                <NebulaText size="sm" variant="secondary" align="center">
                  {isRecording ? 'Recording... Tap to stop' : 'Tap to ramble your thoughts'}
                </NebulaText>
              </View>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* Last Scan Results */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={2000} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={2200} iterationCount={1}>
              <NebulaCard
                variant="default"
                style={{
                  padding: 20,
                  backgroundColor: 'rgba(16, 185, 129, 0.05)',
                  borderColor: 'rgba(16, 185, 129, 0.2)',
                  borderWidth: 1,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 16,
                  }}>
                  <View
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      backgroundColor: 'rgba(16, 185, 129, 0.2)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 10,
                    }}>
                    <Icon 
                      name="sparkles"
                      size={16}
                      color="#10B981"
                    />
                  </View>
                  <NebulaText
                    size="sm"
                    weight="bold"
                    variant="tertiary"
                    style={{ textTransform: 'uppercase', letterSpacing: 1.2 }}>
                    Last Scan Found:
                  </NebulaText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 8,
                  }}>
                  {lastScanResults.map((result, index) => (
                    <NebulaAnimated
                      key={result.id}
                      animation="fadeIn"
                      duration={400}
                      delay={2400 + index * 100}
                      iterationCount={1}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          borderRadius: 20,
                          backgroundColor: `${result.color}15`,
                          borderWidth: 1,
                          borderColor: `${result.color}30`,
                        }}>
                        <Icon 
                          name={result.icon as any}
                          size={16}
                          color={result.color}
                          style={{ marginRight: 6 }}
                        />
                        <NebulaText size="sm" variant="secondary">
                          {result.text}
                        </NebulaText>
                      </View>
                    </NebulaAnimated>
                  ))}
                </View>
              </NebulaCard>
            </NebulaAnimated>
          </NebulaAnimated>
        </ScrollView>
    </NebulaGradient>
  );
};

export default ChaosToClarityScreen;
