import React, {Component} from 'react';

import { View } from 'react-native';

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
        this.state = {room: '408'};
    }

    render() {
        return (
            <Container>
                <Header>
                    <Title>Bookie</Title>
                </Header>
                <Content style={{paddingTop: 100}}>
                    <H1 style={{textAlign: 'center'}}>Pick a room</H1>
                    <InputGroup borderType='underline' style={{margin: 30}}>
                        <Input value={this.state.room} onChangeText={this.roomChange} keyboardType="numeric" />
                    </InputGroup>
                    <Button large onPress={this.navigate} style={{alignSelf: 'center'}}>Book now</Button>
                    <Text>OR</Text>
                    <Button large onPress={this.scan} style={{alignSelf: 'center'}}>Scan QR Code now</Button>
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