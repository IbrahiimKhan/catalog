import React, { type FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { type BottomTabNavigatorScreenProps, type CartStackParamList } from '@/types/navigation';
import { CartScreen } from '@/screens/authenticated/cart';

const Stack = createNativeStackNavigator<CartStackParamList>();

export const CartStack: FC<BottomTabNavigatorScreenProps<'CartStack'>> = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                animation: 'slide_from_right',
                animationDuration: 0,
            }}>
            <Stack.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};
