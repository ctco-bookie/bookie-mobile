import React, {Component, PropTypes} from 'react';

import {
    Text,
    Button,
    Card,
    CardItem,
} from 'native-base';

import {View} from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

class RoomInfo extends Component {

    static propTypes = {
        room: PropTypes.object.isRequired,
        onRoomBook: PropTypes.func.isRequired
    };

    render() {
        const {room} = this.props;

        const styles = room.master ?
            {
                container: {backgroundColor: room.availability.busy ? '#FF482C' : '#3ABF78'},
                headerText: {color: '#fff'},
                capacity: {fontSize: 18, marginBottom: 10, color: '#fff'},
                timeStatus: {
                    busy: {fontSize: 18, color: '#fff'}, busyIcon: {fontSize: 18, color: 'red'},
                    available: {color: '#fff', fontSize: 18}, availableIcon: {color: '#fff', fontSize: 18}}
            }
            :
            {
                container: {},
                headerText: {},
                capacity: {fontSize: 16, marginBottom: 10},
                timeStatus: {
                    busy: {fontSize: 16}, busyIcon: {fontSize: 16, color: 'red'},
                    available: {fontSize: 16}, availableIcon: {color: 'green', fontSize: 16}}
            };

        return (
            <Card style={styles.container}>
                <CardItem header>
                    <Text style={styles.headerText}>{room.name} ({room.number})</Text>
                </CardItem>
                <CardItem>
                    <FontAwesomeIcon name="user" style={styles.capacity}> {room.capacity}</FontAwesomeIcon>
                    {this.renderTimeStatus(room, styles)}
                </CardItem>
                {
                    room.availability.busy ?
                        <View></View>
                        :
                        <CardItem footer style={{flexDirection: 'row-reverse'}}>
                            <Button
                                warning={room.master}
                                info={!room.master}
                                onPress={() => this.props.onRoomBook(room)}>Book {room.name}
                            </Button>
                        </CardItem>
                }
            </Card>
        );
    }

    renderTimeStatus = (room, styleBook) => {
        return room.availability.busy
            ? <FontAwesomeIcon name="times" style={styleBook.timeStatus.busyIcon}>
                <Text style={styleBook.timeStatus.busy}>&nbsp;busy till {room.availability.availableFrom}</Text>
              </FontAwesomeIcon>
            : <FontAwesomeIcon name="check-circle" style={styleBook.timeStatus.availableIcon}>
                <Text style={styleBook.timeStatus.available}>&nbsp;available for {room.availability.availableFor}</Text>
              </FontAwesomeIcon>;
    };
}

export default RoomInfo;