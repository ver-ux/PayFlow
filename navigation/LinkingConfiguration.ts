import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

export const linkingConfig: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'Home',
            },
          },
          NewTicket: {},
          Extracts: {
            screens: {
              ExtractsScreen: 'Extracts',
            },
          },
        },
      },
      NewTicket: 'New Ticket',
      Scanner: 'Scanner',
    },
  },
};
