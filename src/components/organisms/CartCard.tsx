import { addToCart, removeFromCart } from '@/store/services/cartSlice';
import { useTheme } from '@/theme/theme-provider';
import { CartItem } from '@/types/cart';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import Clickable from '../ui/forms/Clickable';
import Card from '../ui/layout/Card';
import HStack from '../ui/layout/HStack';
import VStack from '../ui/layout/VStack';
import FastImage from '../ui/media-icons/FastImage';
import IconButton from '../ui/media-icons/IconButton';
import { Text } from '../ui/typography/Text';

type CartCardProps = {
    item: CartItem
}

export const CartCard: FC<CartCardProps> = ({ item }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const handleIncrement = () => {
        dispatch(addToCart({ ...item, quantity: 1 }));
    };

    const handleDecrement = () => {
        dispatch(removeFromCart(item.id));
    };

    return (
        <Clickable>
            <Card variant="elevated" flexDirection="row" alignItems="center" paddingVertical={5} gap={5} flex={1} marginHorizontal={1} paddingHorizontal={5}>
                <FastImage resizeMode="contain" source={{ uri: item.image }} width={theme.sizes.safeWidth / 5} height={theme.sizes.safeWidth / 5} />
                <VStack flex={1}>
                    <Text variant="base" numberOfLines={2} > {item.title}</Text >
                    <HStack justifyContent="space-between" flex={1}>
                        <HStack gap={3}>
                            <IconButton onPress={handleDecrement} type="entypo" name="squared-minus" size={8} color="primary" />
                            <Text variant="heading2">{item.quantity}</Text>
                            <IconButton onPress={handleIncrement} type="entypo" name="squared-plus" size={8} color="primary" />
                        </HStack>
                        <Text variant="heading2" fontWeight={900}>${item.price * item.quantity}</Text>
                    </HStack>
                </VStack>
            </Card>
        </Clickable>
    );
};

export default CartCard;

const styles = StyleSheet.create({});
