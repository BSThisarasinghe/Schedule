import _ from 'lodash';
import React, { Component } from 'react';
import { Text, TouchableOpacity, TextInput, View, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';
import { editSchedule, setReload, scheduleDelete } from '../actions';
import { Card, CardSection, Input, Button, Spinner, Confirm } from './common';

class EditSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reminder: this.props.navigation.state.params.schedule.reminder,
            date: this.props.navigation.state.params.schedule.date,
            time: this.props.navigation.state.params.schedule.time,
            isDatePickerVisible: false,
            isTimePickerVisible: false,
            success: false,
            showModal: false
        };
    }

    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true });
    };

    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false });
    };

    handleDatePicked = date => {
        // const day = Moment(date).format('d/MM/YYYY');

        this.setState({ date: Moment(date).format('DD/MM/YYYY') });
        this.hideDatePicker();
    };

    showTimePicker = () => {
        this.setState({ isTimePickerVisible: true });
    };

    hideTimePicker = () => {
        this.setState({ isTimePickerVisible: false });
    };

    handleBackButtonClick() {
        this.props.navigation.navigate('Profile');
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
    }

    handleTimePicked = time => {
        // console.log("A date has been picked: ", Moment(time).format('hh:mm'));
        this.setState({ time: Moment(time).format('hh:mm') });
        this.hideTimePicker();
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({ success: nextProps.success });
        // console.log(nextProps.success);
        if (nextProps.success === true) {
            this.props.navigation.navigate('Profile');
            this.props.setReload();
        }
    }

    onSubmit() {
        const { reminder, date, time } = this.state;

        this.props.editSchedule({ reminder, date, time, uid: this.props.navigation.state.params.schedule.uid });
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }

        return (
            <Button onPress={this.onSubmit.bind(this)} style={{ backgroundColor: 'rgba(82, 109, 127, 1)' }} textStyle={{ color: '#fff' }}>
                Save Changes
            </Button>
        );
    }

    onAccept() {
        const { uid } = this.props.navigation.state.params.schedule;

        this.props.scheduleDelete({ uid });
        this.setState({ showModal: false });
    }

    onDecline() {
        this.setState({ showModal: false });
    }

    render() {
        // console.log(this.props.navigation.state.params.schedule);
        return (
            <Card style={{ backgroundColor: '#fff' }}>
                <CardSection cardSectionStyle={{ backgroundColor: '#fff' }}>
                    <Input
                        label="Schedule"
                        placeholder="Add your schedule"
                        onChangeText={reminder => this.setState({ reminder })}
                        value={this.state.reminder}
                        secureTextEntry={false}
                    />
                </CardSection>
                <CardSection cardSectionStyle={{ backgroundColor: '#fff' }}>
                    <View style={styles.containerStyle}>
                        <TouchableOpacity onPress={this.showDatePicker} style={styles.datepickerStyle}>
                            <Text style={styles.buttonTextStyle}>
                                Select Date
                            </Text>
                        </TouchableOpacity>
                        <DateTimePicker
                            isVisible={this.state.isDatePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDatePicker}
                            datePickerModeAndroid='calendar'
                            mode='date'
                        />
                        <TextInput
                            onChangeText={date => this.setState({ date })}
                            value={this.state.date}
                            placeholder="DD/MM/YYYY"
                            style={styles.inputStyle}
                        />
                    </View>
                </CardSection>
                <CardSection cardSectionStyle={{ backgroundColor: '#fff' }}>
                    <View style={styles.containerStyle}>
                        <TouchableOpacity onPress={this.showTimePicker} style={styles.datepickerStyle}>
                            <Text style={styles.buttonTextStyle}>
                                Select Time
                            </Text>
                        </TouchableOpacity>
                        <DateTimePicker
                            isVisible={this.state.isTimePickerVisible}
                            onConfirm={this.handleTimePicked}
                            onCancel={this.hideTimePicker}
                            timePickerModeAndroid='clock'
                            mode='time'
                        />
                        <TextInput
                            onChangeText={time => this.setState({ time })}
                            value={this.state.time}
                            placeholder="00:00"
                            style={styles.inputStyle}
                        />
                    </View>
                </CardSection>
                <Text style={styles.errorTextStyle}>
                    {this.props.error}
                </Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
                <CardSection>
                    <Button onPress={() => this.setState({ showModal: !this.state.showModal })} style={{ backgroundColor: 'rgba(82, 109, 127, 1)' }} textStyle={{ color: '#fff' }}>
                        Delete Schedule
                    </Button>
                </CardSection>
                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to delete this schedule?
                </Confirm>
            </Card>
        );
    }
}

const styles = {
    datepickerStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
        marginLeft: 2,
        marginRight: 2,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: 'rgba(82, 109, 127, 1)'
    },
    buttonTextStyle: {
        alignSelf: 'center',
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    containerStyle: {
        heght: 40,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        color: '#000'
    },
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 1
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

const mapStateToProps = state => {
    return {
        error: state.schedule.error,
        loading: state.schedule.loading,
        success: state.schedule.success
    }
}

export default connect(mapStateToProps, { editSchedule, setReload, scheduleDelete })(EditSchedule);