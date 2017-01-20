import React, {Component} from 'react';
import {Dimensions, StyleSheet, View, Vibration} from 'react-native';

import {
    Content,
    Button,
    Container,
    Header,
    Title,
    Icon,
} from 'native-base';

import Camera from 'react-native-camera';

import {
    BACKEND_URL
} from 'react-native-dotenv';


export default class QRCodeScan extends Component {

    constructor() {
        super();
        this.state = {
            show: true
        };
    }

    render() {
        return (
            <Container>
                <Header>
                    <Button transparent onPress={this.goBack}>
                        <Icon name='ios-arrow-back'/>
                    </Button>
                    <Title>Scan QR Code</Title>
                </Header>
                <Content>
                    {this.renderCamera()}
                </Content>
            </Container>

        );
    }

    goBack = () => {
        this.props.navigator.pop();
    };

    renderCamera = () => {
        if (this.state.show) {
            return (
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    aspect={Camera.constants.Aspect.fill}
                    style={styles.preview}
                    onBarCodeRead={this.processBarCode}
                    type={Camera.constants.Type.back}
                >
                </Camera>
            )
        } else {
            return <View></View>;
        }
    };

    processBarCode = (e) => {
        this.setState({show: false});
        Vibration.vibrate();
        const pattern = /.*\/room\/(\d+)\/check/;
        const groups = pattern.exec(e.data);
        const roomNumber = groups[1];
        this.props.navigator.push({id: 'roomList', roomNumber});
    };

}

const styles = StyleSheet.create({
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
});