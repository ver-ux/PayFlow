import { useFocusEffect } from '@react-navigation/native';
import { Divider } from '@rneui/themed';
import * as Clipboard from 'expo-clipboard';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Header } from '../../components/Header';
import { StyledText } from '../../components/StyledText';
import { View as ThemedView } from '../../components/Themed';
import { Ticket } from '../../components/Ticket';
import { colors } from '../../constants/Colors';
import { Ticket as TicketDTO } from '../../dtos/Ticket';
import useColorScheme from '../../hooks/useColorScheme';
import { fetcher } from '../../service/fetcher';
import { orderByDate } from '../../utils/order';

import { BottomSheet } from './components/BottomSheet';
import { Heading } from './components/Heading';

export function Home() {
  const [data, setData] = useState<TicketDTO[]>([]);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketDTO | null>(null);
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
        (item) => item.payed === false
      );

      setData(filteredFormattedData.sort(orderByDate));
    } catch (err) {
      Alert.alert(
        'Erro',
        'Não foi possível carregar seus boletos. Tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync('hello world');
    Alert.alert(
      'Copiado',
      'O código do boleto foi copiado para sua área de transferência!'
    );
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <Header size="lg" />

      {isLoading ? (
        <ThemedView
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator
            color={colors[colorScheme].brand.primary}
            size="large"
          />
        </ThemedView>
      ) : (
        <ThemedView style={styles.container}>
          <Heading ticketsCount={data.length} />

          <StyledText
            color={colors[colorScheme].texts.heading}
            fontFamily="Lexend-SemiBold"
            style={styles.sectionTitle}
          >
            Meus boletos
          </StyledText>

          <Divider
            width={1}
            color={colors[colorScheme].shapes.stroke}
            style={styles.sectionDivider}
          />

          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Ticket
                onLongPress={copyToClipboard}
                onBottomSheetVisible={setIsBottomSheetVisible}
                onSelectedTicket={setSelectedTicket}
                ticket={item}
              />
            )}
            showsVerticalScrollIndicator={false}
            refreshing={isLoading}
            onRefresh={fetchData}
          />
        </ThemedView>
      )}

      <BottomSheet
        isVisible={isBottomSheetVisible}
        onBackdropPress={setIsBottomSheetVisible}
        selectedTicket={selectedTicket!}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: RFValue(20),
    lineHeight: RFValue(25),
    marginTop: 8,
    marginHorizontal: 24,
  },
  sectionDivider: {
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 16,
  },
});