/* eslint-disable react/no-unstable-nested-components */
import { Box, ContentSafeAreaView, Header, ProductCard } from '@/components';
import useHeader from '@/hooks/useHeader';
import { useGetProductsQuery } from '@/store/services/apiSlice';
import theme from '@/theme';
import { Product } from '@/types/product';
import { FlashList } from '@shopify/flash-list';
import React, { ReactElement } from 'react';
import { ActivityIndicator, SafeAreaView, Text } from 'react-native';

const HomeHeader = (): ReactElement => {
    return (
        <Header>
            <Header.Content title="Hello User" subTitle="Let's start shopping!" />
            <Header.Action name="bells" type="ant" color="primary" onPress={() => { }} size={7} />
        </Header>
    );
};

export const HomeScreen = () => {
    useHeader(HomeHeader);
    const { data: products, error, isLoading } = useGetProductsQuery({ limit: 10 });

    if (isLoading) {
        return (
            <ActivityIndicator size="large" color={theme.colors.black} />
        );
    }

    if (error) {
        return (
            <Text>Error fetching Products</Text>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <ContentSafeAreaView flex={1}>
                <FlashList
                    ItemSeparatorComponent={() => <Box height={10} />}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    estimatedItemSize={theme.sizes.width / 2}
                    numColumns={2}
                    data={products}
                    renderItem={({ item, index }: { item: Product, index: number }) => <ProductCard product={item} index={index} />}
                />
            </ContentSafeAreaView>
        </SafeAreaView>
    );
};

export default HomeScreen;
