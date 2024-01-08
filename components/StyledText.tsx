import { Text, TextProps } from './Themed';

type Props = TextProps & {
  fontFamily?:
    | 'Inter-Regular'
    | 'Inter-SemiBold'
    | 'Inter-Bold'
    | 'Lexend-Regular'
    | 'Lexend-SemiBold';
};

export function StyledText(props: Props) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: props.fontFamily || 'Inter-Regular' }]}
    />
  );
}
