import React, {Component, PropTypes} from 'react';
import { Container, Header, Title, Content, Text, Button, Icon} from 'native-base';

import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

class RoomList extends Component {

    render() {
        return (
            <Container>
                <Header>
                    <Button transparent onPress={this.goBack}>
                        <Icon name='ios-arrow-back' />
                    </Button>
                    <Title>Bookie</Title>
                </Header>
                <Content>
                    <Text>Room list</Text>
                    {
                        this.props.data.loading ?
                        (<Text>Loading...</Text>)
                        :
                        (this.props.data.roomsOnFloor.map((room) => <Text key={room.number}>{room.name}</Text>))
                    }
                </Content>
            </Container>
        );
    }

    goBack = () => {
      this.props.navigator.pop();
    };

}

RoomList.propTypes = {
    data: PropTypes.shape({
        roomsOnFloor: PropTypes.arrayOf(PropTypes.object),
        loading: PropTypes.bool.isRequired,
    }).isRequired,
    roomNumber: PropTypes.string.isRequired
};


const FloorRoomsQuery = gql`
  query AvailableRoomsQuery($roomNumber: Int!){
    roomsOnFloor: rooms(floorMasterRoomNumber: $roomNumber) {
      name
      number
      capacity
      availability {
        busy
        availableFor
        availableFrom
      }
    }
  }
`;

export default graphql(FloorRoomsQuery, {
    options: ({roomNumber}) => ({variables: {roomNumber}}),
})(RoomList);
