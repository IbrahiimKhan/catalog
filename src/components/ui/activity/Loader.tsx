import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Box } from '../layout/Box';
import theme from '@/theme';

export const Loader = () => {
    return (
        <Box flex={1} alignItems="center" justifyContent="center"><ActivityIndicator
            color={theme.colors.primary}
            size={'large'} /></Box>
    );
};

export default Loader;

