import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Animated, Dimensions, TextInput } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import {
  NebulaGradient,
  NebulaAnimated,
  NebulaCard,
  NebulaText,
  Icon,
  ICON_NAMES,
} from '../../components/core';

const { width: screenWidth } = Dimensions.get('window');

// Navigation configuration
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
    id: 'messages',
    icon: ICON_NAMES.MESSAGES,
    label: 'Messages',
    route: 'MessageCheck',
  },
  {
    id: 'emergency',
    icon: ICON_NAMES.EMERGENCY,
    label: 'Emergency',
    route: 'Emergency',
  },
];

interface ToneAnalysis {
  emotion: string;
  icon: string;
  color: string;
  confidence: number;
  description: string;
}

interface RealityCheck {
  id: string;
  text: string;
  status: 'positive' | 'neutral' | 'warning';
  icon: string;
}

interface MessageCheckScreenProps {
  hideNavigation?: boolean;
  navigateToScreen?: (screenId: string) => void;
}

const MessageCheckScreen: React.FC<MessageCheckScreenProps> = ({
  hideNavigation = false,
  navigateToScreen,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('messages');
  const [inputMessage, setInputMessage] = useState(
    'Hey, we need to talk about the project. Can you meet tomorrow at 3?'
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Animation references for professional analysis effects
  const navAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const analysisPulse = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Animate navigation and analysis effects on mount
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
      // Gentle analysis pulse for engagement
      Animated.loop(
        Animated.sequence([
          Animated.timing(analysisPulse, {
            toValue: 1.02,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(analysisPulse, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, []);

  const handleTabPress = (tab: (typeof navigationTabs)[0]) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setActiveTab(tab.id);
    if (tab.id !== 'messages') {
      if (navigateToScreen) {
        // Map route names to correct screen IDs
        const screenIdMap: { [key: string]: string } = {
          Home: 'home',
          Checkin: 'checkin',
          Insights: 'insights',
          Emergency: 'emergency',
          MessageCheck: 'messages',
        };
        const screenId = screenIdMap[tab.route] || tab.id;
        console.log('🧭 MessageCheck navigating to:', screenId, 'from route:', tab.route);
        navigateToScreen(screenId);
      } else {
        navigation.navigate(tab.route as never);
      }
    }
  };

  const handleAnalyze = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsAnalyzing(true);

    // Simulate analysis process with progress bar
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => {
      setIsAnalyzing(false);
      progressAnim.setValue(0);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    });
  };

  const handleCopyResponse = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Copy to clipboard logic
  };

  const toneAnalysis: ToneAnalysis = {
    emotion: 'Neutral Professional',
    icon: '😊',
    color: '#10B981',
    confidence: 92,
    description: 'No anger or urgency detected',
  };

  const realityChecks: RealityCheck[] = [
    {
      id: '1',
      text: 'No ALL CAPS or exclamation marks',
      status: 'positive',
      icon: '✓',
    },
    {
      id: '2',
      text: 'They asked for your availability',
      status: 'positive',
      icon: '✓',
    },
    {
      id: '3',
      text: 'Similar to their usual tone',
      status: 'positive',
      icon: '✓',
    },
    {
      id: '4',
      text: 'Professional language used',
      status: 'positive',
      icon: '✓',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'positive':
        return '#10B981';
      case 'warning':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
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
                  Message Check
                </NebulaText>
                <NebulaText size="base" variant="secondary" align="center">
                  Analyze tone objectively, respond with confidence
                </NebulaText>
              </View>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* Message Input */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={600} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={800} iterationCount={1}>
              <NebulaCard
                variant="default"
                style={{
                  padding: 20,
                  marginBottom: 20,
                  backgroundColor: 'rgba(159, 122, 234, 0.05)',
                  borderColor: 'rgba(159, 122, 234, 0.2)',
                  borderWidth: 1,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}>
                  <View
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      backgroundColor: 'rgba(159, 122, 234, 0.2)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 10,
                    }}>
                    <NebulaText size="sm">📝</NebulaText>
                  </View>
                  <NebulaText
                    size="sm"
                    weight="bold"
                    variant="tertiary"
                    style={{ textTransform: 'uppercase', letterSpacing: 1.2 }}>
                    Message to Analyze
                  </NebulaText>
                </View>
                <TextInput
                  value={inputMessage}
                  onChangeText={setInputMessage}
                  placeholder="Paste your message here..."
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  multiline
                  style={{
                    minHeight: 80,
                    fontSize: 16,
                    // SLATE COLOR
                    color: '#c2c2c2ec',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    padding: 16,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    textAlignVertical: 'top',
                  }}
                />
              </NebulaCard>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* Analyze Button */}
          <NebulaAnimated animation="fadeIn" duration={600} delay={1000} iterationCount={1}>
            <View style={{ marginBottom: 30, alignItems: 'center' }}>
              <TouchableOpacity
                onPress={handleAnalyze}
                disabled={isAnalyzing}
                style={{ marginBottom: 12 }}>
                <NebulaCard
                  variant="primary"
                  style={{
                    paddingVertical: 16,
                    paddingHorizontal: 32,
                    backgroundColor: isAnalyzing
                      ? 'rgba(159, 122, 234, 0.3)'
                      : 'rgba(159, 122, 234, 0.15)',
                    borderColor: 'rgba(159, 122, 234, 0.4)',
                    borderWidth: 1,
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon 
                      name={isAnalyzing ? 'search' : 'brain'}
                      size={24}
                      color="#FFFFFF"
                      style={{ marginRight: 8 }}
                    />
                    <NebulaText size="base" weight="medium" variant="primary">
                      {isAnalyzing ? 'Analyzing...' : 'Analyze Tone'}
                    </NebulaText>
                  </View>
                </NebulaCard>
              </TouchableOpacity>

              {/* Progress Bar */}
              {isAnalyzing && (
                <View
                  style={{
                    width: 200,
                    height: 3,
                    backgroundColor: 'rgba(159, 122, 234, 0.2)',
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}>
                  <Animated.View
                    style={{
                      height: '100%',
                      backgroundColor: '#9F7AEA',
                      width: progressAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                      }),
                    }}
                  />
                </View>
              )}
            </View>
          </NebulaAnimated>

          {/* Tone Analysis Result */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={1200} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={1400} iterationCount={1}>
              <Animated.View
                style={{
                  marginBottom: 30,
                  transform: [{ scale: analysisPulse }],
                }}>
                <NebulaCard
                  variant="default"
                  style={{
                    padding: 20,
                    backgroundColor: `${toneAnalysis.color}08`,
                    borderColor: `${toneAnalysis.color}30`,
                    borderWidth: 1,
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        backgroundColor: `${toneAnalysis.color}20`,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 20,
                        borderWidth: 2,
                        borderColor: `${toneAnalysis.color}40`,
                      }}>
                      <NebulaText size="3xl">{toneAnalysis.icon}</NebulaText>
                    </View>
                    <View style={{ flex: 1 }}>
                      <NebulaText
                        size="xl"
                        weight="bold"
                        variant="primary"
                        style={{ marginBottom: 4 }}>
                        {toneAnalysis.emotion}
                      </NebulaText>
                      <NebulaText size="sm" variant="secondary" style={{ marginBottom: 8 }}>
                        {toneAnalysis.description}
                      </NebulaText>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: 'rgba(0, 0, 0, 0.2)',
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 12,
                          alignSelf: 'flex-start',
                        }}>
                        <NebulaText size="xs" weight="medium" style={{ color: toneAnalysis.color }}>
                          {toneAnalysis.confidence}% confidence
                        </NebulaText>
                      </View>
                    </View>
                  </View>
                </NebulaCard>
              </Animated.View>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* Reality Checks */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={1600} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={1800} iterationCount={1}>
              <View style={{ marginBottom: 30 }}>
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
                    <NebulaText size="sm">🔍</NebulaText>
                  </View>
                  <NebulaText
                    size="sm"
                    weight="bold"
                    variant="tertiary"
                    style={{ textTransform: 'uppercase', letterSpacing: 1.2 }}>
                    Reality Checks
                  </NebulaText>
                </View>

                <View style={{ gap: 12 }}>
                  {realityChecks.map((check, index) => (
                    <NebulaAnimated
                      key={check.id}
                      animation="fadeIn"
                      duration={400}
                      delay={2000 + index * 150}
                      iterationCount={1}>
                      <NebulaCard
                        variant="default"
                        style={{
                          padding: 16,
                          backgroundColor: `${getStatusColor(check.status)}08`,
                          borderColor: `${getStatusColor(check.status)}20`,
                          borderWidth: 1,
                        }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <View
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 16,
                              backgroundColor: `${getStatusColor(check.status)}20`,
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginRight: 12,
                            }}>
                            <NebulaText size="base" style={{ color: getStatusColor(check.status) }}>
                              {check.icon}
                            </NebulaText>
                          </View>
                          <NebulaText size="sm" variant="primary" style={{ flex: 1 }}>
                            {check.text}
                          </NebulaText>
                        </View>
                      </NebulaCard>
                    </NebulaAnimated>
                  ))}
                </View>
              </View>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* Suggested Response */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={2600} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={2800} iterationCount={1}>
              <NebulaCard
                variant="default"
                style={{
                  padding: 20,
                  marginBottom: 20,
                  backgroundColor: 'rgba(245, 158, 11, 0.05)',
                  borderColor: 'rgba(245, 158, 11, 0.2)',
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
                      backgroundColor: 'rgba(245, 158, 11, 0.2)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 10,
                    }}>
                    <Icon 
                      name="lightbulb"
                      size={16}
                      color="#F59E0B"
                    />
                  </View>
                  <NebulaText
                    size="sm"
                    weight="bold"
                    variant="tertiary"
                    style={{ textTransform: 'uppercase', letterSpacing: 1.2 }}>
                    Suggested Response
                  </NebulaText>
                </View>

                <View
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    padding: 16,
                    borderRadius: 12,
                    marginBottom: 16,
                    borderWidth: 1,
                    borderColor: 'rgba(245, 158, 11, 0.2)',
                  }}>
                  <NebulaText
                    size="base"
                    variant="primary"
                    style={{ lineHeight: 22, fontStyle: 'italic' }}>
                    &quot;Sure! 3 PM works for me. Looking forward to discussing the project
                    updates.&quot;
                  </NebulaText>
                </View>

                <TouchableOpacity onPress={handleCopyResponse}>
                  <NebulaCard
                    variant="primary"
                    style={{
                      paddingVertical: 14,
                      paddingHorizontal: 24,
                      backgroundColor: 'rgba(245, 158, 11, 0.15)',
                      borderColor: 'rgba(245, 158, 11, 0.4)',
                      borderWidth: 1,
                      alignItems: 'center',
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <NebulaText size="base" style={{ marginRight: 8 }}>
                        📋
                      </NebulaText>
                      <NebulaText size="base" weight="medium" variant="primary">
                        Copy Response
                      </NebulaText>
                    </View>
                  </NebulaCard>
                </TouchableOpacity>
              </NebulaCard>
            </NebulaAnimated>
          </NebulaAnimated>
        </ScrollView>
    </NebulaGradient>
  );
};

export default MessageCheckScreen;
