import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  NebulaGradient,
  NebulaAnimated,
  NebulaCard,
  NebulaButton,
  NebulaText,
} from '../../components/core';

const NebulaShowcase: React.FC = () => {
  const [showAnimations, setShowAnimations] = useState(false);

  return (
    <NebulaGradient variant="background" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <NebulaAnimated animation="fadeIn" duration={800} iterationCount={1}>
            <NebulaText
              size="3xl"
              weight="bold"
              gradient="nebula"
              align="center"
              style={{ marginBottom: 10 }}>
              Nebula Calm
            </NebulaText>
            <NebulaText size="lg" variant="secondary" align="center" style={{ marginBottom: 40 }}>
              Design System Showcase
            </NebulaText>
          </NebulaAnimated>

          {/* Typography Demo */}
          <NebulaCard variant="primary" style={{ marginBottom: 20 }}>
            <NebulaText size="xl" weight="bold" style={{ marginBottom: 15 }}>
              Typography
            </NebulaText>
            <NebulaText size="lg" variant="primary" style={{ marginBottom: 8 }}>
              Primary Text - Large
            </NebulaText>
            <NebulaText size="base" variant="secondary" style={{ marginBottom: 8 }}>
              Secondary Text - Base
            </NebulaText>
            <NebulaText size="sm" variant="tertiary" style={{ marginBottom: 8 }}>
              Tertiary Text - Small
            </NebulaText>
            <NebulaText size="lg" gradient="cosmic" weight="bold">
              Cosmic Gradient Text
            </NebulaText>
          </NebulaCard>

          {/* Cards Demo */}
          <NebulaCard variant="cosmic" style={{ marginBottom: 20 }}>
            <NebulaText size="xl" weight="bold" style={{ marginBottom: 15 }}>
              Card Variants
            </NebulaText>
            <View style={{ gap: 15 }}>
              <NebulaCard variant="default" padding={15}>
                <NebulaText>Default Card</NebulaText>
              </NebulaCard>
              <NebulaCard variant="elevated" padding={15}>
                <NebulaText>Elevated Card with Blur</NebulaText>
              </NebulaCard>
              <NebulaCard variant="emergency" padding={15}>
                <NebulaText>Emergency Card</NebulaText>
              </NebulaCard>
            </View>
          </NebulaCard>

          {/* Buttons Demo */}
          <NebulaCard variant="elevated" style={{ marginBottom: 20 }}>
            <NebulaText size="xl" weight="bold" style={{ marginBottom: 15 }}>
              Button Components
            </NebulaText>
            <View style={{ gap: 15 }}>
              <NebulaButton
                title="Primary Button"
                onPress={() => console.log('Primary pressed')}
                variant="primary"
                icon="→"
              />
              <NebulaButton
                title="Secondary Button"
                onPress={() => console.log('Secondary pressed')}
                variant="secondary"
                size="md"
              />
              <NebulaButton
                title="Emergency Button"
                onPress={() => console.log('Emergency pressed')}
                variant="emergency"
                icon="🆘"
              />
              <NebulaButton
                title="Ghost Button"
                onPress={() => console.log('Ghost pressed')}
                variant="ghost"
                size="lg"
              />
            </View>
          </NebulaCard>

          {/* Animations Demo */}
          <NebulaCard variant="primary" style={{ marginBottom: 20 }}>
            <NebulaText size="xl" weight="bold" style={{ marginBottom: 15 }}>
              Animations
            </NebulaText>
            <NebulaButton
              title={showAnimations ? 'Stop Animations' : 'Start Calm Animations'}
              onPress={() => setShowAnimations(!showAnimations)}
              variant="secondary"
              style={{ marginBottom: 15 }}
            />
            <View style={{ flexDirection: 'row', gap: 15, flexWrap: 'wrap' }}>
              <NebulaAnimated
                animation={showAnimations ? 'breathe' : 'none'}
                duration={4000}
                iterationCount={showAnimations ? 'infinite' : 1}>
                <NebulaCard variant="cosmic" padding={15}>
                  <NebulaText align="center">Breathe</NebulaText>
                </NebulaCard>
              </NebulaAnimated>
              <NebulaAnimated
                animation={showAnimations ? 'float' : 'none'}
                duration={3000}
                iterationCount={showAnimations ? 'infinite' : 1}>
                <NebulaCard variant="elevated" padding={15}>
                  <NebulaText align="center">Float</NebulaText>
                </NebulaCard>
              </NebulaAnimated>
              <NebulaAnimated
                animation={showAnimations ? 'pulse' : 'none'}
                duration={2500}
                iterationCount={showAnimations ? 'infinite' : 1}>
                <NebulaCard variant="emergency" padding={15}>
                  <NebulaText align="center">Pulse</NebulaText>
                </NebulaCard>
              </NebulaAnimated>
            </View>
          </NebulaCard>

          {/* Gradients Demo */}
          <NebulaCard variant="default" style={{ marginBottom: 20 }}>
            <NebulaText size="xl" weight="bold" style={{ marginBottom: 15 }}>
              Gradient Backgrounds
            </NebulaText>
            <View style={{ gap: 15 }}>
              <NebulaGradient variant="primary" style={{ padding: 20, borderRadius: 16 }}>
                <NebulaText align="center" weight="bold">
                  Nebula Gradient
                </NebulaText>
              </NebulaGradient>
              <NebulaGradient variant="cosmic" style={{ padding: 20, borderRadius: 16 }}>
                <NebulaText align="center" weight="bold">
                  Cosmic Gradient
                </NebulaText>
              </NebulaGradient>
              <NebulaGradient variant="starlight" style={{ padding: 20, borderRadius: 16 }}>
                <NebulaText align="center" weight="bold">
                  Starlight Gradient
                </NebulaText>
              </NebulaGradient>
            </View>
          </NebulaCard>
        </ScrollView>
      </SafeAreaView>
    </NebulaGradient>
  );
};

export default NebulaShowcase;
