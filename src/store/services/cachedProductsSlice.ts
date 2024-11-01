import { Product } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CachedProductsState {
    products: Product[];
}

const initialState: CachedProductsState = {
    products: [],
};

const cachedProductsSlice = createSlice({
    name: 'cachedProducts',
    initialState,
    reducers: {
        addProductToCache(state, action: PayloadAction<Product>) {
            const existingItem = state.products.find(item => item.id === action.payload.id);
            if (existingItem) {
                return;
            } else {
                state.products.push(action.payload);
            }
        },

    },
});

export const { addProductToCache } = cachedProductsSlice.actions;
export default cachedProductsSlice.reducer;
