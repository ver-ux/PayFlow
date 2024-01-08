import { BottomSheet as RNEBottomSheet, Button } from '@rneui/themed';
import { Trash } from 'phosphor-react-native';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

import { StyledText } from '../../../components/StyledText';
import { View as ThemedView } from '../../../components/Themed';
import { colors } from '../../../constants/Colors';
import { Ticket } from '../../../dtos/Ticket';
import useColorScheme from '../../../hooks/useColorScheme';
import { fetcher } from '../../../service/fetcher';
import { currency } from '../../../utils/format';

interface Props {
  onBackdropPress: (value: boolean) => void;
  isVisible: boolean;
  selectedTicket: Ticket;
}

export function BottomSheet({
  onBackdropPress,
  isVisible,
  selectedTicket,
}: Props) {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const setTicketPayed = async () => {
    try {
      setIsLoading(true);

      await fetcher(`/tickets/${selectedTicket.id}`, {
        method: 'PATCH',
        data: {
          payed: true,
        },
      });

      Alert.alert('Sucesso', 'Boleto pago com sucesso!');

      onBackdropPress(false);
    } catch (err) {
      Alert.alert(
        'Erro',
        'Não foi possível editar seu boleto. Tente novamente.'
      );
    } finally {
      setIsLoading(true);
    }
  };

  const deleteTicket = async () => {
    try {
      setIsDeleting(true);

      await fetcher(`/tickets/${selectedTicket.id}`, {
        method: 'DELETE',
      });

      Alert.alert('Sucesso', 'Boleto deletado com sucesso!');

      onBackdropPress(false);
    } catch (err) {
      Alert.alert(
        'Erro',
        'Não foi possível deletar seu boleto. Tente novamente.'
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <RNEBottomSheet
      isVisible={isVisible}
      modalProps={{
        statusBarTranslucent: true,
      }}
      onBackdropPress={() => onBackdropPress(false)}
      backdropStyle={{
        backgroundColor: 'rgba(0,0,0,0.6)',
      }}
    >
      <ThemedView backgroundColor={colors[colorScheme].brand.background}>
        <View
          style={{
            paddingHorizontal: 78,
            paddingVertical: 24,
          }}
        >
          <StyledText
            color={colors[colorScheme].texts.heading}
            fontFamily="Lexend-Regular"
            style={[
              styles.title,
              {
                textAlign: 'center',
              },
            ]}
          >
            {`O boleto `}
            <StyledText
              color={colors[colorScheme].texts.heading}
              fontFamily="Lexend-SemiBold"
            >
              {selectedTicket?.title}
            </StyledText>
            {`\nno valor de R$ `}
            <StyledText
              color={colors[colorScheme].texts.heading}
              fontFamily="Lexend-SemiBold"
            >
              {currency(selectedTicket?.value!)}
            </StyledText>
            {`\nfoi pago ?`}
          </StyledText>
        </View>

        <View style={styles.buttonGroup}>
          <Button
            title="Ainda não"
            color={colors[colorScheme].shapes.boxes}
            size="lg"
            onPress={() => onBackdropPress(false)}
            titleStyle={[
              styles.buttonTitle,
              {
                color: colors[colorScheme].texts.heading,
              },
            ]}
            containerStyle={[
              styles.button,
              {
                backgroundColor: colors[colorScheme].shapes.boxes,
              },
            ]}
          />
          <Button
            title="Sim"
            color={colors[colorScheme].brand.primary}
            size="lg"
            onPress={setTicketPayed}
            loading={isLoading}
            titleStyle={[
              styles.buttonTitle,
              {
                color: colors[colorScheme].brand.background,
              },
            ]}
            containerStyle={[
              styles.button,
              {
                backgroundColor: colors[colorScheme].brand.primary,
              },
            ]}
          />
        </View>

        <Button
          title="Deletar boleto"
          color={colors[colorScheme].brand.background}
          onPress={deleteTicket}
          loading={isDeleting}
          icon={
            <Trash
              size={18}
              color={colors[colorScheme].actions.delete}
              weight="regular"
            />
          }
          buttonStyle={[styles.footer]}
          titleStyle={[
            styles.buttonTitle,
            {
              color: colors[colorScheme].actions.delete,
            },
          ]}
        />
      </ThemedView>
    </RNEBottomSheet>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: RFValue(17),
    lineHeight: RFValue(21),
  },
  buttonGroup: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  button: {
    width: '48%',
    borderRadius: 5,
  },
  buttonTitle: {
    fontFamily: 'Inter-Regular',
  },
  footer: {
    padding: 16,
    paddingBottom: getBottomSpace() + 16,
  },
});
