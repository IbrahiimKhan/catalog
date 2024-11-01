
import { Box, Button, Card, ContentSafeAreaView, FastImage, Header, HStack, Text, VectorIcon } from '@/components';
import useHeader from '@/hooks/useHeader';
import theme from '@/theme';
import { AuthenticatedStackNavigatorScreenProps } from '@/types/navigation';
import { Product } from '@/types/product';
import { useStringHelper } from '@/utils';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

interface ProductScreenProps extends AuthenticatedStackNavigatorScreenProps<'Product'> { }


const ProductHeader = () => (
    <Header>
        <Header.BackAction />
        <Header.Action name="heart" type="ant" color="primary" onPress={() => { }} size={7} />

    </Header>
);


export const ProductScreen: React.FC<ProductScreenProps> = ({ navigation, route }) => {
    useHeader(ProductHeader);
    const product = route.params as Product | undefined;
    const { capitalFirstLetter } = useStringHelper();



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
                    <Button ><Button.Text title="Add To Cart" /></Button>

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
