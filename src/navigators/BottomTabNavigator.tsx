/* eslint-disable react/no-unstable-nested-components */
import React, { type FC, type ReactElement } from 'react';
import { type TextStyle, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    type BottomTabNavigationOptions,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { type RouteProp } from '@react-navigation/native';

import theme from '@/theme';
import {
    type AuthenticatedStackNavigatorScreenProps,
    type BottomTabNavigatorParamList,
} from '@/types/navigation';
import { useStringHelper } from '@/utils';

//screen stacks
import { HomeStack } from './stacks/HomeStack';
import { HistoryStack } from './stacks/HistoryStack';
import { CartStack } from './stacks/CartStack';
import { IconButton } from '@/components';
import { LocationStack } from './stacks/LocationStack';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { CartItem } from '@/types/cart';

const BottomTabIcon = ({
    focused,
    title,
}: {
    title: string;
    focused: boolean;
    color: string;
    size: number;
}): ReactElement => {
    const { camelize } = useStringHelper();
    const icon = title?.replace('Stack', '');
    return (
        <IconButton
            type={icon === 'Location' ? 'ionicon' : 'materialCommunity'}
            {...(focused && { iconStyle: 'contained' })}
            name={camelize(icon)}
            color={focused ? 'primary' : 'secondary300'}
            size={focused ? 8 : 9}
        />
    );
};

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

interface BottomTabNavigatorProps extends AuthenticatedStackNavigatorScreenProps<'Root'> { }

export const BottomTabNavigator: FC<BottomTabNavigatorProps> = (): ReactElement => {
    const { bottom } = useSafeAreaInsets();
    const cart = useSelector((state: RootState) => state.cart.items);

    const screenOptions = ({
        route,
    }: {
        route: RouteProp<BottomTabNavigatorParamList, keyof BottomTabNavigatorParamList>;
    }): BottomTabNavigationOptions => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarActiveTintColor: theme.colors.black900,
        tabBarShowLabel: false,
        headerShadowVisible: false,
        tabBarStyle: [$tabBar, { height: 64 + bottom }],
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
        tabBarIcon: props => <BottomTabIcon {...props} title={route.name} />,
    });

    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="HomeStack"
                component={HomeStack}
            />
            <Tab.Screen
                options={{ tabBarBadge: cart.length }}
                name="CartStack"
                component={CartStack}
            />
            <Tab.Screen
                name="HistoryStack"
                component={HistoryStack}
            />
            <Tab.Screen
                name="LocationStack"
                component={LocationStack}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;

const $tabBar: ViewStyle = {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
};

const $tabBarItem: ViewStyle = {
    paddingTop: theme.spacing[4],
};

const { b5semiBold } = theme.textVariants;

const $tabBarLabel: TextStyle = {
    fontFamily: b5semiBold.fontFamily,
    fontSize: b5semiBold.fontSize,
    paddingBottom: 6,
};
