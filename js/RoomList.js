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

import {graphql, compose} from 'react-apollo';
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
                        this.props.masterRoom.loading ?
                            this.renderLoader('Checking room availability')
                            :
                            (this.renderRoomCard(this.props.masterRoom.floorMasterRoom))
                    }
                </Content>
                <Content>
                    {
                        this.props.availableRooms.loading ?
                            this.renderLoader('Finding available rooms')
                            :
                            (this.renderAvailableRooms(this.props.availableRooms.roomsOnFloor))
                    }
                </Content>
            </Container>
        );
    }

    goBack = () => {
        this.props.navigator.pop();
    };

    renderLoader = (text) => {
        return <Content style={{alignSelf: 'center'}}>
            <Spinner style={{alignSelf: 'center'}}/>
            <Text>{text}</Text>
        </Content>
    }

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
    availableRooms: PropTypes.shape({
        roomsOnFloor: PropTypes.arrayOf(PropTypes.object),
        loading: PropTypes.bool.isRequired,
    }).isRequired,
    masterRoom: PropTypes.shape({
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

const MasterRoomQuery = gql`
  query MasterRoomQuery($roomNumber: Int!){
    floorMasterRoom: room(roomNumber: $roomNumber) {
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

export default compose(
    graphql(FloorRoomsQuery, {
        options: ({roomNumber}) => ({variables: {roomNumber}}),
        name: 'availableRooms'    
    }),
    graphql(MasterRoomQuery, {
        options: ({roomNumber}) => ({variables: {roomNumber}}),
        name: 'masterRoom'
    })
)(RoomList);
