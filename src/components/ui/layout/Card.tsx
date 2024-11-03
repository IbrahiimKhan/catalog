import React, { type PropsWithChildren, type ReactElement } from 'react';
import {
    backgroundColor,
    type BackgroundColorProps,
    border,
    type BorderProps,
    createRestyleComponent,
    createVariant,
    layout,
    type LayoutProps,
    opacity,
    type OpacityProps,
    position,
    PositionProps,
    spacing,
    type SpacingProps,
    type VariantProps,
} from '@shopify/restyle';

import { type Theme } from '@/theme';

import { Box } from './Box';
import { Text } from '../typography/Text';

export type CardProps = VariantProps<Theme, 'cardVariants'> &
    SpacingProps<Theme> &
    LayoutProps<Theme> &
    BorderProps<Theme> &
    BackgroundColorProps<Theme> &
    OpacityProps<Theme> &
    PositionProps<Theme> &
    PropsWithChildren;

const variant = createVariant<Theme, 'cardVariants'>({ themeKey: 'cardVariants' });

const RestyleView = createRestyleComponent<CardProps, Theme>([
    spacing,
    layout,
    border,
    backgroundColor,
    opacity,
    position,
    variant,
]);

interface CardTitleType {
    title: string;
}

export const CardTitle = ({ title }: CardTitleType): ReactElement => {
    return (
        <Box padding={4} mb={4}>
            <Text variant="b3bold" color="black">
                {title}
            </Text>
        </Box>
    );
};

export const CardContent = ({ children }: PropsWithChildren): ReactElement => {
    return <Box padding={4}>{children}</Box>;
};


export const CardActions = ({ children }: PropsWithChildren): ReactElement => {
    return <Box padding={4}>{children}</Box>;
};

export const Card = ({ children, borderRadius, ...rest }: CardProps): ReactElement => {
    return (
        <RestyleView borderRadius={borderRadius} {...rest}>
            {children}
        </RestyleView>
    );
};

Card.Title = CardTitle;
Card.Content = CardContent;
Card.Actions = CardActions;

export default Card;
