import React from 'react';
import { HStack, IconButton } from '@/components';

interface SortButtonsProps {
    sort: 'asc' | 'desc';
    onSortChange: (sortOrder: 'asc' | 'desc') => void;
}

export const SortButtons: React.FC<SortButtonsProps> = ({ sort, onSortChange }) => (
    <HStack gap={3}>
        <IconButton
            name="sort-asc"
            type="octicon"
            color={sort === 'asc' ? 'primary' : 'black'}
            onPress={() => onSortChange('asc')}
        />
        <IconButton
            name="sort-desc"
            type="octicon"
            color={sort === 'desc' ? 'primary' : 'black'}

            onPress={() => onSortChange('desc')}
        />
    </HStack>
);

export default SortButtons;
