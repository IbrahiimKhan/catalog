import { Header } from '@/components';
import useHeader from '@/hooks/useHeader';
import { useGetProductsQuery } from '@/store/services/apiSlice';
import React, { ReactElement } from 'react';
import { ActivityIndicator, SafeAreaView, Text } from 'react-native';

const HomeHeader = (): ReactElement => {
    return (
        <Header>
            <Header.Content title="Hello User" subTitle="Let's start shopping!" />
            <Header.Action name="bells" type="ant" onPress={() => { }} size={7} />
        </Header>
    );
};

export const HomeScreen = () => {
    useHeader(HomeHeader);
    const { data: products, error, isLoading } = useGetProductsQuery({ limit: 1 });
    
    if (isLoading) {
        return (
            <SafeAreaView>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView>
                <Text>Error fetching Products</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView />
    );
};

export default HomeScreen;
