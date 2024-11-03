import { Header } from '@/components';
import React from 'react';


export const HomeHeader = () => (
    <Header>
        <Header.Content title="Hello User" subTitle="Let's start shopping!" />
        <Header.Action name="bells" type="ant" color="primary" onPress={() => { }} size={7} />
    </Header>
);

