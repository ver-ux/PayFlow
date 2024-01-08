import { isBefore } from 'date-fns';
import React from 'react';
import { StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { colors } from '../constants/Colors';
import { Ticket as TicketDTO } from '../dtos/Ticket';
import useColorScheme from '../hooks/useColorScheme';
import { currency, dateDayMonthYear } from '../utils/format';
import { StyledText } from './StyledText';
import { View as ThemedView } from './Themed';

interface Props {
  ticket: TicketDTO;
  onBottomSheetVisible?: (value: boolean) => void;
  onSelectedTicket?: (ticket: TicketDTO) => void;
  onLongPress: () => void;
}

export function Ticket({
  onBottomSheetVisible,
  onSelectedTicket,
  ticket,
  onLongPress,
}: Props) {
  const colorScheme = useColorScheme();

  return (
    <TouchableNativeFeedback
      onLongPress={onLongPress}
      onPress={() => {
        onBottomSheetVisible && onBottomSheetVisible(true);
        onSelectedTicket && onSelectedTicket(ticket);
      }}
      background={TouchableNativeFeedback.Ripple(
        colors[colorScheme].shapes.boxes,
        false
      )}
    >
      <ThemedView style={styles.container}>
        <View>
          <StyledText
            color={colors[colorScheme].texts.heading}
            fontFamily="Lexend-SemiBold"
            style={styles.title}
          >
            {ticket.title}
          </StyledText>
          <StyledText
            color={colors[colorScheme].texts.body}
            fontFamily="Inter-Regular"
            style={styles.date}
          >
            {isBefore(ticket.due, new Date()) ? `Venceu em ` : `Vence em `}
            <StyledText
              color={colors[colorScheme].texts.body}
              fontFamily="Inter-SemiBold"
              style={styles.date}
            >
              {dateDayMonthYear(ticket.due)}
            </StyledText>
          </StyledText>
        </View>
        <StyledText
          color={colors[colorScheme].texts.heading}
          fontFamily="Inter-Regular"
          style={styles.value}
        >
          {`R$ `}
          <StyledText
            color={colors[colorScheme].texts.heading}
            fontFamily="Inter-SemiBold"
            style={styles.value}
          >
            {currency(ticket.value)}
          </StyledText>
        </StyledText>
      </ThemedView>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: RFValue(17),
    lineHeight: RFValue(21),
  },
  date: {
    fontSize: RFValue(13),
    lineHeight: RFValue(16),
    marginTop: 6,
  },
  value: {
    fontSize: RFValue(16),
    lineHeight: RFValue(19),
  },
});
