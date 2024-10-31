import React, { type FC, type PropsWithChildren } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import {
    createRestyleComponent,
    layout,
    type LayoutProps,
    position,
    type PositionProps,
    spacing,
    type SpacingProps,
    spacingShorthand,
    type SpacingShorthandProps,
} from '@shopify/restyle';

import { type Theme } from '@/theme';

type HStackProps = SpacingProps<Theme> &
    SpacingShorthandProps<Theme> &
    LayoutProps<Theme> &
    PositionProps<Theme> &
    PropsWithChildren & {
        reverse?: boolean;
        style?: StyleProp<ViewStyle>;
    };

const RestyleView = createRestyleComponent<HStackProps, Theme>([
    spacing,
    spacingShorthand,
    layout,
    position,
]);

export const HStack: FC<HStackProps> = ({ children, reverse = false, ...rest }) => {
    const flexDirection = reverse ? 'row-reverse' : 'row';

    return (
        <RestyleView flexDirection={flexDirection} alignItems="center" {...rest}>
            {children}
        </RestyleView>
    );
};

export default HStack;
