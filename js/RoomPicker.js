import React, {Component} from 'react';
import { Container, Header, Title, Content, Text, Button} from 'native-base';

export default class RoomPicker extends Component {
    render() {
        return (
            <Container>
                <Header>
                    <Title>Bookie</Title>
                </Header>
                <Content>
                    <Text>Room picker</Text>
                    <Button onPress={this.navigate}>Go somewhere</Button>
                </Content>
            </Container>
        );
    }

    navigate = () => {
        this.props.navigator.push({id: 'roomList'})
    }
}