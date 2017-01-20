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
    Spinner,
    Badge
} from 'native-base';

import { View } from 'react-native';

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
                <Content style={{ padding: 10 }}>
                    <View>
                    {
                        this.props.masterRoom.loading ?
                            this.renderLoader('Checking room availability')
                            :
                            (this.renderRoomCard(this.props.masterRoom.floorMasterRoom))
                    }
                    </View>
                    <View>
                        {
                            (!this.props.masterRoom.loading) ?
                                this.props.availableRooms.loading ?
                                    this.renderLoader('Finding available rooms')
                                    :
                                    (this.renderAvailableRooms(this.props.availableRooms.roomsOnFloor))
                                : <Text></Text>
                        }
                    </View>
                </Content>
            </Container>
        );
    }

    goBack = () => {
        this.props.navigator.resetTo({id: 'roomPicker'});
    };

    renderLoader = (text) => {
        return <Content style={{alignSelf: 'center'}}>
            <Spinner style={{alignSelf: 'center'}}/>
            <Text>{text}</Text>
        </Content>
    };

    renderAvailableRooms = (rooms) => {
        rooms = (rooms || []).filter(room => !room.availability.busy)
                             .sort((a, b) => a.number - b.number);
        return (
            <Content>
                <Text style={{marginTop: 20}}>Available rooms on this floor</Text>
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
                    <FontAwesomeIcon name="user" style={{fontSize: 18, marginBottom: 10}}> {room.capacity}</FontAwesomeIcon>
                    {this.renderTimeStatus(room)}
                </CardItem>
                <CardItem footer style={{flexDirection: 'row-reverse'}}>
                    <Button onPress={() => this.bookRoom(room.number)}>Book {room.name}</Button>
                </CardItem>
            </Card>
        );
    };

    bookRoom = (roomNumber) => {
        this.props.navigator.resetTo({id: 'roomBook', roomNumber});
    };

    renderTimeStatus = (room) => {
        return room.availability.busy 
            ? <FontAwesomeIcon name="times" style={{fontSize: 18, color: 'red'}}> busy till {room.availability.availableFrom}</FontAwesomeIcon>
            : <FontAwesomeIcon name="check-circle" style={{fontSize: 18, color: 'green'}}> available for {room.availability.availableFor}</FontAwesomeIcon>;
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

const rooomAvailabilityFragment = gql`
    fragment roomAvailability on Room {
        name
        number
        capacity
        availability {
        busy
        availableFor
        availableFrom
        }
    }
`;

const FloorRoomsQuery = gql`
  query AvailableRoomsQuery($roomNumber: Int!){
    roomsOnFloor: rooms(floorMasterRoomNumber: $roomNumber) {
      ...roomAvailability
    }
  }
  ${rooomAvailabilityFragment}
`;

const MasterRoomQuery = gql`
  query MasterRoomQuery($roomNumber: Int!){
    floorMasterRoom: room(roomNumber: $roomNumber) {
      ...roomAvailability
    }
  }
  ${rooomAvailabilityFragment}
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
