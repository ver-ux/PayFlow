import { ActivityIndicator } from 'react-native';

import { View as ThemedView } from '../components/Themed';
import { colors } from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export function Load() {
  const colorScheme = useColorScheme();

  return (
    <ThemedView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator
        color={colors[colorScheme].brand.primary}
        size="large"
      />
    </ThemedView>
  );
}