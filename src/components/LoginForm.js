import React, { Component } from 'react';
import { Text, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
    }

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onLogin() {
        const { email, password } = this.state;

        this.props.loginUser({ email, password });
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
            this.setState({ email: '', password: '' });
        }
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }

        return (
            <Button onPress={this.onLogin.bind(this)}>
                Login
            </Button>
        );
    }

    render() {
        return (
            <Card>
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

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);