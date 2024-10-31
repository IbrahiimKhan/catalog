import React, { useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import { Box, ContentSafeAreaView, Header, HStack, IconButton, ProductCard, Text } from '@/components';
import useHeader from '@/hooks/useHeader';
import { useGetProductsQuery } from '@/store/services/apiSlice';
import theme from '@/theme';
import { Product } from '@/types/product';
import { FlashList } from '@shopify/flash-list';

const HomeHeader = () => (
    <Header>
        <Header.Content title="Hello User" subTitle="Let's start shopping!" />
        <Header.Action name="bells" type="ant" color="primary" onPress={() => { }} size={7} />
    </Header>
);

interface SortButtonsProps {
    sort: 'asc' | 'desc';
    onSortChange: (sortOrder: 'asc' | 'desc') => void;
}

const SortButtons: React.FC<SortButtonsProps> = ({ sort, onSortChange }) => (
    <HStack gap={5}>
        <IconButton
            name="sort-asc"
            type="octicon"
            color="primary"
            iconStyle={sort === 'asc' ? 'contained' : 'default'}
            onPress={() => onSortChange('asc')}
        />
        <IconButton
            name="sort-desc"
            type="octicon"
            color="primary"
            iconStyle={sort === 'desc' ? 'contained' : 'default'}
            onPress={() => onSortChange('desc')}
        />
    </HStack>
);

const LoadingIndicator: React.FC = () => (
    <ActivityIndicator size="large" color={theme.colors.black} />
);

const ErrorMessage: React.FC = () => (
    <Text>Error fetching Products</Text>
);

export const HomeScreen: React.FC = () => {
    useHeader(HomeHeader);
    const [qParams, setQParams] = useState<{ limit: number; sort: 'asc' | 'desc' }>({ limit: 10, sort: 'asc' });
    const { data: products, error, isLoading } = useGetProductsQuery(qParams);

    const handleSortChange = (sortOrder: 'asc' | 'desc') => {
        setQParams({ limit: 10, sort: sortOrder });
    };

    if (isLoading) { return <LoadingIndicator />; }
    if (error) { return <ErrorMessage />; }

    return (
        <SafeAreaView style={styles.container}>
            <ContentSafeAreaView flex={1}>
                <HStack justifyContent="space-between" gap={5} marginVertical={5}>
                    <Text variant="heading3" color="black" fontWeight={600}>All Products</Text>
                    <SortButtons sort={qParams.sort} onSortChange={handleSortChange} />
                </HStack>
                <FlashList
                    ItemSeparatorComponent={() => <Box height={10} />}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    estimatedItemSize={theme.sizes.width / 2}
                    numColumns={2}
                    data={products}
                    renderItem={({ item, index }: { item: Product; index: number }) => <ProductCard product={item} index={index} />}
                />
            </ContentSafeAreaView>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
