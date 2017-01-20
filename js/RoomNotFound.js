import React, {Component, PropTypes} from 'react';

import {
    Alert
} from 'react-native';

export default class RoomNotFound {

    static isShowing = false;

    static show(navigator, roomNumber) {
        if (RoomNotFound.isShowing) {
            return;
        }
        RoomNotFound.isShowing = true;
        Alert.alert(
            'Error',
            `Room ${roomNumber} not found`,
            [
                {
                    text: 'OK',
                    onPress: () => {
                        RoomNotFound.isShowing = false;
                        navigator.resetTo({id: 'roomPicker'});
                    }
                }
            ]
        );
    }
}
