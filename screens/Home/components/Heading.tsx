import { Divider } from '@rneui/themed';
import React from 'react';
import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { StyledText } from '../../../components/StyledText';
import { View as ThemedView } from '../../../components/Themed';
import { colors } from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

import BarCodeImg from '../../../assets/svg/barcode.svg';
import BarCodeDarkImg from '../../../assets/svg/barcode_dark.svg';

interface Props {
  ticketsCount: number;
}

export function Heading({ ticketsCount }: Props) {
  const colorScheme = useColorScheme();

  return (
    <ThemedView
      backgroundColor={colors[colorScheme].brand.secondary}
      style={styles.container}
    >
      {colorScheme === 'dark' ? (
        <BarCodeDarkImg width={56} />
      ) : (
        <BarCodeImg width={56} />
      )}
      <Divider
        orientation="vertical"
        width={1}
        color={colors[colorScheme].shapes.stroke}
        style={styles.divider}
      />
      <StyledText
        color={colors[colorScheme].brand.background}
        fontFamily="Inter-Regular"
        style={styles.text}
      >
        {`Você tem `}
        <StyledText
          color={colors[colorScheme].brand.background}
          fontFamily="Inter-Bold"
          style={styles.text}
        >
          {`${ticketsCount} boletos \n`}
        </StyledText>
        {`cadastrados para pagar`}
      </StyledText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -44,
    padding: 20,
    borderRadius: 5,
    margin: 24,
  },
  divider: {
    marginHorizontal: 24,
    marginVertical: 6,
  },
  text: {
    fontSize: RFValue(13),
    lineHeight: RFValue(20),
  },
});
