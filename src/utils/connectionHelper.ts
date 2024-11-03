import { setConnectionStatus } from '@/store/services/connectionSlice';
import NetInfo from '@react-native-community/netinfo';
import { AppDispatch } from '../store/store';

export const monitorConnectionStatus = (dispatch: AppDispatch) => {
    const unsubscribe = NetInfo.addEventListener(state => {
        dispatch(setConnectionStatus(state.isConnected ?? false));
    });
    return unsubscribe;
};
