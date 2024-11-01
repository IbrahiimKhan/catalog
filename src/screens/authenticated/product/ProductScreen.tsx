
import { ContentSafeAreaView, Header, HStack, IconButton } from '@/components';
import useHeader from '@/hooks/useHeader';
import { useGetProductsQuery } from '@/store/services/apiSlice';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';


const ProductHeader = () => (
    <Header>
        <Header.Content title="Hello User" subTitle="Let's start shopping!" />
        <Header.Action name="bells" type="ant" color="primary" onPress={() => { }} size={7} />
    </Header>
);


export const ProductScreen: React.FC = () => {
    useHeader(ProductHeader);
    const [qParams, setQParams] = useState<{ limit: number; sort: 'asc' | 'desc' }>({ limit: 10, sort: 'asc' });
    const { data: products, error, isLoading } = useGetProductsQuery(qParams);
    const dispatch = useDispatch();



    return (
        <SafeAreaView style={styles.container}>
            <ContentSafeAreaView flex={1} />
        </SafeAreaView>
    );
};

export default ProductScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
