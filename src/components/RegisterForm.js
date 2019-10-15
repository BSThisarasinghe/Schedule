import React, { Component } from 'react';
import { Text, BackHandler, View } from 'react-native';
import { connect } from 'react-redux';
// import Communications from 'react-native-communications';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { registerUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = { name: '', email: '', password: '', cpwd: '', phone: '', display_name: '' };
    }

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onRegister() {
        const { name, email, password, cpwd, phone, display_name } = this.state;

        this.props.registerUser({ name, email, password, cpwd, phone, display_name });
    }

    handleBackButtonClick() {
        BackHandler.exitApp();
        return true;
    }

    UNSAFE_componentWillMount() {
        // this.props.navigation.dispatch(DrawerActions.toggleDrawer());
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // console.log(nextProps.user);
        if (nextProps.user !== null) {
            this.props.navigation.navigate('Profile');
            // Communications.text(this.state.phone, 'You have successfully registered for Schedule!');
            this.setState({ name: '', email: '', password: '', cpwd: '', phone: '', display_name: '' });
        }
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }

        return (
            <Button onPress={this.onRegister.bind(this)}>
                Sign Up
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <View>
                    <Text style={styles.textStyle}>CREATE AN ACCOUNT</Text>
                </View>
                <CardSection>
                    <Input
                        label="Name"
                        labelStyle={{ color: '#fff' }}
                        placeholder="Michael Knight"
                        placeholderTextColor="#DBDDDE"
                        onChangeText={name => this.setState({ name })}
                        value={this.state.name}
                        style={{ color: '#fff' }}
                        secureTextEntry={false}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Email"
                        labelStyle={{ color: '#fff' }}
                        placeholder="email@gmail.com"
                        placeholderTextColor="#DBDDDE"
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                        style={{ color: '#fff' }}
                        secureTextEntry={false}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Display Name"
                        labelStyle={{ color: '#fff' }}
                        placeholder="Mike"
                        placeholderTextColor="#DBDDDE"
                        onChangeText={display_name => this.setState({ display_name })}
                        value={this.state.display_name}
                        style={{ color: '#fff' }}
                        secureTextEntry={false}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Mobile Number"
                        placeholder="077 555 5555"
                        onChangeText={phone => this.setState({ phone })}
                        value={this.state.phone}
                        secureTextEntry={false}
                        labelStyle={{ color: '#fff' }}
                        placeholderTextColor="#DBDDDE"
                        style={{ color: '#fff' }}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry={true}
                        label="Password"
                        placeholder="Password"
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                        labelStyle={{ color: '#fff' }}
                        placeholderTextColor="#DBDDDE"
                        style={{ color: '#fff' }}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry={true}
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        onChangeText={cpwd => this.setState({ cpwd })}
                        value={this.state.cpwd}
                        labelStyle={{ color: '#fff' }}
                        placeholderTextColor="#DBDDDE"
                        style={{ color: '#fff' }}
                    />
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
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    textStyle: {
        fontSize: 25,
        alignSelf: 'center',
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 15
    }
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        loading: state.auth.loading,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { registerUser })(RegisterForm);