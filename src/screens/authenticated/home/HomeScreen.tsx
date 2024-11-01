/* eslint-disable react/no-unstable-nested-components */
import { Box, ContentSafeAreaView, Header, HStack, IconButton, Loader, ProductCard, Text } from '@/components';
import useHeader from '@/hooks/useHeader';
import { useGetProductsQuery } from '@/store/services/apiSlice';
import { setLocation } from '@/store/services/locationSlice';
import theme from '@/theme';
import { HomeStackScreenProps } from '@/types/navigation';
import { Product } from '@/types/product';
import Geolocation from '@react-native-community/geolocation';
import { FlashList } from '@shopify/flash-list';
import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, SafeAreaView, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

interface HomeScreenProps extends HomeStackScreenProps<'Home'> { }

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

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    useHeader(HomeHeader);
    const [qParams, setQParams] = useState<{ limit: number; sort: 'asc' | 'desc' }>({ limit: 10, sort: 'asc' });
    const { data: products, error, isLoading } = useGetProductsQuery(qParams);
    const dispatch = useDispatch();


    useEffect(() => {
        const requestLocationPermission = async () => {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission',
                        message: 'This app needs access to your location.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    getCurrentLocation();
                } else {
                    Toast.show({ type: 'error', text1: 'Location permission denied' });
                }
            } else {
                getCurrentLocation();
            }
        };

        const getCurrentLocation = () => {
            Geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    dispatch(setLocation({ latitude, longitude }));
                },
                (error: any) => {
                    return error;
                },
                { enableHighAccuracy: true, timeout: 30000, maximumAge: 10000 }
            );
        };
        requestLocationPermission();
    }, [dispatch]);

    const handleSortChange = (sortOrder: 'asc' | 'desc') => {
        setQParams({ limit: 10, sort: sortOrder });
    };

    if (isLoading) { return <Loader />; }
    if (error) {
        return <Text variant="heading2" textAlign="center" color="danger"> Something Went Wrong!</Text>;
    }

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

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
});
