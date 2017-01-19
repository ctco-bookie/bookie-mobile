import React, {Component} from 'react';
import { View } from 'react-native';
import { Text, Input, Content, Button, H1, Container, Header, Title, Icon, InputGroup } from 'native-base';

export default class RoomPicker extends Component {
    render() {
        return (
            <Container>
                <Header>
                    <Button transparent onPress={this.goBack}>
                        <Icon name='ios-arrow-back' />
                    </Button>
                    <Title>Bookie</Title>
                </Header>
                <Content style={{paddingTop: 100}}>
                    <H1 style={{textAlign: 'center'}}>Pick a room</H1>
                    <InputGroup borderType='underline' style={{margin: 30}}>
                        <Input placeholder="Room number" />
                    </InputGroup>
                    <Button large onPress={this.navigate} style={{alignSelf: 'center'}}>Book now</Button>
                </Content>
            </Container>
        );
    }

    navigate = () => {
        this.props.navigator.push({id: 'roomList', roomNumber: '408'})
    }
}