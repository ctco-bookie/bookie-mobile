import React, {Component} from 'react';
import { View } from 'react-native';
import { Text, Input, Content, Button, H1, Container, Header, Title, Icon } from 'native-base';

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
                <Content style={{backgroundColor: 'yellow', flex: 1}}>
                    <View style={{flex: 1, justifyContent: 'space-around', backgroundColor: 'red'}}>
                        <View style={{height: 200, backgroundColor: 'powderblue'}}>
                            <H1>Pick a room</H1>
                            <Input placeholder="Room number" />
                            <Button large onPress={this.navigate}>Book</Button>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }

    navigate = () => {
        this.props.navigator.push({id: 'roomList', roomNumber: '408'})
    }
}