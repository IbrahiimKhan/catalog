import { HomeScreen } from '@/screens/authenticated/home';
import { BottomTabNavigatorScreenProps, HomeStackParamList } from '@/types/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStack: FC<BottomTabNavigatorScreenProps<'HomeStack'>> = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                animation: 'slide_from_right',
                animationDuration: 0,
            }}>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};
