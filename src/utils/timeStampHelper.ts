import moment from 'moment';
import { NativeEventEmitter, NativeModules } from 'react-native';

const { TimeStampModule } = NativeModules;
const timestampEmitter = new NativeEventEmitter(TimeStampModule);

export const startTimestampTimer = (): Promise<string> => {
    return TimeStampModule.startTimer();
};

export const stopTimestampTimer = (): Promise<string> => {
    return TimeStampModule.stopTimer();
};

export const subscribeToTimestamps = (callback: (timestamp: number) => void) => {
    const subscription = timestampEmitter.addListener('onNewTimestamp', (event) => {
        callback(event.timestamp);
    });
    return subscription;
};

export const formatTimestamp = (timestamp: number): string => {
    return  moment(timestamp).format('h:mm:ss a');
};
