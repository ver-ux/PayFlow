import { Text as DefaultText, View as DefaultView } from 'react-native';

import { colors } from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export function useThemeColor(
  paletteType: keyof typeof colors.light & keyof typeof colors.dark
) {
  const theme = useColorScheme();

  return colors[theme][paletteType];
}

export type TextProps = DefaultText['props'] & {
  color?: string;
};
export type ViewProps = DefaultView['props'] & {
  backgroundColor?: string;
};

export function Text(props: TextProps) {
  const { style, color, ...otherProps } = props;
  const themeColor = useThemeColor('texts');

  return (
    <DefaultText
      style={[{ color: color ||  themeColor.body }, style]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, backgroundColor, ...otherProps } = props;
  const themeColor = useThemeColor('brand');

  return (
    <DefaultView
      style={[
        { backgroundColor: backgroundColor || themeColor. background},
        style,
      ]}
      {...otherProps}
    />
  );
}