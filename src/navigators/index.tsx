import React, { type ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { type NavigationProps, type RootNavigatorParamList } from '@/types/navigation';

import { AuthenticatedNavigator } from './AuthenticatedNavigator';

export const Stack = createNativeStackNavigator<RootNavigatorParamList>();

export const Navigator = (props: NavigationProps): ReactElement => {

    return (
        <NavigationContainer
            {...props}
        >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="AuthenticatedStack" component={AuthenticatedNavigator} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;
