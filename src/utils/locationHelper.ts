import { setLocation } from '@/store/services/locationSlice';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';
import Toast from 'react-native-toast-message';

import {
    promptForEnableLocationIfNeeded,
} from 'react-native-android-location-enabler';



 export const   handleEnabledLocation = async(dispatch:any) =>{
    if (Platform.OS === 'android') {
      try {
      const enabled =  await promptForEnableLocationIfNeeded();
      if (enabled) {
       await requestLocationPermission(dispatch);
      }
      } catch (error: unknown) {
        if (error instanceof Error) {
            Toast.show({type:'error',text1:"Could'nt turn on location"});
        }
      }
    }
  };


export const requestLocationPermission = async (dispatch: any) => {
    if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message: 'This app needs access to your location.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getCurrentLocation(dispatch);
        } else {
            Toast.show({ type: 'error', text1: 'Location permission denied' });
        }
    } else {
        getCurrentLocation(dispatch);
    }
};


export const getCurrentLocation = (dispatch: any) => {
    Geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            dispatch(setLocation({ latitude, longitude }));
        },
        (error) => {
            Toast.show({ type: 'error', text1: 'Error getting location', text2: error.message });
        },
    );
};
