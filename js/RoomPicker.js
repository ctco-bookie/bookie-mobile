import React, {Component} from 'react';
import { View } from 'react-native';
import { Text, Input, Content, Button, H1 } from 'native-base';

export default class RoomPicker extends Component {
    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'red'}}>
                <View style={{backgroundColor: 'powderblue'}}>
                    <H1>Pick a room</H1>
                    <Input placeholder="Room number" />
                    <Button large>Book</Button>
                </View>
            </View>
        );
    }
}