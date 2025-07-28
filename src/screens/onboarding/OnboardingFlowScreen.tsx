import React, { useState, useRef, useEffect } from 'react';
import { View, Animated, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import {
  NebulaGradient,
  NebulaAnimated,
  NebulaCard,
  NebulaButton,
  NebulaText,
} from '../../components/core';
import { supabase } from '../../lib/supabase';
import { profileService } from '../../services/profile';
import ProgressDots from '../../components/core/ProgressDots';
import { useAuth } from '../../contexts/AuthContext';

interface ADHDType {
  id: string;
  icon: string;
  label: string;
  description: string;
}

const adhdTypes: ADHDType[] = [
  {
    id: 'hyperactive',
    icon: '⚡',
    label: 'Hyperactive',
    description: 'Always on the go, fidgety',
  },
  {
    id: 'inattentive',
    icon: '💭',
    label: 'Inattentive',
    description: 'Mind wanders, easily distracted',
  },
  {
    id: 'combined',
    icon: '🌀',
    label: 'Combined',
    description: 'A bit of both',
  },
  {
    id: 'not-sure',
    icon: '🤷',
    label: 'Not Sure',
    description: 'Still figuring it out',
  },
];

const OnboardingFlowScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user: authUser, session: authSession } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPreferences, setSelectedPreferences] = useState({
    notificationStyle: null,
    energyPattern: null,
    focusPreference: null,
  });
  const [selectedGoal, setSelectedGoal] = useState<any>(null);
  const [customGoal, setCustomGoal] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const celebrationAnim = useRef(new Animated.Value(0)).current;

  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Individual animations for step 1 content
  const titleAnim = useRef(new Animated.Value(0)).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;
  const cardsAnim = useRef(adhdTypes.map(() => new Animated.Value(0))).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  const animateToNextStep = () => {
    // Reset step 1 animations
    titleAnim.setValue(0);
    subtitleAnim.setValue(0);
    cardsAnim.forEach((anim) => anim.setValue(0));
    buttonAnim.setValue(0);

    Animated.sequence([
      // Slide out current content quickly
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -30,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      // Reset position for new content
      Animated.timing(slideAnim, {
        toValue: 50,
        duration: 0,
        useNativeDriver: true,
      }),
      // Slide in new content quickly
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      // Start step 1 content animations immediately
      startStep1Animations();
    });
  };

  const startStep0Animations = () => {
    // Button animation for step 0 (welcome screen)
    Animated.timing(buttonAnim, {
      toValue: 1,
      duration: 600,
      delay: 1200, // After the card content
      useNativeDriver: true,
    }).start();
  };

  // Start step 0 animations when component mounts
  useEffect(() => {
    if (currentStep === 0) {
      startStep0Animations();
    }
  }, [currentStep]);

  const startStep1Animations = () => {
    // Start title and subtitle immediately
    Animated.sequence([
      Animated.timing(titleAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(subtitleAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // Staggered cards animation
    cardsAnim.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        delay: 200 + index * 150, // 150ms stagger between cards
        useNativeDriver: true,
      }).start();
    });

    // Button appears after last card
    Animated.timing(buttonAnim, {
      toValue: 1,
      duration: 400,
      delay: 200 + cardsAnim.length * 150 + 200, // After all cards + 200ms
      useNativeDriver: true,
    }).start();
  };

  const showCelebrationAnimation = () => {
    setShowCelebration(true);
    celebrationAnim.setValue(0);

    // Fade in
    Animated.timing(celebrationAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Auto fade out after 1.5 seconds
    setTimeout(() => {
      Animated.timing(celebrationAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        setShowCelebration(false);
      });
    }, 1500);
  };

  const handleNext = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (currentStep < 3) {
      animateToNextStep();
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding flow and save all data
      try {
        console.log('🚀 ONBOARDING COMPLETION STARTED');

        // Get authenticated user
        let user = null;

        // Method 1: Use AuthContext user if available (most reliable)
        if (authUser?.id) {
          user = authUser;
          console.log('✅ Using AuthContext user:', user.id);
        } else {
          // Method 2: Get user from current session
          const {
            data: { session },
          } = await supabase.auth.getSession();
          console.log('📱 Current session:', session?.user?.id);

          if (session?.user) {
            user = session.user;
            console.log('✅ Using session user:', user.id);
          }
        }

        if (!user?.id) {
          console.error('❌ No user found during onboarding completion!');
          Alert.alert(
            'Authentication Error',
            'User session not found. Please restart the app and try again.',
            [
              {
                text: 'Restart',
                onPress: () => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Welcome' as never }],
                  });
                },
              },
            ]
          );
          return;
        }

        // Compile all onboarding data
        const onboardingData = {
          adhd_type: selectedType,
          notification_style: selectedPreferences.notificationStyle,
          energy_pattern: selectedPreferences.energyPattern,
          focus_preference: selectedPreferences.focusPreference,
          selected_goal: selectedGoal?.title || selectedGoal,
        };

        console.log('📋 Saving onboarding data:', onboardingData);

        // Save final onboarding data and mark as complete
        const result = await profileService.completeOnboarding(user.id, onboardingData);

        if (!result.success) {
          console.error('❌ Failed to complete onboarding:', result.error);
          Alert.alert('Error', result.error || 'Failed to save your progress. Please try again.');
          return;
        }

        console.log('✅ ONBOARDING DATA SAVED SUCCESSFULLY!');

        // Show celebration
        showCelebrationAnimation();

        // Navigate to main app after celebration
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' as never }],
          });
        }, 2000);
      } catch (error) {
        console.error('❌ Error during onboarding completion:', error);
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    }
  };

  const handleTypeSelect = (typeId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedType(typeId);
  };

  const handleStepNavigation = (targetStep: number) => {
    if (targetStep === currentStep) return;

    // Allow navigating back or to the next step only
    if (targetStep <= currentStep || targetStep === currentStep + 1) {
      if (targetStep < currentStep) {
        // Going back - instant navigation
        setCurrentStep(targetStep);
      } else {
        // Going forward - use animation
        animateToNextStep();
        setCurrentStep(targetStep);
      }
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <View style={{ flex: 1 }}>
            {/* Welcome Card */}
            <NebulaAnimated animation="slideUp" duration={600} delay={300} iterationCount={1}>
              <NebulaCard
                variant="primary"
                style={{ marginBottom: 40, alignItems: 'center', marginTop: 20 }}
                padding={40}>
                <NebulaAnimated animation="fadeIn" duration={600} delay={600} iterationCount={1}>
                  <NebulaText size="3xl" style={{ marginBottom: 25 }}>
                    👋
                  </NebulaText>
                </NebulaAnimated>
                <NebulaAnimated animation="slideUp" duration={600} delay={800} iterationCount={1}>
                  <NebulaText
                    size="2xl"
                    weight="bold"
                    variant="primary"
                    align="center"
                    style={{ marginBottom: 20 }}>
                    Hi, I&apos;m Calma
                  </NebulaText>
                </NebulaAnimated>
                <NebulaAnimated animation="fadeIn" duration={600} delay={1000} iterationCount={1}>
                  <NebulaText
                    size="base"
                    variant="secondary"
                    align="center"
                    style={{ lineHeight: 24 }}>
                    I&apos;m here to help you understand your beautiful ADHD mind. Let&apos;s set
                    things up in a way that works for YOU.
                  </NebulaText>
                </NebulaAnimated>
              </NebulaCard>
            </NebulaAnimated>

            {/* Spacer */}
            <View style={{ flex: 1 }} />

            {/* Actions */}
            <Animated.View
              style={{
                opacity: buttonAnim,
                transform: [
                  {
                    translateY: buttonAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
              }}>
              <View style={{ paddingBottom: 30 }}>
                <NebulaButton
                  title="Next"
                  onPress={handleNext}
                  variant="primary"
                  size="md"
                  icon="→"
                  iconPosition="right"
                  animated={false}
                  style={{ marginBottom: 15 }}
                />
              </View>
            </Animated.View>
          </View>
        );

      case 1:
        return (
          <View style={{ flex: 1 }}>
            {/* Header */}
            <Animated.View
              style={{
                opacity: titleAnim,
                transform: [
                  {
                    translateY: titleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
              }}>
              <NebulaText
                size="xl"
                weight="bold"
                variant="primary"
                align="center"
                style={{ marginBottom: 8, marginTop: 20, fontSize: 20 }}>
                How does your ADHD show up?
              </NebulaText>
            </Animated.View>
            <Animated.View
              style={{
                opacity: subtitleAnim,
                transform: [
                  {
                    translateY: subtitleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
              }}>
              <NebulaText
                size="base"
                variant="secondary"
                align="center"
                style={{ marginBottom: 30, fontSize: 14 }}>
                This helps me personalize your experience
              </NebulaText>
            </Animated.View>

            {/* Type Options */}
            <View style={{ flex: 1, gap: 12 }}>
              {adhdTypes.map((type, index) => (
                <Animated.View
                  key={type.id}
                  style={{
                    opacity: cardsAnim[index],
                    transform: [
                      {
                        translateY: cardsAnim[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [50, 0],
                        }),
                      },
                    ],
                  }}>
                  <TouchableOpacity onPress={() => handleTypeSelect(type.id)} activeOpacity={0.7}>
                    <NebulaCard
                      variant={selectedType === type.id ? 'primary' : 'default'}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 16,
                        borderWidth: selectedType === type.id ? 2 : 0,
                        borderColor: selectedType === type.id ? '#6A5ACD' : 'transparent',
                      }}>
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 10,
                          backgroundColor: 'rgba(106, 90, 205, 0.15)',
                          marginRight: 12,
                        }}>
                        <NebulaText size="lg">{type.icon}</NebulaText>
                      </View>
                      <View style={{ flex: 1 }}>
                        <NebulaText
                          size="base"
                          weight="medium"
                          variant="primary"
                          style={{ marginBottom: 2 }}>
                          {type.label}
                        </NebulaText>
                        <NebulaText size="sm" variant="secondary">
                          {type.description}
                        </NebulaText>
                      </View>
                    </NebulaCard>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>

            {/* Continue Button */}
            <Animated.View
              style={{
                opacity: buttonAnim,
                transform: [
                  {
                    translateY: buttonAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
              }}>
              <View style={{ paddingBottom: 30 }}>
                <NebulaButton
                  title="Next"
                  onPress={handleNext}
                  variant="primary"
                  icon="→"
                  size="md"
                  disabled={!selectedType}
                  animated={false}
                />
              </View>
            </Animated.View>
          </View>
        );

      case 2:
        return (
          <View style={{ flex: 1 }}>
            {/* Header */}
            <Animated.View
              style={{
                opacity: titleAnim,
                transform: [
                  {
                    translateY: titleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
              }}>
              <NebulaText
                size="xl"
                weight="bold"
                variant="primary"
                align="center"
                style={{ marginBottom: 8, marginTop: 20, fontSize: 20 }}>
                Quick Preferences Setup
              </NebulaText>
            </Animated.View>
            <Animated.View
              style={{
                opacity: subtitleAnim,
                transform: [
                  {
                    translateY: subtitleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
              }}>
              <NebulaText
                size="base"
                variant="secondary"
                align="center"
                style={{ marginBottom: 30, fontSize: 14 }}>
                Let&apos;s personalize your experience in 30 seconds
              </NebulaText>
            </Animated.View>

            {/* Preference Categories */}
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
              {/* Notification Style */}
              <NebulaAnimated animation="fadeIn" duration={600} delay={1200} iterationCount={1}>
                <NebulaAnimated animation="slideUp" duration={500} delay={1400} iterationCount={1}>
                  <View style={{ marginBottom: 25 }}>
                    <NebulaText
                      size="base"
                      weight="medium"
                      variant="primary"
                      style={{ marginBottom: 12, fontSize: 16 }}>
                      📱 Notification Style
                    </NebulaText>
                    <View style={{ gap: 12 }}>
                      {[
                        { id: 'gentle', text: 'Gentle reminders', emoji: '🌸' },
                        { id: 'energetic', text: 'Energetic nudges', emoji: '⚡' },
                        { id: 'silent', text: 'Silent support', emoji: '🤫' },
                      ].map((option, index) => (
                        <NebulaAnimated
                          key={option.id}
                          animation="fadeIn"
                          duration={400}
                          delay={1600 + index * 150}
                          iterationCount={1}>
                          <NebulaAnimated
                            animation="slideUp"
                            duration={350}
                            delay={1700 + index * 150}
                            iterationCount={1}>
                            <TouchableOpacity
                              onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                setSelectedPreferences({
                                  ...selectedPreferences,
                                  notificationStyle: option.id,
                                });
                              }}
                              activeOpacity={0.7}>
                              <NebulaCard
                                variant={
                                  selectedPreferences.notificationStyle === option.id
                                    ? 'primary'
                                    : 'default'
                                }
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  padding: 16,
                                  borderWidth:
                                    selectedPreferences.notificationStyle === option.id ? 2 : 0,
                                  borderColor:
                                    selectedPreferences.notificationStyle === option.id
                                      ? '#6A5ACD'
                                      : 'transparent',
                                }}>
                                <View
                                  style={{
                                    width: 40,
                                    height: 40,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10,
                                    backgroundColor: 'rgba(106, 90, 205, 0.15)',
                                    marginRight: 12,
                                  }}>
                                  <NebulaText size="lg">{option.emoji}</NebulaText>
                                </View>
                                <View style={{ flex: 1 }}>
                                  <NebulaText size="base" weight="medium" variant="primary">
                                    {option.text}
                                  </NebulaText>
                                </View>
                              </NebulaCard>
                            </TouchableOpacity>
                          </NebulaAnimated>
                        </NebulaAnimated>
                      ))}
                    </View>
                  </View>
                </NebulaAnimated>
              </NebulaAnimated>

              {/* Energy Patterns */}
              <NebulaAnimated animation="fadeIn" duration={600} delay={2100} iterationCount={1}>
                <NebulaAnimated animation="slideUp" duration={500} delay={2300} iterationCount={1}>
                  <View style={{ marginBottom: 25 }}>
                    <NebulaText
                      size="base"
                      weight="medium"
                      variant="primary"
                      style={{ marginBottom: 12, fontSize: 16 }}>
                      ⚡ Energy Patterns
                    </NebulaText>
                    <View style={{ gap: 12 }}>
                      {[
                        { id: 'morning', text: 'Morning person', emoji: '🌅' },
                        { id: 'night', text: 'Night owl', emoji: '🌙' },
                        { id: 'varies', text: 'Energy varies daily', emoji: '🎢' },
                      ].map((option, index) => (
                        <NebulaAnimated
                          key={option.id}
                          animation="fadeIn"
                          duration={400}
                          delay={2500 + index * 150}
                          iterationCount={1}>
                          <NebulaAnimated
                            animation="slideUp"
                            duration={350}
                            delay={2600 + index * 150}
                            iterationCount={1}>
                            <TouchableOpacity
                              onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                setSelectedPreferences({
                                  ...selectedPreferences,
                                  energyPattern: option.id,
                                });
                              }}
                              activeOpacity={0.7}>
                              <NebulaCard
                                variant={
                                  selectedPreferences.energyPattern === option.id
                                    ? 'primary'
                                    : 'default'
                                }
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  padding: 16,
                                  borderWidth:
                                    selectedPreferences.energyPattern === option.id ? 2 : 0,
                                  borderColor:
                                    selectedPreferences.energyPattern === option.id
                                      ? '#6A5ACD'
                                      : 'transparent',
                                }}>
                                <View
                                  style={{
                                    width: 40,
                                    height: 40,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10,
                                    backgroundColor: 'rgba(106, 90, 205, 0.15)',
                                    marginRight: 12,
                                  }}>
                                  <NebulaText size="lg">{option.emoji}</NebulaText>
                                </View>
                                <View style={{ flex: 1 }}>
                                  <NebulaText size="base" weight="medium" variant="primary">
                                    {option.text}
                                  </NebulaText>
                                </View>
                              </NebulaCard>
                            </TouchableOpacity>
                          </NebulaAnimated>
                        </NebulaAnimated>
                      ))}
                    </View>
                  </View>
                </NebulaAnimated>
              </NebulaAnimated>

              {/* Focus Preference */}
              <NebulaAnimated animation="fadeIn" duration={600} delay={3050} iterationCount={1}>
                <NebulaAnimated animation="slideUp" duration={500} delay={3250} iterationCount={1}>
                  <View style={{ marginBottom: 20 }}>
                    <NebulaText
                      size="base"
                      weight="medium"
                      variant="primary"
                      style={{ marginBottom: 12, fontSize: 16 }}>
                      🎯 Focus Preference
                    </NebulaText>
                    <View style={{ gap: 12 }}>
                      {[
                        { id: 'single', text: 'One thing at a time', emoji: '🎯' },
                        { id: 'multiple', text: 'Multiple projects', emoji: '🎭' },
                        { id: 'depends', text: 'It depends on my mood', emoji: '🌈' },
                      ].map((option, index) => (
                        <NebulaAnimated
                          key={option.id}
                          animation="fadeIn"
                          duration={400}
                          delay={3450 + index * 150}
                          iterationCount={1}>
                          <NebulaAnimated
                            animation="slideUp"
                            duration={350}
                            delay={3550 + index * 150}
                            iterationCount={1}>
                            <TouchableOpacity
                              onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                setSelectedPreferences({
                                  ...selectedPreferences,
                                  focusPreference: option.id,
                                });
                              }}
                              activeOpacity={0.7}>
                              <NebulaCard
                                variant={
                                  selectedPreferences.focusPreference === option.id
                                    ? 'primary'
                                    : 'default'
                                }
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  padding: 16,
                                  borderWidth:
                                    selectedPreferences.focusPreference === option.id ? 2 : 0,
                                  borderColor:
                                    selectedPreferences.focusPreference === option.id
                                      ? '#6A5ACD'
                                      : 'transparent',
                                }}>
                                <View
                                  style={{
                                    width: 40,
                                    height: 40,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10,
                                    backgroundColor: 'rgba(106, 90, 205, 0.15)',
                                    marginRight: 12,
                                  }}>
                                  <NebulaText size="lg">{option.emoji}</NebulaText>
                                </View>
                                <View style={{ flex: 1 }}>
                                  <NebulaText size="base" weight="medium" variant="primary">
                                    {option.text}
                                  </NebulaText>
                                </View>
                              </NebulaCard>
                            </TouchableOpacity>
                          </NebulaAnimated>
                        </NebulaAnimated>
                      ))}
                    </View>
                  </View>
                </NebulaAnimated>
              </NebulaAnimated>
            </ScrollView>

            {/* Actions - Compact for more scroll space */}
            <Animated.View
              style={{
                opacity: buttonAnim,
                transform: [
                  {
                    translateY: buttonAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
              }}>
              <View style={{ paddingTop: 16, paddingBottom: 16 }}>
                <NebulaButton
                  title="Next"
                  onPress={handleNext}
                  variant="primary"
                  size="md"
                  icon="→"
                  iconPosition="right"
                  animated={false}
                />
              </View>
            </Animated.View>
          </View>
        );

      case 3:
        return (
          <View style={{ flex: 1 }}>
            {/* Header */}
            <Animated.View
              style={{
                opacity: titleAnim,
                transform: [
                  {
                    translateY: titleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
              }}>
              <NebulaText
                size="xl"
                weight="bold"
                variant="primary"
                align="center"
                style={{ marginBottom: 8, marginTop: 20, fontSize: 20 }}>
                Your First Win Today
              </NebulaText>
            </Animated.View>
            <Animated.View
              style={{
                opacity: subtitleAnim,
                transform: [
                  {
                    translateY: subtitleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
              }}>
              <NebulaText
                size="base"
                variant="secondary"
                align="center"
                style={{ marginBottom: 30, fontSize: 14 }}>
                What&apos;s one small thing you want to tackle today?
              </NebulaText>
            </Animated.View>

            {/* Goal Options */}
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
              <View style={{ gap: 12 }}>
                {[
                  { id: 'water', text: 'Drink water', emoji: '💧' },
                  { id: 'walk', text: '5-minute walk', emoji: '🚶‍♀️' },
                  { id: 'text', text: 'Text a friend', emoji: '💬' },
                  { id: 'organize', text: 'Organize desk corner', emoji: '🗂️' },
                  { id: 'breathe', text: 'Take 3 deep breaths', emoji: '🧘‍♂️' },
                  { id: 'stretch', text: 'Quick stretch', emoji: '🤸‍♀️' },
                ].map((goal, index) => (
                  <NebulaAnimated
                    key={goal.id}
                    animation="fadeIn"
                    duration={500}
                    delay={1400 + index * 150}
                    iterationCount={1}>
                    <NebulaAnimated
                      animation="slideUp"
                      duration={400}
                      delay={1500 + index * 150}
                      iterationCount={1}>
                      <TouchableOpacity
                        onPress={() => {
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                          setSelectedGoal(goal);
                          showCelebrationAnimation();
                        }}
                        activeOpacity={0.7}>
                        <NebulaCard
                          variant={selectedGoal?.id === goal.id ? 'primary' : 'default'}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 16,
                            borderWidth: selectedGoal?.id === goal.id ? 2 : 0,
                            borderColor: selectedGoal?.id === goal.id ? '#6A5ACD' : 'transparent',
                          }}>
                          <View
                            style={{
                              width: 40,
                              height: 40,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 10,
                              backgroundColor: 'rgba(106, 90, 205, 0.15)',
                              marginRight: 12,
                            }}>
                            <NebulaText size="lg">{goal.emoji}</NebulaText>
                          </View>
                          <View style={{ flex: 1 }}>
                            <NebulaText size="base" weight="medium" variant="primary">
                              {goal.text}
                            </NebulaText>
                          </View>
                        </NebulaCard>
                      </TouchableOpacity>
                    </NebulaAnimated>
                  </NebulaAnimated>
                ))}

                {/* Custom Goal Input */}
                <NebulaAnimated animation="fadeIn" duration={500} delay={2350} iterationCount={1}>
                  <NebulaAnimated
                    animation="slideUp"
                    duration={400}
                    delay={2450}
                    iterationCount={1}>
                    <View style={{ marginTop: 8 }}>
                      <NebulaCard
                        variant="default"
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 16,
                        }}>
                        <View
                          style={{
                            width: 40,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10,
                            backgroundColor: 'rgba(106, 90, 205, 0.15)',
                            marginRight: 12,
                          }}>
                          <NebulaText size="lg">✨</NebulaText>
                        </View>
                        <View style={{ flex: 1 }}>
                          <NebulaText
                            size="sm"
                            weight="medium"
                            variant="primary"
                            style={{ marginBottom: 8 }}>
                            Or create your own small win:
                          </NebulaText>
                          <TextInput
                            value={customGoal}
                            onChangeText={setCustomGoal}
                            placeholder="Type your goal here..."
                            placeholderTextColor="rgba(255, 255, 255, 0.4)"
                            style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.05)',
                              borderRadius: 8,
                              padding: 12,
                              color: '#FFFFFF',
                              fontSize: 14,
                              borderWidth: 1,
                              borderColor: customGoal
                                ? 'rgba(106, 90, 205, 0.3)'
                                : 'rgba(255, 255, 255, 0.1)',
                            }}
                            onSubmitEditing={() => {
                              if (customGoal.trim()) {
                                const customGoalObj = {
                                  id: 'custom',
                                  text: customGoal.trim(),
                                  emoji: '⭐',
                                };
                                setSelectedGoal(customGoalObj);
                                showCelebrationAnimation();
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                              }
                            }}
                          />
                        </View>
                      </NebulaCard>
                    </View>
                  </NebulaAnimated>
                </NebulaAnimated>
              </View>
            </ScrollView>

            {/* Celebration Animation */}
            {showCelebration && (
              <Animated.View
                style={{
                  position: 'absolute',
                  top: '40%',
                  left: 0,
                  right: 0,
                  alignItems: 'center',
                  zIndex: 10,
                  opacity: celebrationAnim,
                  transform: [
                    {
                      scale: celebrationAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1],
                      }),
                    },
                  ],
                }}>
                <View
                  style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.95)',
                    borderRadius: 20,
                    padding: 20,
                    alignItems: 'center',
                    minWidth: 200,
                  }}>
                  <NebulaText size="2xl" style={{ marginBottom: 8 }}>
                    🎉
                  </NebulaText>
                  <NebulaText size="lg" weight="bold" style={{ color: 'white', marginBottom: 4 }}>
                    Amazing!
                  </NebulaText>
                  <NebulaText
                    size="sm"
                    style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                    align="center">
                    You&apos;ve got this! 💪
                  </NebulaText>
                </View>
              </Animated.View>
            )}

            {/* Actions - Compact for more scroll space */}
            <Animated.View
              style={{
                opacity: buttonAnim,
                transform: [
                  {
                    translateY: buttonAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
              }}>
              <View style={{ paddingTop: 16, paddingBottom: 16 }}>
                <NebulaButton
                  title={selectedGoal ? "Let's Go!" : 'Skip for now'}
                  onPress={handleNext}
                  variant="primary"
                  size="md"
                  icon={selectedGoal ? '🚀' : '→'}
                  iconPosition="right"
                  animated={false}
                />
              </View>
            </Animated.View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <NebulaGradient variant="background" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Fixed Progress Dots - NEVER CHANGE POSITION */}
        <View
          style={{
            paddingHorizontal: 30,
            paddingTop: 120,
            paddingBottom: 20,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
          }}>
          <ProgressDots
            total={4}
            current={currentStep}
            onDotPress={(step) => {
              if (step <= currentStep || step === currentStep + 1) {
                handleStepNavigation(step);
              }
            }}
          />
        </View>

        {/* Animated Content Area */}
        <Animated.View
          style={{
            flex: 1,
            marginTop: 100, // Space for fixed progress dots
            transform: [{ translateY: slideAnim }],
            opacity: fadeAnim,
          }}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 30,
              paddingBottom: 40,
            }}>
            {renderStepContent()}
          </View>
        </Animated.View>
      </SafeAreaView>
    </NebulaGradient>
  );
};

export default OnboardingFlowScreen;
