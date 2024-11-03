import React from 'react';
import { HStack, IconButton } from '@/components';

interface SortButtonsProps {
    sort: 'asc' | 'desc';
    onSortChange: (sortOrder: 'asc' | 'desc') => void;
}

export const SortButtons: React.FC<SortButtonsProps> = ({ sort, onSortChange }) => (
    <HStack gap={5}>
        <IconButton
            name="sort-asc"
            type="octicon"
            color="primary"
            iconStyle={sort === 'asc' ? 'contained' : 'default'}
            onPress={() => onSortChange('asc')}
        />
        <IconButton
            name="sort-desc"
            type="octicon"
            color="primary"
            iconStyle={sort === 'desc' ? 'contained' : 'default'}
            onPress={() => onSortChange('desc')}
        />
    </HStack>
);

export default SortButtons;
