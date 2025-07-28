import React, { useRef, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import {
  NebulaGradient,
  NebulaAnimated,
  NebulaCard,
  NebulaButton,
  NebulaText,
} from '../../components/core';

const { width: screenWidth } = Dimensions.get('window');

interface ExperienceCard {
  id: string;
  title: string;
  experience: string;
  whatHelps: string;
  emoji: string;
  color: string;
}

const experienceCards: ExperienceCard[] = [
  {
    id: 'forgot',
    title: 'When I say "I forgot"...',
    experience:
      'The thought was there, then something grabbed my attention, and it vanished completely.',
    whatHelps: 'Visual reminders work best. Text me right before, not hours ahead.',
    emoji: '🧠',
    color: '#EC4899',
  },
  {
    id: 'overwhelmed',
    title: 'When I seem "overwhelmed"...',
    experience:
      'My brain is processing too many inputs at once. Everything feels urgent and important.',
    whatHelps: 'Help me break it down into smaller steps. One thing at a time.',
    emoji: '🌊',
    color: '#F59E0B',
  },
  {
    id: 'procrastinating',
    title: 'When I&apos;m "procrastinating"...',
    experience:
      'I want to do the task, but my brain won&apos;t let me start. It&apos;s like a mental block.',
    whatHelps: 'Body doubling works. Just sit with me while I work, no need to help.',
    emoji: '⚡',
    color: '#10B981',
  },
];

const weeklyWins = [
  { id: '1', text: 'Managed all appointments on time', emoji: '⏰' },
  { id: '2', text: 'Remembered to eat lunch daily', emoji: '🍽️' },
  { id: '3', text: 'Used coping strategies successfully', emoji: '💪' },
  { id: '4', text: 'Asked for help when needed', emoji: '🤝' },
  { id: '5', text: 'Completed important tasks', emoji: '✅' },
];

const understandingCards = [
  {
    id: 'laziness',
    title: "It's not laziness",
    description:
      'My brain literally processes dopamine differently. Tasks that seem simple can feel impossible without the right support.',
    emoji: '🧬',
    color: '#9F7AEA',
  },
  {
    id: 'time',
    title: 'Time blindness is real',
    description:
      "I'm not being disrespectful when I'm late. My brain doesn't track time like yours does.",
    emoji: '⏱️',
    color: '#EC4899',
  },
  {
    id: 'care',
    title: 'I care deeply',
    description:
      "When I forget something important to you, it hurts me too. It's not a reflection of how much I care.",
    emoji: '💝',
    color: '#F59E0B',
  },
  {
    id: 'support',
    title: 'Your support matters',
    description:
      'When you understand my challenges instead of judging them, it makes all the difference in my world.',
    emoji: '🌟',
    color: '#10B981',
  },
];

const ParentBridgeScreen: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // Animation references for professional parent bridge effects
  const headerPulse = useRef(new Animated.Value(0)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const heartbeatAnim = useRef(new Animated.Value(0)).current;

  // Animate effects on mount
  useEffect(() => {
    Animated.parallel([
      // Gentle header pulse
      Animated.loop(
        Animated.sequence([
          Animated.timing(headerPulse, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(headerPulse, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ),
      // Gentle shimmer for cards
      Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerAnim, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(shimmerAnim, {
            toValue: 0,
            duration: 4000,
            useNativeDriver: true,
          }),
        ])
      ),
      // Heartbeat for care section
      Animated.loop(
        Animated.sequence([
          Animated.timing(heartbeatAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(heartbeatAnim, {
            toValue: 0,
            duration: 1200,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, []);

  const handleGenerateGuide = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Generate PDF guide logic here
    console.log('Generating personalized ADHD guide...');
  };

  const handleBackPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  return (
    <NebulaGradient variant="background" style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingBottom: 40,
            paddingHorizontal: 20,
            paddingTop: 40,
          }}
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={400} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={600} iterationCount={1}>
              <View
                style={{
                  marginBottom: 30,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    backgroundColor: 'rgba(159, 122, 234, 0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                    borderWidth: 2,
                    borderColor: 'rgba(159, 122, 234, 0.3)',
                  }}>
                  <NebulaText size="3xl">🌉</NebulaText>
                </View>
                <NebulaText
                  size="2xl"
                  weight="bold"
                  variant="primary"
                  align="center"
                  style={{ marginBottom: 8 }}>
                  Help Them Understand
                </NebulaText>
                <NebulaText size="base" variant="secondary" align="center">
                  Building bridges of empathy and understanding
                </NebulaText>
              </View>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* Experience Cards */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={800} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={1000} iterationCount={1}>
              <View style={{ marginBottom: 30 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 20,
                  }}>
                  <View
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      backgroundColor: 'rgba(236, 72, 153, 0.2)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 10,
                    }}>
                    <NebulaText size="sm">💬</NebulaText>
                  </View>
                  <NebulaText
                    size="sm"
                    weight="bold"
                    variant="tertiary"
                    style={{ textTransform: 'uppercase', letterSpacing: 1.2 }}>
                    My Experience
                  </NebulaText>
                </View>

                <View style={{ gap: 16 }}>
                  {experienceCards.map((card, index) => (
                    <NebulaAnimated
                      key={card.id}
                      animation="fadeIn"
                      duration={500}
                      delay={1200 + index * 200}
                      iterationCount={1}>
                      <NebulaCard
                        variant="default"
                        style={{
                          padding: 20,
                          backgroundColor: `${card.color}08`,
                          borderColor: `${card.color}20`,
                          borderWidth: 1,
                        }}>
                        <View style={{ marginBottom: 16 }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginBottom: 12,
                            }}>
                            <View
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: `${card.color}20`,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: 12,
                              }}>
                              <NebulaText size="lg">{card.emoji}</NebulaText>
                            </View>
                            <NebulaText size="base" weight="bold" variant="primary">
                              {card.title}
                            </NebulaText>
                          </View>

                          <View
                            style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.05)',
                              borderRadius: 12,
                              padding: 14,
                              marginBottom: 12,
                            }}>
                            <NebulaText
                              size="xs"
                              weight="medium"
                              variant="tertiary"
                              style={{
                                marginBottom: 6,
                                textTransform: 'uppercase',
                                letterSpacing: 1,
                              }}>
                              My Experience
                            </NebulaText>
                            <NebulaText size="sm" variant="secondary">
                              {card.experience}
                            </NebulaText>
                          </View>

                          <View
                            style={{
                              backgroundColor: `${card.color}15`,
                              borderRadius: 12,
                              padding: 14,
                            }}>
                            <NebulaText
                              size="xs"
                              weight="medium"
                              style={{
                                color: card.color,
                                marginBottom: 6,
                                textTransform: 'uppercase',
                                letterSpacing: 1,
                              }}>
                              What Helps
                            </NebulaText>
                            <NebulaText size="sm" variant="primary">
                              {card.whatHelps}
                            </NebulaText>
                          </View>
                        </View>
                      </NebulaCard>
                    </NebulaAnimated>
                  ))}
                </View>
              </View>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* Weekly Wins */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={1800} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={2000} iterationCount={1}>
              <NebulaCard
                variant="primary"
                style={{
                  padding: 25,
                  marginBottom: 30,
                  backgroundColor: 'rgba(16, 185, 129, 0.08)',
                  borderColor: 'rgba(16, 185, 129, 0.2)',
                  borderWidth: 1,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 20,
                  }}>
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: 'rgba(16, 185, 129, 0.2)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 12,
                    }}>
                    <NebulaText size="base">🏆</NebulaText>
                  </View>
                  <NebulaText size="lg" weight="bold" variant="primary">
                    This Week&apos;s Wins to Share
                  </NebulaText>
                </View>

                <View style={{ gap: 12 }}>
                  {weeklyWins.map((win, index) => (
                    <NebulaAnimated
                      key={win.id}
                      animation="fadeIn"
                      duration={400}
                      delay={2200 + index * 100}
                      iterationCount={1}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: 'rgba(16, 185, 129, 0.1)',
                          borderRadius: 12,
                          padding: 16,
                        }}>
                        <View
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 14,
                            backgroundColor: 'rgba(16, 185, 129, 0.2)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 12,
                          }}>
                          <NebulaText size="sm">{win.emoji}</NebulaText>
                        </View>
                        <NebulaText size="sm" variant="primary" style={{ flex: 1 }}>
                          {win.text}
                        </NebulaText>
                      </View>
                    </NebulaAnimated>
                  ))}
                </View>
              </NebulaCard>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* Generate Guide Button */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={2700} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={2900} iterationCount={1}>
              <Animated.View
                style={{
                  marginBottom: 30,
                  transform: [
                    {
                      scale: shimmerAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.01],
                      }),
                    },
                  ],
                }}>
                <NebulaButton
                  title="Generate My ADHD Guide"
                  onPress={handleGenerateGuide}
                  variant="primary"
                  size="lg"
                  icon="📤"
                  iconPosition="left"
                  animated={true}
                  style={{ marginBottom: 12 }}
                />
                <NebulaText size="sm" variant="tertiary" align="center">
                  Creates a personalized PDF explaining your specific ADHD journey
                </NebulaText>
              </Animated.View>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* Understanding Cards */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={3100} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={3300} iterationCount={1}>
              <View style={{ marginBottom: 30 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 20,
                  }}>
                  <Animated.View
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      backgroundColor: 'rgba(236, 72, 153, 0.2)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 10,
                      transform: [
                        {
                          scale: heartbeatAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.1],
                          }),
                        },
                      ],
                    }}>
                    <NebulaText size="sm">💝</NebulaText>
                  </Animated.View>
                  <NebulaText
                    size="sm"
                    weight="bold"
                    variant="tertiary"
                    style={{ textTransform: 'uppercase', letterSpacing: 1.2 }}>
                    Understanding ADHD
                  </NebulaText>
                </View>

                <View style={{ gap: 16 }}>
                  {understandingCards.map((card, index) => (
                    <NebulaAnimated
                      key={card.id}
                      animation="fadeIn"
                      duration={500}
                      delay={3500 + index * 150}
                      iterationCount={1}>
                      <NebulaCard
                        variant="default"
                        style={{
                          padding: 20,
                          backgroundColor: `${card.color}08`,
                          borderColor: `${card.color}20`,
                          borderWidth: 1,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                          }}>
                          <View
                            style={{
                              width: 44,
                              height: 44,
                              borderRadius: 22,
                              backgroundColor: `${card.color}20`,
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginRight: 16,
                            }}>
                            <NebulaText size="lg">{card.emoji}</NebulaText>
                          </View>
                          <View style={{ flex: 1 }}>
                            <NebulaText
                              size="base"
                              weight="bold"
                              variant="primary"
                              style={{ marginBottom: 8 }}>
                              {card.title}
                            </NebulaText>
                            <NebulaText size="sm" variant="secondary" style={{ lineHeight: 20 }}>
                              {card.description}
                            </NebulaText>
                          </View>
                        </View>
                      </NebulaCard>
                    </NebulaAnimated>
                  ))}
                </View>
              </View>
            </NebulaAnimated>
          </NebulaAnimated>
        </ScrollView>
    </NebulaGradient>
  );
};

export default ParentBridgeScreen;
