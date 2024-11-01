import { ThemeProvider } from '@shopify/restyle';
import React, { type ReactElement } from 'react';

import theme from '@/theme';

import 'react-native-gesture-handler';
import { Navigator } from './navigators';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './store/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const App = (): ReactElement => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GestureHandlerRootView>
          <SafeAreaProvider>
            <Navigator />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
