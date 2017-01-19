import React, {Component} from 'react';
import { Container, Header, Title, Content, Text} from 'native-base';

export default class RoomPicker extends Component {
    render() {
        return (
            <Container>
                <Header>
                    <Title>Bookie</Title>
                </Header>
                <Content>
                    <Text>Room picker</Text>
                </Content>
            </Container>
        );
    }
}