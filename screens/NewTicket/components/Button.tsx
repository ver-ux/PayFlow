import { Button as RNEButton, ButtonProps } from '@rneui/themed';
import { Dimensions, Keyboard, StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

import { colors } from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

interface Props extends ButtonProps {
  brand: 'primary' | 'secondary';
}

export function Button({ brand, onPress, ...rest }: Props) {
  const colorScheme = useColorScheme();

  return (
    <RNEButton
      type="outline"
      onPress={(e) => {
        onPress && onPress(e);
        Keyboard.dismiss();
      }}
      titleStyle={[
        styles.title,
        {
          color:
            brand === 'primary'
              ? colors[colorScheme].brand.primary
              : colors[colorScheme].texts.body,
        },
      ]}
      buttonStyle={[
        styles.button,
        {
          borderColor: colors[colorScheme].shapes.stroke,
        },
      ]}
      loadingProps={{
        color: colors[colorScheme].brand.primary,
      }}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    width: Dimensions.get('window').width / 2,
    padding: 16,
    paddingBottom: getBottomSpace() + 16,
  },
  title: {
    fontFamily: 'Inter-Regular',
    fontSize: RFValue(15),
    lineHeight: RFValue(18),
  },
});