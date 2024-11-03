/* eslint-disable react/no-unstable-nested-components */
import { Box, ContentSafeAreaView, Loader, ProductCard, Text } from '@/components';
import useHeader from '@/hooks/useHeader';
import { RootState } from '@/store/store';
import theme from '@/theme';
import { HistoryStackScreenProps } from '@/types/navigation';
import { Product } from '@/types/product';
import { monitorConnectionStatus } from '@/utils/connectionHelper';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React, { Suspense, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HistoryHeader } from './HistoryHeader';

interface HistoryScreenProps extends HistoryStackScreenProps<'History'> { }

export const HistoryScreen: React.FC<HistoryScreenProps> = ({ }) => {
    const navigation = useNavigation();
    useHeader(() => (
        <Suspense fallback={<Loader />}>
            <HistoryHeader />
        </Suspense>
    ));

    const products = useSelector((state: RootState) => state.cachedProducts.products);
    const dispatch = useDispatch();
    const isConnected = useSelector((state: RootState) => state.connection.isConnected);

    // side effect of the conntions
    useEffect(() => {
        const unsubscribe = monitorConnectionStatus(dispatch);
        return () => unsubscribe();
    }, [dispatch]);

    if (isConnected) {
        setTimeout(() => {
            navigation.navigate('HomeStack' as never);
        }, 2000);
        return (
            <Box flex={1} alignItems="center" justifyContent="center">
                <Text textAlign="center" color="black" variant="heading2">Connection restored! Go back  home to start shopping </Text>
            </Box>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ContentSafeAreaView flex={1} marginTop={5}>
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
                        onPress={() => navigation.navigate('Product', item as never) as never}
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
