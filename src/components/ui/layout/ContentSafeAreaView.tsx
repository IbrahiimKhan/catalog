import React, { type FC, type PropsWithChildren } from 'react';
import { type LayoutProps, type SpacingProps } from '@shopify/restyle';

import { type Theme } from '@/theme';
import { useTheme } from '@/theme/theme-provider';

import { Box } from './Box';

type RestyleProps = SpacingProps<Theme> & LayoutProps<Theme>;

interface ContentSafeAreaViewProps extends RestyleProps, PropsWithChildren { }

export const ContentSafeAreaView: FC<ContentSafeAreaViewProps> = ({ children, ...rest }) => {
    const theme = useTheme();

    return (
        <Box
            width={theme.sizes.safeWidth}
            style={{
                marginHorizontal: theme.sizes.sideSpace,
            }}
            {...rest}>
            {children}
        </Box>
    );
};

export default ContentSafeAreaView;
