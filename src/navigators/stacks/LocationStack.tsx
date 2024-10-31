import React, { type FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { type BottomTabNavigatorScreenProps, type LocationStackParamList } from '@/types/navigation';
import { LocationScreen } from '@/screens/authenticated/location';

const Stack = createNativeStackNavigator<LocationStackParamList>();

export const LocationStack: FC<BottomTabNavigatorScreenProps<'LocationStack'>> = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                animation: 'slide_from_right',
                animationDuration: 0,
            }}>
            <Stack.Screen
                name="Location"
                component={LocationScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};
