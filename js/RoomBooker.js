import React, {Component, PropTypes} from 'react';

import {
    Icon,
    Content,
    Button,
    Container,
    Header,
    Title,
    Card,
    Text,
    CardItem,
    List,
    ListItem,
    Radio,
    Spinner
} from 'native-base';

import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

import bookingOptions from './booking-options';
import Loader from './Loader';

class RoomBooker extends Component {
    constructor() {
        super();

        this.state = {
            result: null,
            selectedOption: bookingOptions[0],
            bookInProgress: false
        };

        this.book = this.book.bind(this);
    };

    render() {
        if (this.state.bookInProgress) {
            return (
                <Container>
                    <Header>
                        <Title>Bookie</Title>
                    </Header>
                    <Content style={{ padding: 10 }}>
                        <Loader text="Booking room now" />
                    </Content>
                </Container>
            );
        }


        const {room} = this.props;

        return (
            <Container>
                <Header>
                    <Button
                        transparent
                        onPress={!this.state.result ? this.goBack
                            : this.goBackToPicker}
                    >
                        <Icon name='ios-arrow-back'/>
                    </Button>
                    <Title>Bookie</Title>
                </Header>
                <Content style={{ padding: 10 }}>{this.renderContents(room)}</Content>
            </Container>
        );
    }

    renderContents(room) {
        if (!this.state.result) {
            return this.renderForm(room);
        } else if (this.state.result.success) {
            return this.renderSuccess();
        } else {
            return this.renderFail();
        }
    };

    renderBookResult() {
        return (
            <Text>{this.state.result.message}</Text>
        )
    };

    renderSuccess = () => this.renderBookResult();

    renderFail = () => this.renderBookResult();

    renderForm = (room) => {
        return (
            <Card>
                <CardItem header>
                    <Text>{`Book ${room.name} (${room.number}) for`}</Text>
                </CardItem>
                <List>
                    {bookingOptions.map(option => {
                        return (
                            <ListItem key={option.label}>
                                <Radio
                                    selected={option.duration === this.state.selectedOption.duration}
                                    onPress={() => this.setState({selectedOption: option})}
                                />
                                <Text>{option.label}</Text>
                            </ListItem>
                        );
                    })}
                </List>
                <CardItem>
                    <Button onPress={this.book} style={{alignSelf: 'center'}}>Book now</Button>
                </CardItem>
            </Card>
        );
    };

    async book() {
        this.setState({bookInProgress: true});
        const {data: {bookRoom}} = await this.props.bookRoom(this.props.room, this.state.selectedOption);
        this.setState({result: bookRoom, bookInProgress: false});
    };

    goBackToPicker = () => {
        this.props.navigator.resetTo({id: 'roomPicker'});
    };

    goBack = () => {
        this.props.navigator.resetTo({id: 'roomList', roomNumber: this.props.room.number});
    };
}

RoomBooker.propTypes = {
    room: PropTypes.object,
    bookRoom: PropTypes.func.isRequired
};

const BookMutation = gql`
  mutation BookMutation($roomNumber: Int!, $bookForMinutes: Int!){
    bookRoom(roomNumber: $roomNumber, bookForMinutes: $bookForMinutes) {
      success
      message
    }
  }
`;

const withMutations = graphql(BookMutation, {
    props: ({mutate}) => ({
        bookRoom: ({number: roomNumber}, selectedOption) => mutate({
            variables: {
                roomNumber,
                bookForMinutes: selectedOption.duration
            }
        })
    })
});

export default withMutations(RoomBooker);
