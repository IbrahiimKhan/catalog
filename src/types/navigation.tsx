import { type ComponentProps } from 'react';
import { type BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
    type CompositeScreenProps,
    type NavigationContainer,
    type NavigatorScreenParams,
} from '@react-navigation/native';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';

export interface NavigationProps extends Partial<ComponentProps<typeof NavigationContainer>> { }

//bottom nav related types
export type RootNavigatorParamList = {
    AuthenticatedStack: NavigatorScreenParams<AuthenticatedStackNavigatorParamList>;
};

//authenticated stack related types

export type AuthenticatedStackNavigatorParamList = {
    Root: NavigatorScreenParams<BottomTabNavigatorParamList>;
};

//all screen params for bottom tab
export type BottomTabNavigatorParamList = {
    HomeStack: NavigatorScreenParams<HomeStackParamList>;
    ServiceStack: NavigatorScreenParams<ServiceStackParamList>;
    AccountStack: NavigatorScreenParams<AccountStackParamList>;
    FeedStack: NavigatorScreenParams<FeedStackParamList>;
};

// 1: home related types
export type HomeStackParamList = {
    Home: undefined;
    Account: undefined;
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = NativeStackScreenProps<
    HomeStackParamList,
    T
>;

// 2: service related types
export type ServiceStackParamList = {
    Service: undefined;
};

export type ServiceStackScreenProps<T extends keyof ServiceStackParamList> =
    NativeStackScreenProps<ServiceStackParamList, T>;

// 3: feed related types
export type FeedStackScreenProps<T extends keyof FeedStackParamList> = NativeStackScreenProps<
    FeedStackParamList,
    T
>;

export type FeedStackParamList = {
    Feed: undefined
};

// 3: Account related types
export type AccountStackScreenProps<T extends keyof AccountStackParamList> = NativeStackScreenProps<
    AccountStackParamList,
    T
>;

export type AccountStackParamList = {
    Account: undefined
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
            ServiceStackParamList,
            AccountStackParamList,
            FeedStackParamList { }
    }
}
