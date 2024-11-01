import { CartItem } from '@/types/cart';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        removeFromCart(state, action: PayloadAction<number>) {
            const existingItem = state.items.find(item => item.id === action.payload);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    state.items = state.items.filter(item => item.id !== action.payload);
                }
            }
        },
    },
});

export const { addToCart,removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
