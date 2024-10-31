import React, { type FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HistoryScreen } from '@/screens/authenticated/history';
import { type BottomTabNavigatorScreenProps, type HistoryStackParamList } from '@/types/navigation';

const Stack = createNativeStackNavigator<HistoryStackParamList>();

export const HistoryStack: FC<BottomTabNavigatorScreenProps<'HistoryStack'>> = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                animation: 'slide_from_right',
                animationDuration: 0,
            }}>
            <Stack.Screen
                name="History"
                component={HistoryScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};
