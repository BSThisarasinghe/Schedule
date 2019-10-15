import React, { Component } from 'react';
import { Text, TouchableOpacity, TextInput, View, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';
import { addSchedule } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class AddSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = { reminder: '', date: '', time: '', isDatePickerVisible: false, isTimePickerVisible: false };
    }

    onSubmit() {
        const { reminder, date, time } = this.state;

        this.props.addSchedule({ reminder, date, time });
        // console.log(user);
        // if(user !== null){
        //     this.props.navigation.navigate('Profile');
        // }
    }

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

    UNSAFE_componentWillReceiveProps(nextProps) {
        // console.log(nextProps.success);
        if (nextProps.success === true) {
            this.props.navigation.navigate('Profile');
            this.setState({ reminder: '', date: '', time: '' });
        }
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }

        return (
            <Button onPress={this.onSubmit.bind(this)} style={{ backgroundColor: 'rgba(82, 109, 127, 1)' }} textStyle={{ color: '#fff' }}>
                Add Schedule
            </Button>
        );
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

    handleTimePicked = time => {
        // console.log("A date has been picked: ", Moment(time).format('hh:mm'));
        this.setState({ time: Moment(time).format('hh:mm') });
        this.hideTimePicker();
    };

    render() {
        Moment.locale('en');
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

export default connect(mapStateToProps, { addSchedule })(AddSchedule);
