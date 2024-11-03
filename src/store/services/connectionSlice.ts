import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConnectionState {
    isConnected: boolean | null;
}

const initialState: ConnectionState = {
    isConnected: null,
};

const connectionSlice = createSlice({
    name: 'connection',
    initialState,
    reducers: {
        setConnectionStatus: (state, action: PayloadAction<boolean>) => {
            state.isConnected = action.payload;
        },
    },
});

export const { setConnectionStatus } = connectionSlice.actions;

export default connectionSlice.reducer;
