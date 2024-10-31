import React, { type FC, type PropsWithChildren, type ReactElement } from 'react';
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';

import { useTheme } from '@/theme/theme-provider';

type ClickableProps = PropsWithChildren & TouchableOpacityProps;

export const Clickable: FC<ClickableProps> = ({ children, ...rest }): ReactElement => {
    const theme = useTheme();

    return (
        <TouchableOpacity {...rest} activeOpacity={theme.sizes.activeOpacity}>
            {children}
        </TouchableOpacity>
    );
};

export default Clickable;
