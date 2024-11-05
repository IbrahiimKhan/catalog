import { CartItem } from '@/types/cart';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

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
                    Toast.show({type:'success',text1:'Successfully removed item'});
                }
            }
        },
    },
});

export const { addToCart,removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
