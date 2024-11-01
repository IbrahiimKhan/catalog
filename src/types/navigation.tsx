import { type ComponentProps } from 'react';
import { type BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
    type CompositeScreenProps,
    type NavigationContainer,
    type NavigatorScreenParams,
} from '@react-navigation/native';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { Product } from './product';

export interface NavigationProps extends Partial<ComponentProps<typeof NavigationContainer>> { }

//bottom nav related types
export type RootNavigatorParamList = {
    AuthenticatedStack: NavigatorScreenParams<AuthenticatedStackNavigatorParamList>;
};

//authenticated stack related types

export type AuthenticatedStackNavigatorParamList = {
    Root: NavigatorScreenParams<BottomTabNavigatorParamList>;
    Product: undefined
};

//all screen params for bottom tab
export type BottomTabNavigatorParamList = {
    HomeStack: NavigatorScreenParams<HomeStackParamList>;
    CartStack: NavigatorScreenParams<CartStackParamList>;
    LocationStack: NavigatorScreenParams<LocationStackParamList>;
    HistoryStack: NavigatorScreenParams<HistoryStackParamList>;
};

// 1: home related types
export type HomeStackParamList = {
    Home: undefined;
    Product: Product;
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = NativeStackScreenProps<
    HomeStackParamList,
    T
>;

// 2: cart related types
export type CartStackParamList = {
    Cart: undefined;
};

export type CartStackScreenProps<T extends keyof CartStackParamList> =
    NativeStackScreenProps<CartStackParamList, T>;

// 3: product history related types
export type HistoryStackScreenProps<T extends keyof HistoryStackParamList> = NativeStackScreenProps<
    HistoryStackParamList,
    T
>;

export type HistoryStackParamList = {
    History: undefined
};

// 3: location related types
export type LocationStackScreenProps<T extends keyof LocationStackParamList> = NativeStackScreenProps<
    LocationStackParamList,
    T
>;

export type LocationStackParamList = {
    Location: undefined
}

//gloabl types
export type RootNavigatorScreenProps<T extends keyof RootNavigatorParamList> =
    NativeStackScreenProps<RootNavigatorParamList, T>;

export type AuthenticatedStackNavigatorScreenProps<
    T extends keyof AuthenticatedStackNavigatorParamList
> = NativeStackScreenProps<AuthenticatedStackNavigatorParamList, T>;

export type BottomTabNavigatorScreenProps<T extends keyof BottomTabNavigatorParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<BottomTabNavigatorParamList, T>,
        AuthenticatedStackNavigatorScreenProps<keyof AuthenticatedStackNavigatorParamList>
    >;



declare global {

    namespace ReactNavigation {
        export interface RootParamList
            extends RootNavigatorParamList,
            AuthenticatedStackNavigatorParamList,
            HomeStackParamList,
            CartStackParamList,
            LocationStackParamList,
            HistoryStackParamList { }
    }
}
