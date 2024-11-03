import { Header } from '@/components';
import React from 'react';


export const HistoryHeader = () => (
    <Header>
        <Header.Content title="Hello User" subTitle="History screen!" />
        <Header.Action name="bells" type="ant" color="primary" onPress={() => { }} size={7} />
    </Header>
);

