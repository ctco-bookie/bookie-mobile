import React, {Component} from 'react';
import { Container, Header, Title, Content, Text, Button, Icon} from 'native-base';

export default class RoomList extends Component {

    render() {
        return (
          <Container>
              <Header>
                  <Title>Bookie</Title>
              </Header>
              <Content>
                <Container>
                    <Header>
                        <Button transparent onPress={this.goBack}>
                            <Icon name='ios-arrow-back' />
                        </Button>
                        <Title>Bookie</Title>
                    </Header>
                    <Content>
                        <Text>Room list</Text>
                    </Content>
                </Container>
              </Content>
          </Container>
        );
    }

    goBack = () => {
      this.props.navigator.pop();
    };

}