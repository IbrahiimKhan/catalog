import { Box, HStack, Loader, Text, VectorIcon } from '@/components';
import { RootState } from '@/store/store';
import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';

export const LocationScreen: React.FC = () => {
    const location = useSelector((state: RootState) => state.location);

    console.log(location);

    const initialRegion = {
        latitude: location?.latitude || 0,
        longitude: location?.longitude || 0,
        latitudeDelta: 0.0062,
        longitudeDelta: 0.0421,
    };

    return (
        <Box flex={1}>
            {location?.latitude !== null && location?.longitude !== null ? (
                <MapView style={styles.map} initialRegion={initialRegion}>
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        title="Your Location"
                        description="This is where you are"
                    />
                </MapView>
            ) : (
                <Loader />
            )}
        </Box>
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },

});

export default LocationScreen;
