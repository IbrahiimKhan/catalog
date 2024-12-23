/* eslint-disable react/no-unstable-nested-components */
import {
    Box,
    Card,
    ContentSafeAreaView,
    HStack,
    Loader,
    ProductCard,
    Text,
} from '@/components';
import { isAndroid } from '@/contant/platform';
import useHeader from '@/hooks/useHeader';
import { useGetProductsQuery } from '@/store/services/apiSlice';
import { RootState } from '@/store/store';
import theme from '@/theme';
import { BottomTabNavigatorScreenProps, HomeStackScreenProps } from '@/types/navigation';
import { Product } from '@/types/product';
import { monitorConnectionStatus } from '@/utils/connectionHelper';
import { handleEnabledLocation } from '@/utils/locationHelper';
import { formatTimestamp, startTimestampTimer, stopTimestampTimer, subscribeToTimestamps } from '@/utils/timeStampHelper';
import { CompositeScreenProps } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React, { Suspense, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HomeHeader } from './HomeHeader';
import { SortButtons } from './SortButtons';

interface HomeScreenProps extends CompositeScreenProps<
    HomeStackScreenProps<'Home'>,
    BottomTabNavigatorScreenProps<'HistoryStack'>
> { }

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [qParams, setQParams] = useState<{ limit: number; sort: 'asc' | 'desc' }>({ limit: 10, sort: 'asc' });
    const { data: products, error, isLoading } = useGetProductsQuery(qParams);
    const dispatch = useDispatch();
    const isConnected = useSelector((state: RootState) => state.connection.isConnected);
    const [timestamp, setTimestamp] = useState<number | null>(null);

    useHeader(() => (
        <Suspense fallback={<Loader />}>
            <HomeHeader />
        </Suspense>
    ));


    //side effect for the permissions and netwroks
    useEffect(() => {
        handleEnabledLocation(dispatch);
        const unsubscribe = monitorConnectionStatus(dispatch);
        return () => unsubscribe();
    }, [dispatch]);


    //handle sideeffect for the native timestamp module s
    useEffect(() => {
        if (isAndroid) {
            const subscription = subscribeToTimestamps((timestamp) => {
                setTimestamp(timestamp);
            });

            startTimestampTimer();

            return () => {
                stopTimestampTimer();
                subscription.remove();
            };
        }
    }, []);


    //handle product sorting
    const handleSortChange = (sortOrder: 'asc' | 'desc') => {
        setQParams({ limit: 10, sort: sortOrder });
    };


    if (isConnected === false) {
        setTimeout(() => {
            navigation.navigate('HistoryStack' as never);
        }, 2000);
        return (
            <Box flex={1} alignItems="center" justifyContent="center">
                <Text color="danger" variant="heading2">Oops you are offline. Please visit histroy to view the viewed product</Text>
            </Box>
        );
    }

    if (isLoading) { return <Loader />; }
    if (error) { return <Text variant="heading2" textAlign="center" color="danger"> Something Went Wrong!</Text>; }

    return (
        <SafeAreaView style={styles.container}>
            <ContentSafeAreaView flex={1}>
                <HStack justifyContent="space-between" gap={5} marginVertical={5}>
                    <Text variant="heading3" color="black" fontWeight={600}>All Products</Text>
                    <Suspense fallback={<Loader />}>
                        <SortButtons sort={qParams.sort} onSortChange={handleSortChange} />
                    </Suspense>
                </HStack>
                <FlashList
                    ItemSeparatorComponent={() => <Box height={10} />}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Box flex={1} alignItems="center" justifyContent="center">
                            <Text>No Product Found!</Text>
                        </Box>
                    )}
                    estimatedItemSize={theme.sizes.width / 2}
                    numColumns={2}
                    data={products}
                    renderItem={({ item, index }: { item: Product; index: number }) => (
                        <Suspense fallback={<Loader />}>
                            <ProductCard onPress={() => navigation.navigate('Product', item)} product={item} index={index} />
                        </Suspense>
                    )}
                />
                {isAndroid ? <Card position="absolute" variant="elevated" bottom={10} right={3} paddingVertical={4} paddingHorizontal={3} backgroundColor="primary" >
                    <Text color="white" variant="b3semiBold">{formatTimestamp(timestamp as number)}</Text>
                </Card> : null}
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
