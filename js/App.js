import React, { Component } from 'react';

import ApolloClient, {createNetworkInterface} from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import {Navigator} from 'react-native';

import RoomPicker from './RoomPicker';
import RoomList from './RoomList';
import RoomBooker from './RoomBooker';

import {
    BACKEND_URL
} from 'react-native-dotenv';

export default class App extends Component {
    render() {
        const client = new ApolloClient({
            networkInterface: createNetworkInterface({uri: `${BACKEND_URL}/graphql`})
        });

        return (
            <ApolloProvider client={client}>
                <Navigator
                    initialRoute={{id: 'roomPicker'}}
                    renderScene={this.renderScene}
                >
                </Navigator>
            </ApolloProvider>
        );
    }

    renderScene(route, navigator) {
        switch (route.id) {
            case 'roomPicker': {
                return <RoomPicker navigator={navigator} />
            }
            case 'roomList': {
                return <RoomList navigator={navigator} roomNumber={route.roomNumber} />
            }
            case 'roomBook': {
                return <RoomBooker navigator={navigator} roomNumber={route.roomNumber} />
            }
        }
    }
}