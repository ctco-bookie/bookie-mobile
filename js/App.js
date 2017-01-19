import React, { Component } from 'react';
import { Container, Header, Title, Text, Content } from 'native-base';
import RoomPicker from './RoomPicker'

export default class App extends Component {
    render() {
        return (
          <Container>
              <Header>
                  <Title>Bookie</Title>
              </Header>
              <Content>
                <RoomPicker />
              </Content>
          </Container>
        );
    }
}