import { ThemeProvider } from '@shopify/restyle';
import React, { type ReactElement } from 'react';

import theme from '@/theme';

import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { Navigator } from './navigators';
import store, { persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';

export const App = (): ReactElement => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <Navigator />
            <Toast />
          </SafeAreaProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
