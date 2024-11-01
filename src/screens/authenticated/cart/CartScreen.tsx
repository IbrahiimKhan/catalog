/* eslint-disable react/no-unstable-nested-components */

import { Box, Card, CartCard, ContentSafeAreaView, Header, HStack, Text } from '@/components';
import useHeader from '@/hooks/useHeader';
import { RootState } from '@/store/store';
import theme from '@/theme';
import { CartItem } from '@/types/cart';
import { CartStackScreenProps } from '@/types/navigation';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

interface CartScreenProps extends CartStackScreenProps<'Cart'> { }

const CartHeader = () => (
    <Header>
        <Header.Content title="My Cart" subTitle="shopping cart items" />
        <Header.Action name="bells" type="ant" color="primary" onPress={() => { }} size={7} />
    </Header>
);

export const CartScreen: React.FC<CartScreenProps> = ({ }) => {
    const cart = useSelector((state: RootState) => state.cart.items);
    const totalCartItems = cart.reduce((total: number, item: CartItem) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0).toFixed(2);

    useHeader(CartHeader);


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
                    data={cart}
                    renderItem={({ item }: { item: CartItem }) => <CartCard
                        item={item} />}
                />
                <Card width={'100%'} padding={5} variant="elevated" marginVertical={2} flexDirection="row" justifyContent="space-between" >
                    <HStack>
                        <Text variant="heading3" >Total Items: </Text>
                        <Text variant="heading3" fontWeight={900}>{totalCartItems}</Text>
                    </HStack>
                    <HStack>
                        <Text variant="heading3">Total Price: </Text>
                        <Text variant="heading3" fontWeight={900}>{totalPrice}</Text>
                    </HStack>
                </Card >
            </ContentSafeAreaView>
        </SafeAreaView >
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
});
