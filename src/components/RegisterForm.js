import React, { Component } from 'react';
import { Text, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { registerUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = { name: '', email: '', password: '', cpwd: '' };
    }

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onRegister() {
        const { name, email, password, cpwd } = this.state;

        this.props.registerUser({ name, email, password, cpwd });
        // console.log(user);
        // if(user !== null){
        //     this.props.navigation.navigate('Profile');
        // }
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
        console.log(nextProps.user);
        if (nextProps.user !== null) {
            this.props.navigation.navigate('Profile');
            this.setState({ name: '', email: '', password: '', cpwd: '' });
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
                <CardSection>
                    <Input
                        label="Name"
                        placeholder="Michael Knight"
                        onChangeText={name => this.setState({ name })}
                        value={this.state.name}
                        secureTextEntry={false}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="email@gmail.com"
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                        secureTextEntry={false}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry={true}
                        label="Password"
                        placeholder="Password"
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry={true}
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        onChangeText={cpwd => this.setState({ cpwd })}
                        value={this.state.cpwd}
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