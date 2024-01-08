import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@rneui/themed';
import { House, List, Plus } from 'phosphor-react-native';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { colors } from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { Extracts } from '../screens/Extracts';
import { Home } from '../screens/Home';
import { NewTicket } from '../screens/NewTicket';
import { Scanner } from '../screens/Scanner';
import { RootStackParamList, RootTabParamList } from '../types';
import { linkingConfig } from './LinkingConfiguration';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={linkingConfig}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name="NewTicket" component={NewTicket} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const { navigate } = useNavigation();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: colors[colorScheme].brand.primary,
        tabBarInactiveTintColor: colors[colorScheme].texts.body,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: getBottomSpace() + 64,
          paddingHorizontal: 64,
          paddingBottom: 24,
          borderTopWidth: 0,
          borderTopColor: 'transparent',
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <House
              color={color}
              weight={focused ? 'fill' : 'regular'}
              size={24}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="NewTicket"
        component={NewTicket}
        options={{
          title: 'New Ticket',
          tabBarIcon: ({ color, focused }) => (
            <Button
              onPress={() => navigate('NewTicket')}
              color={colors[colorScheme].brand.primary}
              radius={5}
              size="lg"
              containerStyle={{
                marginBottom: 12,
              }}
            >
              <Plus
                color={colors[colorScheme].brand.background}
                weight={'regular'}
                size={24}
              />
            </Button>
          ),
        }}
      />
      <BottomTab.Screen
        name="Extracts"
        component={Extracts}
        options={{
          title: 'Extracts',
          tabBarIcon: ({ color, focused }) => (
            <List
              color={color}
              weight={focused ? 'fill' : 'regular'}
              size={24}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}