import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { Header } from '@rneui/themed';
import {
  ArrowLeft,
  Barcode,
  FileText,
  Wallet,
  XCircle,
} from 'phosphor-react-native';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { RFValue } from 'react-native-responsive-fontsize';
import uuid from 'react-native-uuid';
import * as yup from 'yup';

import { StyledText } from '../../components/StyledText';
import { View as ThemedView } from '../../components/Themed';
import { colors } from '../../constants/Colors';
import { Ticket } from '../../dtos/Ticket';
import useColorScheme from '../../hooks/useColorScheme';
import { fetcher } from '../../service/fetcher';
import { dateDayMonthYear } from '../../utils/format';
import { Button } from './components/Button';
import { Input } from './components/Input';

const defaultValues = {
  title: '',
  due: '',
  value: undefined,
  code: undefined,
};

const schema = yup
  .object({
    title: yup.string().required('O nome do boleto é obrigatório'),
    due: yup.string().required('O vencimento do boleto é obrigatório'),
    value: yup
      .number()
      .positive('O valor do boleto deve ser um valor positivo')
      .required('O valor do boleto é obrigatório'),
    code: yup.string().required('O código do boleto é obrigatório'),
  })
  .required();

type FormData = {
  title: string;
  due: string;
  value: number;
  code: string;
};

export function NewTicket() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dueDate, setDueDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState(false);

  const colorScheme = useColorScheme();
  const { goBack, navigate } = useNavigation();

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsLoading(true);
      const formData: Ticket = {
        ...data,
        id: String(uuid.v4()),
        due: dueDate!,
        payed: false,
      };

      await fetcher('/tickets', {
        method: 'POST',
        data: formData,
      });

      Alert.alert('Sucesso', 'Boleto cadastrado com sucesso!');

      navigate('Root');
    } catch (err) {
      Alert.alert(
        'Erro',
        'Não foi possível cadastrar seu boleto. Tente novamente.'
      );
    } finally {
      Keyboard.dismiss();
      setIsLoading(false);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    Keyboard.dismiss();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setValue('due', dateDayMonthYear(date));
    setDueDate(date);
    hideDatePicker();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ThemedView style={{ flex: 1 }}>
        <Header
          backgroundColor={colors[colorScheme].brand.background}
          leftComponent={
            <TouchableOpacity onPress={goBack}>
              <ArrowLeft color={colors[colorScheme].texts.inputs} size={24} />
            </TouchableOpacity>
          }
          statusBarProps={{
            barStyle:
              colorScheme === 'light' ? 'dark-content' : 'light-content',
          }}
          containerStyle={styles.header}
        />

        <StyledText
          color={colors[colorScheme].texts.heading}
          fontFamily="Lexend-SemiBold"
          style={styles.title}
        >
          {`Preencha os dados\n do boleto`}
        </StyledText>

        <ScrollView style={styles.container}>
          <ThemedView>
            <Input
              control={control}
              placeholder="Nome do Boleto"
              leftIcon={
                <FileText size={24} color={colors[colorScheme].brand.primary} />
              }
              errorMessage={errors.title?.message}
              {...register('title', {
                required: true,
              })}
            />
            <Input
              control={control}
              name="due"
              placeholder="Vencimento"
              leftIcon={
                <XCircle size={24} color={colors[colorScheme].brand.primary} />
              }
              errorMessage={errors.due?.message}
              onFocus={showDatePicker}
            />
            <Input
              control={control}
              name="value"
              placeholder="Valor"
              keyboardType="numeric"
              leftIcon={
                <Wallet size={24} color={colors[colorScheme].brand.primary} />
              }
              errorMessage={errors.value?.message}
            />
            <Input
              control={control}
              name="code"
              placeholder="Código"
              keyboardType="numeric"
              leftIcon={
                <Barcode size={24} color={colors[colorScheme].brand.primary} />
              }
              errorMessage={errors.code?.message}
            />
          </ThemedView>
        </ScrollView>

        <ThemedView style={styles.buttonContainer}>
          <Button
            title="Cancelar"
            brand="secondary"
            onPress={() => reset(defaultValues)}
          />

          <Button
            title="Cadastrar"
            brand="primary"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
          />
        </ThemedView>

        <DateTimePickerModal
          accentColor={colors[colorScheme].brand.primary}
          isDarkModeEnabled={colorScheme === 'dark'}
          themeVariant={colorScheme}
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    borderBottomWidth: 0,
    marginHorizontal: 24,
    marginVertical: 18,
  },
  title: {
    textAlign: 'center',
    fontSize: RFValue(20),
    lineHeight: RFValue(25),
  },
  buttonContainer: {
    marginTop: 'auto',
    flexDirection: 'row',
  },
});