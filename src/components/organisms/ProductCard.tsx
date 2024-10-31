import { Box, Card, Clickable, FastImage, IconButton, Text } from '@/components';
import theme from '@/theme';
import { Product } from '@/types/product';
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacityProps } from 'react-native';
type ProductCardProps = TouchableOpacityProps & {
    product: Product,
    index: number
}

export const ProductCard: FC<ProductCardProps> = ({ product, index, onPress }) => {
    const isEven = index % 2 === 0;
    return (
        <Clickable style={[styles.clickable, { marginRight: isEven ? theme.spacing[3] : theme.spacing[0], marginLeft: isEven ? theme.spacing[0] : theme.spacing[3] }]} onPress={onPress}>

            <Card flex={1} alignItems="center" variant="elevated" paddingHorizontal={3} paddingVertical={5}>
                <Box position="absolute" right={0} >
                    <IconButton name="hearto" type="ant" color="primary" />
                </Box>
                <FastImage resizeMode="contain" width={100} height={100} source={{
                    uri: product.image,
                }} />
                <Text variant="heading3" numberOfLines={2} py={5}>{product.title}</Text>
                <Text variant="heading2" color="black" fontWeight={900} numberOfLines={2} pt={2}>$ {product.price}</Text>
            </Card>
        </Clickable>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    clickable: {
        width: theme.sizes.safeWidth / 2 - theme.spacing[3],
    },
});
