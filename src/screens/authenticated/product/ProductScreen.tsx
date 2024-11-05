
import { Box, Button, Card, ContentSafeAreaView, FastImage, Header, HStack, Text, VectorIcon } from '@/components';
import useHeader from '@/hooks/useHeader';
import { addProductToCache } from '@/store/services/cachedProductsSlice';
import { addToCart } from '@/store/services/cartSlice';
import theme from '@/theme';
import { HomeStackScreenProps } from '@/types/navigation';
import { Product } from '@/types/product';
import { useStringHelper } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

interface ProductScreenProps extends HomeStackScreenProps<'Product'> { }


const ProductHeader = () => (
    <Header>z
        <Header.BackAction />
        <Header.Action name="heart" type="ant" color="white" paddingRight={3} onPress={() => { }} size={7} />

    </Header>
);


export const ProductScreen: React.FC<ProductScreenProps> = ({ route }) => {
    useHeader(ProductHeader);
    const product = route.params as Product | undefined;
    const { capitalFirstLetter } = useStringHelper();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    //handle add to cart
    const handleAddToCart = () => {
        if (product) {
            const cartItem = {
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: 1,
                image: product.image,
            };
            dispatch(addToCart(cartItem));
            Toast.show({ type: 'success', text1: 'Added to cart successfully' });
            navigation.navigate('CartStack' as never);
        }
    };

    //cached proudct if viewed
    useEffect(() => {
        dispatch(addProductToCache(product as Product));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <Box bg="primary" width={theme.sizes.width} height={theme.sizes.width} backgroundColor="white" alignItems="center" pt={10} borderBottomLeftRadius="rounded-xhu" borderBottomRightRadius="rounded-xhu" >
                    <FastImage source={{ uri: product?.image }} width={theme.sizes.width} height={theme.sizes.width / 1.2} resizeMode="contain" />
                </Box>
                <ContentSafeAreaView paddingTop={5} gap={10}>
                    <Card padding={4}>
                        <Text variant="heading2">{product?.title}</Text>
                        <HStack justifyContent="space-between" py={4}>
                            <Text variant="heading1" color="primary" fontWeight={900} >$ {product?.price}</Text>
                            <Box bg="primary" borderRadius="rounded-full" paddingHorizontal={3}>
                                <Text color="white">{capitalFirstLetter(product?.category as string)}</Text>
                            </Box>
                        </HStack>
                        <HStack gap={2} py={5}>
                            {Array.from({ length: Math.floor(product?.rating.rate as number) }).map((_, index) => (
                                <Box key={index}>
                                    <VectorIcon color="warning600" name="star" type="ant" />
                                </Box>
                            ))}
                        </HStack>
                        <Text textAlign="justify" mt={2}>{product?.description}</Text>
                    </Card>
                    <Button onPress={() => handleAddToCart()}><Button.Text title="Add To Cart" /></Button>

                </ContentSafeAreaView>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProductScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
});
