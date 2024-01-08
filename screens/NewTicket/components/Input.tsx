import { Input as RNEInput, InputProps } from '@rneui/themed';
import React from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { colors } from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

interface Props extends InputProps {
  control: any;
  name: string;
}

export const Input = React.forwardRef(
  ({ control, name, errorMessage, ...rest }: Props, ref) => {
    const colorScheme = useColorScheme();

    return (
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <RNEInput
            ref={ref}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholderTextColor={colors[colorScheme].texts.inputs}
            cursorColor={colors[colorScheme].brand.primary}
            style={[
              styles.input,
              {
                color: colors[colorScheme].texts.body,
                borderColor: colors[colorScheme].shapes.stroke,
              },
            ]}
            leftIconContainerStyle={[
              styles.icon,
              {
                borderColor: colors[colorScheme].shapes.stroke,
              },
            ]}
            errorStyle={{ color: colors[colorScheme].actions.delete }}
            errorMessage={errorMessage}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            {...rest}
          />
        )}
        name={name}
      />
    );
  }
);

const styles = StyleSheet.create({
  input: {
    fontFamily: 'Inter-Regular',
    fontSize: RFValue(15),
    lineHeight: RFValue(18),
  },
  icon: {
    borderRightWidth: 1,
    marginRight: 16,
  },
});