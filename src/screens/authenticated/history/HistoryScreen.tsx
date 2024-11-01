/* eslint-disable react/no-unstable-nested-components */
import { Box, ContentSafeAreaView, Header, ProductCard, Text } from '@/components';
import useHeader from '@/hooks/useHeader';
import { RootState } from '@/store/store';
import theme from '@/theme';
import { HomeStackScreenProps } from '@/types/navigation';
import { Product } from '@/types/product';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

interface HistoryScreenProps extends HomeStackScreenProps<'Home'> { }

const HistoryScreenHeader = () => (
    <Header>
        <Header.Content title="Cached Products" subTitle="Viewed products displaying in offline mood!" />
        <Header.Action name="bells" type="ant" color="primary" onPress={() => { }} size={7} />
    </Header>
);

export const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigation }) => {
    useHeader(HistoryScreenHeader);
    const products = useSelector((state: RootState) => state.cachedProducts.products);



    return (
        <SafeAreaView style={styles.container}>
            <ContentSafeAreaView flex={1}>

                <FlashList
                    ItemSeparatorComponent={() => <Box height={10} />}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => <Box flex={1} alignItems="center" justifyContent="center">
                        <Text>No Product Found!</Text>
                    </Box>}
                    estimatedItemSize={theme.sizes.width / 2}
                    numColumns={2}
                    data={products}
                    renderItem={({ item, index }: { item: Product; index: number }) => <ProductCard
                        onPress={() => navigation.navigate('Product', item)}
                        product={item} index={index} />}
                />
            </ContentSafeAreaView>
        </SafeAreaView>
    );
};

export default HistoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
});
