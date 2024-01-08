import { Avatar } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Text } from '../components/Themed';
import { colors } from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { StyledText } from './StyledText';

const height = {
  sm: 64,
  md: 152,
  lg: 184,
};

interface Props {
  size: 'sm' | 'md' | 'lg';
}

export function Header({ size }: Props) {
  const colorScheme = useColorScheme();
  const { end, start } = colors[colorScheme].gradients.header;

  return (
    <LinearGradient
      colors={[start, end]}
      style={[
        styles.container,
        {
          height: height[size],
        },
      ]}
    >
      <View>
        <View style={styles.greeting}>
          <StyledText
            color={colors[colorScheme].brand.background}
            fontFamily="Lexend-Regular"
            style={{ fontSize: RFValue(20) }}
          >
            Olá,{' '}
          </StyledText>
          <StyledText
            fontFamily="Lexend-SemiBold"
            color={colors[colorScheme].brand.background}
            style={{ fontSize: RFValue(20) }}
          >
            Flávio
          </StyledText>
        </View>
        <Text
          color={colors[colorScheme].brand.background}
          style={{ fontSize: RFValue(13) }}
        >
          Mantenha suas contas em dia
        </Text>
      </View>

      <Avatar
        size="medium"
        source={{
          uri: 'https://github.com/areasflavio.png',
        }}
        containerStyle={{
          backgroundColor: colors[colorScheme].brand.background,
          borderRadius: 5,
        }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
  },
  greeting: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
