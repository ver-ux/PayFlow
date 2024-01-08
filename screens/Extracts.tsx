import { useCallback, useState } from 'react';
import { Header } from '../components/Header';
import { Load } from '../components/Load';
import { StyledText } from '../components/StyledText';
import { View as ThemedView } from '../components/Themed';
import { Ticket } from '../components/Ticket';
import { colors } from '../constants/Colors';
import { Ticket as TicketDTO } from '../dtos/Ticket';
import useColorScheme from '../hooks/useColorScheme';
import { fetcher } from '../service/fetcher';
import { orderByDate } from '../utils/order';
import { useFocusEffect } from 'expo-router/build/useFocusEffect';
import { View } from 'react-native/Libraries/Components/View/View';
import Divider from '@rneui/themed/dist/Divider';
import { FlatList } from 'react-native/Libraries/Lists/FlatList';
import { RFValue } from 'react-native-responsive-fontsize';
import { Alert } from 'react-native/Libraries/Alert/Alert';

export function Extracts() {
  const [data, setData] = useState<TicketDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const colorScheme = useColorScheme();

  const fetchData = async () => {
    try {
      const data = await fetcher<TicketDTO[]>('/tickets', {
        method: 'GET',
      });

      const formattedData = data.map((item) => ({
        ...item,
        due: new Date(item.due),
      }));

      const filteredFormattedData = formattedData.filter(
        (item) => item.payed === true
      );

      setData(filteredFormattedData.sort(orderByDate));
    } catch (err) {
      Alert.alert(
        'Erro',
        'Não foi possível carregar seus extratos. Tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <Header size="md" />

      {isLoading ? (
        <Load />
      ) : (
        <ThemedView style={styles.container}>
          <View style={styles.heading}>
            <StyledText
              color={colors[colorScheme].texts.heading}
              fontFamily="Lexend-SemiBold"
              style={styles.title}
            >
              Meus extratos
            </StyledText>
            <StyledText
              color={colors[colorScheme].texts.body}
              fontFamily="Inter-Regular"
              style={styles.titleSpan}
            >
              {`${data.length} pagos`}
            </StyledText>
          </View>

          <Divider
            width={1}
            color={colors[colorScheme].shapes.stroke}
            style={styles.divider}
          />

          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Ticket ticket={item} />}
            showsVerticalScrollIndicator={false}
            refreshing={isLoading}
            onRefresh={fetchData}
          />
        </ThemedView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 32,
    marginHorizontal: 24,
  },
  title: {
    fontSize: RFValue(20),
    lineHeight: RFValue(25),
  },
  titleSpan: {
    fontSize: RFValue(13),
    lineHeight: RFValue(16),
  },
  divider: {
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 16,
  },
});