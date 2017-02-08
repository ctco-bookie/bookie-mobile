import React, {Component, PropTypes} from 'react';

import {
    Container,
    Header,
    Title,
    Content,
    Text,
    Button,
    Icon
} from 'native-base';

import {View} from 'react-native';


import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';

import RoomNotFound from './RoomNotFound';
import Loader from './Loader';
import RoomInfo from './RoomInfo';

class RoomList extends Component {

    static propTypes = {
        masterRoom: PropTypes.shape({
            roomsOnFloor: PropTypes.arrayOf(PropTypes.object),
            loading: PropTypes.bool.isRequired,
        }).isRequired,
        roomNumber: PropTypes.string.isRequired,
        navigator: PropTypes.object.isRequired
    };

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
                        {this.renderMasterRoom(this.props.masterRoom)}
                    </View>
                    <View>
                        {
                            (!this.props.masterRoom.loading) ?
                                this.props.availableRooms.loading ?
                                    <Loader text="Looking for available rooms.."/>
                                    :
                                    (this.renderAvailableRooms(this.props.availableRooms.roomsOnFloor))
                                : <Text></Text>
                        }
                    </View>
                </Content>
            </Container>
        );
    }

    renderMasterRoom(masterRoom) {
        if (masterRoom.loading) {
            return <Loader text="Checking room availability"/>;
        } else {
            if (!masterRoom.floorMasterRoom) {
                RoomNotFound.show(this.props.navigator, this.props.roomNumber);
            } else {
                return this.renderRoomCard(Object.assign({}, masterRoom.floorMasterRoom, {master: true}));
            }
        }
    }

    renderRoomCard = (room) => {
        return (
            <RoomInfo
                key={room.number}
                room={room}
                onRoomBook={this.bookRoom}
            />
        );
    };

    renderAvailableRooms = (rooms) => {
        rooms = (rooms || []).filter(room => !room.availability.busy)
            .sort((a, b) => a.number - b.number);
        return (
            <Content>
                <Text style={{marginTop: 20, opacity: 0.54}}>Available rooms on this floor</Text>
                {rooms.map(this.renderRoomCard)}
            </Content>
        );
    };

    bookRoom = (room) => {
        this.props.navigator.resetTo({id: 'roomBook', room});
    };

    goBack = () => {
        this.props.navigator.resetTo({id: 'roomPicker'});
    };
}

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
