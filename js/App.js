import React, { Component } from 'react';
import { Container, Header, Title, Text, Content } from 'native-base';
import {Navigator} from 'react-native';
import RoomPicker from './RoomPicker';
import RoomList from './RoomList';

export default class App extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <Navigator
                initialRoute={{id: 'roomPicker'}}
                renderScene={this.renderScene}
            ></Navigator>
        );
    }

    renderScene(route, navigator) {
        switch (route.id) {
            case 'roomPicker': {
                return <RoomPicker navigator={navigator} />
            }
            case 'roomList': {
                return <RoomList navigator={navigator} />
            }
        }
    }
}