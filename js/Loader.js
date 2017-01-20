import React, {Component} from 'react';

import {View} from 'react-native';
import {
    Spinner,
    Text,
} from 'native-base';


export default class Loader extends Component {
    render() {
        return <View style={{alignSelf: 'center'}}>
            <Spinner style={{alignSelf: 'center'}} color="blue"/>
            <Text>{this.props.text}</Text>
        </View>
    }
}