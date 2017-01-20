import React, {Component} from 'react';

import { View, Image } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {
    Input,
    Content,
    Button,
    H1,
    Container,
    Header,
    Title,
    Text,
    InputGroup
} from 'native-base';

export default class RoomPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {room: null};
    }

    render() {
        return (
            <Container>
                <Content style={{paddingTop: 50}} contentContainerStyle={{alignItems: 'center'}}>
                    <Text style={{fontSize: 50, lineHeight: 50, padding: 50}}>Bookie</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <InputGroup borderType='underline' style={{margin: 30, marginRight: 10, marginLeft: 0, width: 180}}>
                            <Input value={this.state.room} onChangeText={this.roomChange} keyboardType="numeric" style={{fontSize: 25, height: 60}} placeholder="Room number" />
                        </InputGroup>
                        <Button large onPress={this.navigate} style={{alignSelf: 'center'}}>Book Now</Button>
                    </View>
                    <Text style={{fontSize: 25, lineHeight: 25}}>OR</Text>
                    <Button large onPress={this.scan} style={{alignSelf: 'center', marginTop: 20}}>
                        <FontAwesomeIcon name="qrcode" style={{fontSize: 20}}></FontAwesomeIcon> Scan QR Code
                    </Button>
                </Content>
            </Container>
        );
    }

    navigate = () => {
        this.props.navigator.resetTo({id: 'roomList', roomNumber: this.state.room});
    };

    scan = () => {
        this.props.navigator.resetTo({id: 'qrScan'});
    };

    roomChange = (room) => {
        this.setState({
            room
        });
    }
}