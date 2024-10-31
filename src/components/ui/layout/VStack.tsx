import React, { type PropsWithChildren } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import {
    createRestyleComponent,
    layout,
    type LayoutProps,
    spacing,
    type SpacingProps,
    spacingShorthand,
    type SpacingShorthandProps,
} from '@shopify/restyle';

import { type Theme } from '@/theme';

type VStackProps = SpacingProps<Theme> &
    SpacingShorthandProps<Theme> &
    LayoutProps<Theme> &
    PropsWithChildren & {
        reverse?: boolean;
        style?: StyleProp<ViewStyle>;
    };

const RestyleView = createRestyleComponent<VStackProps, Theme>([spacing, spacingShorthand, layout]);

export const VStack: React.FC<VStackProps> = ({ children, reverse = false, ...rest }) => {
    const flexDirection = reverse ? 'column-reverse' : 'column';

    return (
        <RestyleView flexDirection={flexDirection} {...rest}>
            {children}
        </RestyleView>
    );
};

export default VStack;
