import React, { Component } from 'react';
import { Container, Header, Title, Content, Text} from 'native-base';

export default class App extends Component {
    render() {
        return (
          <Container>
              <Header>
                  <Title>Bookie</Title>
              </Header>
              <Content>
                  <Text>Content will go here...</Text>
              </Content>
          </Container>
        );
    }
}