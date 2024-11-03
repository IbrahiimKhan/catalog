import React, { type PropsWithChildren, type ReactElement } from 'react';
import { useNavigation } from '@react-navigation/native';
import { type LayoutProps } from '@shopify/restyle';

import { useSafeAreaInsetsStyle } from '@/hooks/useSafeAreaInsetsStyle';
import { type Theme } from '@/theme';
import { useTheme } from '@/theme/theme-provider';

import { IconButton, type IconButtonProps } from '../media-icons/IconButton';

import { Box } from './Box';
import { ContentSafeAreaView } from './ContentSafeAreaView';
import { Text } from '../typography/Text';

export const Header = ({ children }: PropsWithChildren): ReactElement => {
    const theme = useTheme();
    const containerInsets = useSafeAreaInsetsStyle(['top'], 'margin');

    return (
        <Box height={theme.sizes.minHeaderHeight} style={containerInsets} bg="primary" >
            <ContentSafeAreaView height="100%" justifyContent="center">
                <Box flexDirection="row" justifyContent="space-between" alignItems="center">
                    {children}
                </Box>
            </ContentSafeAreaView>
        </Box>
    );
};

const BackAction = ({ onPress }: { onPress?: () => void }): ReactElement => {
    const navigation = useNavigation();
    const navigateBack = (): void => {
        navigation.goBack();
    };

    return (
        <IconButton
            right={8}
            size={8}
            color="white"
            type="materialCommunity"
            name="chevron-left"
            onPress={onPress ?? navigateBack}
        />
    );
};

type ContentProps = {
    title: string;
    subTitle?: string | undefined;
} & LayoutProps<Theme>;

const Content = ({ title, subTitle = undefined, ...rest }: ContentProps): ReactElement => {
    return (
        <Box {...rest}>
            <Text variant="b2bold" color="white">{title}</Text>
            {subTitle !== undefined && <Text variant="b3medium" color="white">{subTitle}</Text>}
        </Box>
    );
};

const Action = (props: { name: string; onPress?: () => void } & IconButtonProps): ReactElement => {
    return <IconButton {...props} left={14} marginRight={4} />;
};

Header.BackAction = BackAction;
Header.Content = Content;
Header.Action = Action;

export default Header;
