import { Header, HStack } from '@/components';
import useHeader from '@/hooks/useHeader';
import React, { ReactElement } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
SafeAreaView;


const HomeHeader = (): ReactElement => {
    return (
        <Header>
            <Header.Content title="Hello User" subTitle="Let's start shopping!" />
            <Header.Action name="bells" type="ant" onPress={() => { }} size={7} />
        </Header >
    );
};

export const HomeScreen = () => {
    useHeader(HomeHeader);

    return (
        <SafeAreaView />
    );
};

export default HomeScreen;

