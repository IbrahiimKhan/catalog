import React, { type FC, type PropsWithChildren, type ReactElement } from 'react';
import {
    backgroundColor,
    type BackgroundColorProps,
    border,
    type BorderProps,
    type ColorProps,
    createRestyleComponent,
    createVariant,
    layout,
    type LayoutProps,
    opacity,
    type OpacityProps,
    position,
    type PositionProps,
    spacing,
    type SpacingProps,
    type VariantProps,
} from '@shopify/restyle';

import { type Theme } from '@/theme';

import { Clickable } from '../forms/Clickable';
import VectorIcon, { VectorIconProps } from './VectorIcon';


type RestyleProps = VariantProps<Theme, 'iconButtonVariants', 'iconStyle'> &
    SpacingProps<Theme> &
    LayoutProps<Theme> &
    PositionProps<Theme> &
    BackgroundColorProps<Theme> &
    BorderProps<Theme> &
    OpacityProps<Theme> &
    PropsWithChildren;

const iconStyle = createVariant({ themeKey: 'iconButtonVariants', property: 'iconStyle' });

const RestyleView = createRestyleComponent<RestyleProps, Theme>([
    iconStyle,
    spacing,
    layout,
    backgroundColor,
    border,
    opacity,
    position,
]);

export type IconButtonProps = VectorIconProps &
    RestyleProps & {
        onPress?: () => void;
        disabled?: boolean;
    };

export const IconButton: FC<IconButtonProps> = ({
    name,
    onPress = null,
    size = 7,
    color,
    iconStyle,
    disabled = false,
    padding,
    ...rest
}): ReactElement => {
    const render = (): ReactElement => {
        return (
            <RestyleView
                iconStyle={iconStyle}
                padding={padding}
                backgroundColor={

                    iconStyle === 'contained' && color
                        ? ('primary50' as ColorProps<Theme>['color'])
                        : undefined
                }
                opacity={disabled ? 0.3 : 1}
                borderColor={iconStyle === 'outlined' ? color : undefined}>
                <VectorIcon name={name} size={size} color={color} {...rest} />
            </RestyleView>
        );
    };

    if (onPress !== null) {
        return (
            <Clickable onPress={onPress} disabled={disabled}>
                {render()}
            </Clickable>
        );
    }

    return render();
};

export default IconButton;
