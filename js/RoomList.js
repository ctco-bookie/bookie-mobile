import React, {Component, PropTypes} from 'react';

import {
    Container,
    Header,
    Title,
    Content,
    Text,
    Button,
    Icon,
    Card,
    CardItem,
    Spinner
} from 'native-base';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

class RoomList extends Component {
    render() {
        return (
            <Container>
                <Header>
                    <Button transparent onPress={this.goBack}>
                        <Icon name='ios-arrow-back'/>
                    </Button>
                    <Title>Bookie</Title>
                </Header>
                <Content>
                    {
                        this.props.data.loading ?
                            (<Content>
                                <Spinner/>
                                <Text>Checking room availability</Text>
                            </Content>)
                            :
                            (this.renderAvailableRooms(this.props.data.roomsOnFloor))
                    }
                </Content>
            </Container>
        );
    }

    goBack = () => {
        this.props.navigator.pop();
    };

    renderAvailableRooms = (rooms) => {
        rooms = (rooms || []).filter(room => !room.availability.busy)
                             .sort((a, b) => a.number - b.number);
        return (
            <Content>
                <Text>Available rooms on this floor</Text>
                {rooms.map(this.renderRoomCard)}
            </Content>
        );
    };

    renderRoomCard = (room) => {
        return (
            <Card key={room.number}>
                <CardItem header>
                    <Text>{room.name} ({room.number})</Text>
                </CardItem>
                <CardItem>
                    <FontAwesomeIcon name="user"> {room.capacity}</FontAwesomeIcon>
                    <Text>{this.renderTimeStatus(room)}</Text>
                </CardItem>
                <CardItem footer>
                    <Button onPress={() => this.bookRoom(room.number)}>Book {room.name}</Button>
                </CardItem>
            </Card>
        );
    };

    bookRoom = (roomNumber) => {
        this.props.navigator.push({id: 'roomBook', roomNumber});
    };

    renderTimeStatus = (room) => {
        return room.availability.busy ? `busy till ${room.availability.availableFrom}`
                                      : `available ${room.availability.availableFor}`;
    };

}

RoomList.propTypes = {
    data: PropTypes.shape({
        roomsOnFloor: PropTypes.arrayOf(PropTypes.object),
        loading: PropTypes.bool.isRequired,
    }).isRequired,
    roomNumber: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired
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
